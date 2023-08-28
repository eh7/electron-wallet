
#!/bin/sh
set -e

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
