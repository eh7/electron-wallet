pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/poseidon.circom";

template PoseidonHasher() {
    signal input in;
    signal input inAddr;
    signal output out;
    signal output addr;

    component poseidon = Poseidon(1);
    poseidon.inputs[0] <== in;
    out <== poseidon.out;
    addr <== inAddr;
}

component main = PoseidonHasher();
