import { createLibp2p } from 'libp2p'
import { bootstrap } from '@libp2p/bootstrap'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'

const bootstrapers = [
  '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
  '/ip4/104.131.131.82/tcp/4001/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
//  '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
  '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
]

const node = await createLibp2p({
  transports: [
    tcp()
  ],
  streamMuxers: [
    yamux(),
    mplex()
  ],
  connectionEncryption: [
    noise()
  ],
  peerDiscovery: [
    bootstrap({
      interval: 60e3,
      list: bootstrapers
    })
  ]
})

node.addEventListener('peer:connect', (evt) => {
  //console.log('Connection established to:', evt.detail.remotePeer.toString())	// Emitted when a new connection has been created
  console.log('Connection established to:', evt.detail)	// Emitted when a new connection has been created
})

node.addEventListener('peer:discovery', (evt) => {
  // No need to dial, autoDial is on
  console.log('Discovered:', evt.detail.id.toString())
})

await node.start()

