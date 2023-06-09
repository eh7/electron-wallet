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
import {
  createFromJSON,
} from '@libp2p/peer-id-factory'
//import peerJSONData from './relay.mjs'
//import peerJSONData from './peer-config.mjs'
import { relayPeer as peerJSONData } from './peer-config.mjs'

;(async () => {
  const peer = await createFromJSON(peerJSONData);
  console.log(peer);

  const relay = await createLibp2p({
    peerId: peer,
    addresses: {
      listen: [
        //'/ip4/0.0.0.0/tcp/0'
        '/ip4/127.0.0.1/tcp/10333'
      ]
    },
    transports: [tcp(), circuitRelayTransport()],
    streamMuxers: [yamux(), mplex()],
    connectionEncryption: [noise()],
    peerDiscovery: [
      pubsubPeerDiscovery({
        interval: 1000
      })
    ],
    services: {
      relay: circuitRelayServer(),
      identify: identifyService(),
      pubsub: floodsub()
    }
  })
  console.log(relay);
  console.log(`libp2p relay started with id: ${relay.peerId.toString()}`)
  const relayMultiaddrs = relay.getMultiaddrs().map((m) => m.toString())
  console.log(`relayMultiaddrs: ${relayMultiaddrs}`)

  relay.addEventListener('peer:discovery', (evt) => {
    const peer = evt.detail
    console.log(`Peer ${relay.peerId.toString()} discovered: ${peer.id.toString()}`)
  })
})()
