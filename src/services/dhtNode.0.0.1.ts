/* eslint-disable no-console */

import * as dotenv from "dotenv";
dotenv.config();
//dotenv.config({ path: __dirname+'/.env' });

import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { identify } from '@libp2p/identify'
import { identifyService } from 'libp2p/identify'
import { kadDHT } from '@libp2p/kad-dht'
import { mplex } from '@libp2p/mplex'
import { tcp } from '@libp2p/tcp'
import { createLibp2p } from 'libp2p'
//import { floodsub } from '@libp2p/floodsub'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import bootstrappers from './bootstrappers.1.js'

import { bootstrap } from '@libp2p/bootstrap'
//const { bootstrap } = window.require('@libp2p');

import { fromString, toString } from 'uint8arrays'

import { createFromProtobuf } from '@libp2p/peer-id-factory'
//import peers from "../peers.js"
import peers from './peers'

//if (process.argv[2] !== '') {
if (process.env.bootstrapNode !== '') {
  //bootstrappers.push(process.argv[2])
  bootstrappers.push(process.env.bootstrapNode)
}
console.log('--------------------------------', process.env.bootstrapNode);

const DhtNode = async () => {

//  const { bootstrap:any } = await import('@libp2p/pubsub-peer-discovery');

  //console.log('bootstrap', bootstrap)

  const peerDiscovery:any = []
  if (bootstrappers.length > 0) {
//console.log('----------------', bootstrappers)
//    peerDiscovery.push(bootstrap({list: bootstrappers}))
//console.log(bootstrap)
//    peerDiscovery.push(1)
  }
console.log(peerDiscovery)
/*

  const peerId = await createFromProtobuf(
    Buffer.from(peers[0], 'hex')
  )

  const node = await createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0']
    },
    transports: [tcp()],
    streamMuxers: [yamux(), mplex()],
    connectionEncryption: [noise()],
    //pubsub: floodsub({
    //  //identify: identify(),
    //}),
    peerDiscovery,
    services: {
      kadDHT: kadDHT(),
      identify: identifyService(),
      //pubsub: gossipsub(),
      //identify: identify()
      // pubsub: floodsub(),
      pubsub: gossipsub({
        //emitSelf: true
      })
    },
  })

  console.log(node.getMultiaddrs())

  const topic = "testing000"

  node.addEventListener('peer:connect', async (evt) => {
    const peerId = evt.detail
    console.log('Connection established to:', peerId.toString()) // Emitted when a peer has been found

    const peerList = node.getPeers()
    console.log('peerList::', peerList)

    await node.services.pubsub.subscribe(topic)
    const peerListSubscribers = await node.services.pubsub.getSubscribers(topic)
    console.log('peerListSubscribers (', topic, ') :: ', peerListSubscribers)
//    const message = "message txt here";
//    await node.services.pubsub.publish(topic, fromString(message))
  })

  node.addEventListener('peer:discovery', (evt) => {
    const peerInfo = evt.detail
    console.log('Discovered:', peerInfo.id.toString())
  })

  node.services.pubsub.addEventListener('connection:open', (event: any) => {
    const peerList = node.getPeers()
    const peerInfo = event.detail
    console.log('connection:open :: (peers, peerInfo) ::)', peers, peerInfo)
  })


  node.services.pubsub.addEventListener('message', (event: any) => {
    const from = event.detail.from
    console.log('mebug', Object.keys(event.detail))
    const topic = event.detail.topic
    const message = toString(event.detail.data)
    console.log(from + '\nmessage :: (text) :: ', message)
  })

  //const message = "message txt here";
  //await node.services.pubsub.publish(topic, fromString(message))

//  console.log(
//    //node.services.pubsub.subscribe("INFO_1_0_1"),
//    //node.services.pubsub.subscribe,
//    node.pubsub,
//  )

  process.stdin.on('data', data => { 
    console.log(`You typed ${data.toString()}`); 
    const peerListSubscribers = node.services.pubsub.getSubscribers(topic)
    console.log('peerListSubscribers (', topic, ') :: ', peerListSubscribers)
    //const randomNumber = Math.floor(Math.random() * 1000000);
    //const message = "message txt here " + randomNumber + "\n" + data;
    //const message = data;
    const message = data.toString('utf8');
    node.services.pubsub.publish(topic, fromString(message))
    //process.exit(); 
  });
*/
}


export {
  DhtNode,
}
