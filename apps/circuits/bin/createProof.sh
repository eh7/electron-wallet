#!/bin/sh
set -e

node ./circom/${1}_js/generate_witness.js \
    ./circom/${1}_js/${1}.wasm \
    ./circom/${1}/input.json \
    ./circom/${1}/witness.wtns

# Create the proof
npx snarkjs groth16 prove \
    ./circom/zkey/${1}_final.zkey \
    ./circom/${1}/witness.wtns \
    ./circom/proof/${1}/proof.json \
    ./circom/proof/${1}/public.json

# Verify the proof
npx snarkjs groth16 verify \
    ./circom/${1}_verification_key.json \
    ./circom/proof/${1}/public.json \
    ./circom/proof/${1}/proof.json
