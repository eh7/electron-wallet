#!/bin/sh
set -e

# --------------------------------------------------------------------------------
# Phase 2
# ... circuit-specific stuff

# Compile the circuit. Creates the files:
# - circuit.r1cs: the r1cs constraint system of the circuit in binary format
# - battleship_js folder: wasm and witness tools
# - circuit.sym: a symbols file required for debugging and printing the constraint system in an annotated mode
circom ./circuits/${1}.circom -o ./circom --r1cs --wasm --sym
#circom ./circom/battleship.circom -o ./circom --r1cs --wasm --sym
# Optional - view circuit state info
# snarkjs r1cs info ./circom/battleship.r1cs

# Optional - print the constraints
# snarkjs r1cs print ./circom/battleship.r1cs ./circom/battleship.sym

# Optional - export the r1cs
# yarn snarkjs r1cs export json ./zk/circuit.r1cs ./zk/circuit.r1cs.json && cat circuit.r1cs.json
# or...
# yarn zk:export-r1cs

# Generate witness
#node ./circom/battleship_js/generate_witness.js ./circom/battleship_js/battleship.wasm \
node ./circom/${1}_js/generate_witness.js ./circom/${1}_js/${1}.wasm \
    ./circom/${1}_input.json ./circom/${1}_witness.wtns

# Setup (use plonk so we can skip ptau phase 2
npx snarkjs groth16 setup ./circom/${1}.r1cs ./circom/ptau/pot12_final.ptau ./circom/zkey/${1}_final.zkey

# Generate reference zkey
npx snarkjs zkey new ./circom/${1}.r1cs ./circom/ptau/pot12_final.ptau ./circom/zkey/${1}_0000.zkey

# Ceremony just like before but for zkey this time
npx snarkjs zkey contribute ./circom/zkey/${1}_0000.zkey ./circom/zkey/${1}_0001.zkey \
    --name="First contribution" -v -e="$(head -n 4096 /dev/urandom | openssl sha1)"
npx snarkjs zkey contribute ./circom/zkey/${1}_0001.zkey ./circom/zkey/${1}_0002.zkey \
    --name="Second contribution" -v -e="$(head -n 4096 /dev/urandom | openssl sha1)"
npx snarkjs zkey contribute ./circom/zkey/${1}_0002.zkey ./circom/zkey/${1}_0003.zkey \
    --name="Third contribution" -v -e="$(head -n 4096 /dev/urandom | openssl sha1)"

#  Verify zkey
npx snarkjs zkey verify ./circom/${1}.r1cs ./circom/ptau/pot12_final.ptau ./circom/zkey/${1}_0003.zkey

# Apply random beacon as before
npx snarkjs zkey beacon ./circom/zkey/${1}_0003.zkey ./circom/zkey/${1}_final.zkey \
    0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# Optional: verify final zkey
npx snarkjs zkey verify ./circom/${1}.r1cs ./circom/ptau/pot12_final.ptau ./circom/zkey/${1}_final.zkey

# Export verification key
npx snarkjs zkey export verificationkey ./circom/zkey/${1}_final.zkey ./circom/${1}_verification_key.json

# Create the proof
npx snarkjs groth16 prove ./circom/zkey/${1}_final.zkey ./circom/${1}_witness.wtns \
    ./circom/proof/${1}_proof.json ./circom/proof/${1}_public.json

# Verify the proof
npx snarkjs groth16 verify ./circom/${1}_verification_key.json ./circom/proof/${1}_public.json ./circom/proof/${1}_proof.json

# Export the verifier as a smart contract
npx snarkjs zkey export solidityverifier ./circom/zkey/${1}_final.zkey ./contracts/${1}_Verifier.sol
