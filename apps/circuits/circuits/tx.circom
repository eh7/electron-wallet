pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template Tx() {
    signal input proposal;
    signal input owner;
    signal input nonce;
    signal output proposalHash;

    component poseidon = Poseidon(3);
    poseidon.inputs[0] <== proposal;
    poseidon.inputs[1] <== owner;
    poseidon.inputs[2] <== nonce;
    proposalHash <== poseidon.out;
}

component main = Tx();
