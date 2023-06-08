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
      pubsub: floodsub(),
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
    '/ip4/127.0.0.1/tcp/10333/p2p/QmT5aZWgoigftGvKEL6mGDLdQFre5RnToHPqLcHRLcWSwW',
  ]

  const [node1, node2] = await Promise.all([
    //createNode(relayMultiaddrs),
    //createNode(relayMultiaddrs),
    createDHTNode(relayMultiaddrs),
    createDHTNode(relayMultiaddrs),
  ])

  node1.addEventListener('peer:discovery', (evt) => {
    const peer = evt.detail
    console.log(`Peer ${node1.peerId.toString()} discovered: ${peer.id.toString()}`)
  })
  node2.addEventListener('peer:discovery', (evt) => {
    const peer = evt.detail
    console.log(`Peer ${node2.peerId.toString()} discovered: ${peer.id.toString()}`)
  })
})()
