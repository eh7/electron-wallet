pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template VoteProposal() {
  signal input voter;
  signal input vote;
  signal output voted;
  //signal output a;
  //signal output hash;

  //component poseidon = Poseidon(2);
  //poseidon.inputs[1] <== voter;
  //poseidon.inputs[0] <== vote;
  //hash <== poseidon.out;

  //assert(vote > 0);
  //assert(vote * voter);

  voted <== vote * voter; 
  //voted <-- voter;
  //voted <== 1 * voter; 

  //voted <== vote; 
}

component main {public [vote]} = VoteProposal();
