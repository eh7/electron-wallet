import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { floodsub } from '@libp2p/floodsub'
import { bootstrap } from '@libp2p/bootstrap'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { circuitRelayTransport, circuitRelayServer } from 'libp2p/circuit-relay'
import { identifyService } from 'libp2p/identify'
import { peerIdFromString } from '@libp2p/peer-id'
//import PeerId from '@libp2p/peer-id'

;(async () => {
  //const peer = peerIdFromString('k51qzi5uqu5dkwkqm42v9j9kqcam2jiuvloi16g72i4i4amoo2m8u3ol3mqu6s')
  const peer = peerIdFromString('12D3KooWDGvCcpLjj5Rticmt6xGFREfNjJufnz8dTEDs1SXVHAb5')
  console.log('privateKey:', peer.privateKey);

  const relay = await createLibp2p({
    // peerId: peer,
    // privateKey: peerID.toJSON().privKey
    addresses: {
      listen: [
        '/ip4/0.0.0.0/tcp/0'
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
  console.log(`libp2p relay started with id: ${relay.peerId.toString()}`)
  //console.log(relay.peerId.privKey)

  const relayMultiaddrs = relay.getMultiaddrs().map((m) => m.toString())

  console.log(relayMultiaddrs);

  relay.addEventListener('peer:discovery', (evt) => {
    const peer = evt.detail
    console.log(`discovered: ${peer.id.toString()}`)
  })
})()
