pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template Cmd() {
  signal input id;
  signal input cmd;
  signal output ideed;
  signal output hash;
  //signal output a;
  //signal output hash;

  component poseidon = Poseidon(2);
  poseidon.inputs[1] <== id;
  poseidon.inputs[0] <== cmd;
  hash <== poseidon.out;

  //assert(vote > 0);
  //assert(vote * id);

  ideed <== id; 
  //ideed <-- id;
  //ideed <== 1 * id; 

  //ideed <== vote; 
}

component main {public [cmd]} = Cmd();
