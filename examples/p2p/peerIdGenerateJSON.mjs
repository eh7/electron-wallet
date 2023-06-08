
//import PeerId from 'peer-id'
//console.log(PeerId);
//
import {
  createEd25519PeerId,
  createRSAPeerId,
  createFromJSON,
} from '@libp2p/peer-id-factory'
import peerJSONData from './relay.mjs'

;(async () => {
  /*
  const peerIdEd25519 = await createEd25519PeerId()
  console.log(peerIdEd25519.toCID());
  const peerIdEd25519JSON = {
    id: peerIdEd25519.toString('hex'),
    privKey: peerIdEd25519.privateKey.toString('base64'),
    pubKey: peerIdEd25519.publicKey.toString('base64'),
  }
  console.log(peerIdEd25519JSON);
  console.log(await createFromJSON(peerIdEd25519JSON));
  */

  const peerIdRSA = await createRSAPeerId()
  const peerIdRSAJSON = {
    id: peerIdRSA.toString('hex'),
    privKey: peerIdRSA.privateKey.toString('base64'),
    pubKey: peerIdRSA.publicKey.toString('base64'),
  }
  console.log(peerIdRSAJSON);
  console.log(await createFromJSON(peerIdRSAJSON));
})()

/*
import { peerIdFromString } from '@libp2p/peer-id'

//import peerProtoBufData from "./peerProtoBuf.mjs"
const peerProtoBufData = '0a260024080112201d5e8157522298c62781f86adb45cdbc23f78b778bc0b7ea0549d659391201331224080112201d5e8157522298c62781f86adb45cdbc23f78b778bc0b7ea0549d659391201331a4408011240d1b73d126aa62eaa3eb46e1619232cf707ffaaa3c3a4d2848d0aa2f59e30f71a1d5e8157522298c62781f86adb45cdbc23f78b778bc0b7ea0549d65939120133';
//console.log('peerProtoBuf', peerProtoBufData);

const peer = peerIdFromString('k51qzi5uqu5dkwkqm42v9j9kqcam2jiuvloi16g72i4i4amoo2m8u3ol3mqu6s')

//console.log(peer) // CID(bafzaa...)
//console.log(peer.toCid()) // CID(bafzaa...)
//console.log(peer.toString()) // "12D3K..."


import {
  createEd25519PeerId,
  createFromProtobuf,
  exportToProtobuf,
  createFromPrivKey,
  createFromJSON,
} from '@libp2p/peer-id-factory'

const peerId = await createEd25519PeerId()
const peerJson = {
  id: peerId.toString(),
  privKey: peerId.privateKey.toString('hex'),
  pubKey: peerId.publicKey.toString('hex'),
}
console.log(peerJson);

const create = async() => {
  const peerFromJson = await createFromJSON(peerJson);
  console.log(peerFromJson);
}
create();
*/

//console.log(Object.keys(peerId))
//console.log(peerId.toBytes())
//console.log(Buffer.from(peerId)
//console.log(Buffer.from(peerId.privateKey.toString('hex')))
//console.log(
//  createFromPrivKey(
//    peer.toString()
//  )
//)
/*
//console.log(peerId.privateKey) // CID(bafzaa...)
//Object.keys(peerId).forEach((data, i) => {
//  console.log('each', data, peerId[data]);
//})
const peerProtoBuf = exportToProtobuf(peerId);
//console.log('ssssssss\n', peerProtoBuf, '\n', peerProtoBufData);
//console.log(peerProtoBuf.toString('hex'));
const create = async() => {
//  const peerFromPrivKey = await createFromPrivKey(
//    peerId
//    peerId.privateKey
//  );
//  const peerFromProtoBuf = await createFromProtobuf(
//    peerProtoBuf
//  );
  console.log('--');
//  console.log(peerFromPrivKey.privateKey.toString('hex'));
//  console.log(peerFromProtoBuf.privateKey.toString('hex'));
//  console.log(peerProtoBuf);
//  console.log('xxx', peerId.privateKey.toString('hex'))
//  console.log('xxx', peerFromProtoBuf.toString());
//  console.log('xxx', peerId.toString());
  console.log('--');
}
create();
*/

/*
import { createSecp256k1PeerId } from '@libp2p/peer-id-factory'
const peerId1 = await createSecp256k1PeerId()
console.log(peerId1);
console.log(peerId1.privateKey) // CID(bafzaa...)

import { createPeerId } from '@libp2p/peer-id'
const type = 'RSA';
const peer1 = createPeerId({type})
//console.log(peer1);
//*/
