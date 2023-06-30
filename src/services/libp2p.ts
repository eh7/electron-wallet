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

/*
import DHT from 'libp2p-kad-dht'

import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { stdinToStream, streamToConsole } from './stream.mjs'
*/

export default class Peer {
}
