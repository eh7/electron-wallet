/* eslint-disable no-console */

import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { floodsub } from '@libp2p/floodsub'
import { bootstrap } from '@libp2p/bootstrap'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { circuitRelayTransport, circuitRelayServer } from 'libp2p/circuit-relay'
import { identifyService } from 'libp2p/identify'

import DHT from 'libp2p-kad-dht'

import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { stdinToStream, streamToConsole } from './stream.mjs'

const createDHTNode = async (bootstrappers) => {
  //const node = await Libp2p.create({
  const node = await createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0']
    },
    transports: [tcp()],
    streamMuxers: [yamux(), mplex()],
    connectionEncryption: [noise()],
    peerDiscovery: [
      bootstrap({
        list: bootstrappers
      }),
      pubsubPeerDiscovery({
        interval: 1000
      })
    ],
    services: {
      pubsub: floodsub({
        //allowPublishToZeroPeers: true,
        emitSelf: true,
      }),
      identify: identifyService()
    },
    dht: DHT,
    config: {
      dht: {                        // The DHT options (and defaults) can be found in its documentation
        kBucketSize: 20,
        enabled: true,
        randomWalk: {
          enabled: true,            // Allows to disable discovery (enabled by default)
          interval: 300e3,
          timeout: 10e3
        }
      }
    }
  })

  return node
}

;(async () => {
 //  const relayMultiaddrs = relay.getMultiaddrs().map((m) => m.toString())

  const relayMultiaddrs = [
    '/ip4/127.0.0.1/tcp/10443/p2p/QmT5aZWgoigftGvKEL6mGDLdQFre5RnToHPqLcHRLcWSwW',
  ]

  const [node1, node2] = await Promise.all([
    //createNode(relayMultiaddrs),
    //createNode(relayMultiaddrs),
    createDHTNode(relayMultiaddrs),
    createDHTNode(relayMultiaddrs),
  ])

  const topic = 'tests';

  node1.services.pubsub.subscribe(topic);
  node1.services.pubsub.addEventListener('message', (evt) => {
    if (evt.detail.topic === topic) {
      //console.log(
      //  uint8ArrayToString(evt.detail.data)
      //)
      console.log(`node1 received: ${uint8ArrayToString(evt.detail.data)} on topic ${evt.detail.topic}`)
    }
  })

  node2.services.pubsub.subscribe(topic)
  node2.services.pubsub.addEventListener('message', (evt) => {
    if (evt.detail.topic === topic) {
      console.log(`node2 received: ${uint8ArrayToString(evt.detail.data)} on topic ${evt.detail.topic}`)
    }
  })

  node1.addEventListener('peer:discovery', (evt) => {
    const peer = evt.detail
    console.log(`Peer ${node1.peerId.toString()} discovered: ${peer.id.toString()}`)
  })
  node2.addEventListener('peer:discovery', (evt) => {
    const peer = evt.detail
    console.log(`Peer ${node2.peerId.toString()} discovered: ${peer.id.toString()}`)
  })

  setInterval(() => {
    node2.services.pubsub.publish(topic, uint8ArrayFromString('Bird bird bird, bird is the word!')).catch(err => {
      console.error(err)
    })
  }, 10000)

  await node1.handle('/chat/1.0.0', async ({ stream }) => {
    console.log('node1.handle');
    // Send stdin to the stream
    //stdinToStream(stream)
    // Read the stream and output to console
    streamToConsole('node1', stream)
  })

  await node2.handle('/chat/1.0.0', async ({ stream }) => {
    console.log('node1.handle');
    // Send stdin to the stream
    //stdinToStream(stream)
    // Read the stream and output to console
    streamToConsole('node2', stream)
  })

  //const node1Ma = node1.getMultiaddrs().forEach((ma) => {
  //  console.log(ma.toString());
  //})
  const node1Ma = node1.getMultiaddrs()[0];
  console.log(node1Ma);
  const stream = await node2.dialProtocol(
    node1Ma,
    '/chat/1.0.0',
  )
  stdinToStream(stream)
  //streamToConsole('node1', stream)
})()

const peer = () => {
  console.log('export default peer function');
}

export default peer;

