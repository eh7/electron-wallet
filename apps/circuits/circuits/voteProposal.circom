pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template VoteProposal() {
    signal input proposalHash;
    signal input voter;
    signal input vote;
    signal output hash;

    component poseidon = Poseidon(2);
    poseidon.inputs[0] <== proposalHash;
    poseidon.inputs[1] <== voter
    hash <== poseidon.out;
}

component main {public [proposalHash]} = VoteProposal();
