mkdir ./circom/cmd

circom ./circuits/cmd.circom -o ./circom/cmd --r1cs --wasm --sym

npx snarkjs r1cs print ./circom/cmd/cmd.r1cs ./circom/cmd/cmd.sym

npx snarkjs r1cs export json ./circom/cmd/cmd.r1cs ./circom/cmd/cmd.r1cs.json

node ./circom/cmd/cmd_js/generate_witness.js ./circom/cmd/cmd_js/cmd.wasm ./circom/cmd/input.json ./circom/cmd/witness.wtns

npx snarkjs wtns export json ./circom/cmd/witness.wtns ./circom/cmd/witness.json

npx snarkjs groth16 setup ./circom/cmd/cmd.r1cs ./circom/ptau/pot12_final.ptau ./circom/cmd/cmd_0000.zkey 

npx snarkjs zkey contribute ./circom/cmd/cmd_0000.zkey ./circom/cmd/cmd_0001.zkey --name="Test Name" -e="$(head -n 4096 /dev/urandom | openssl sha1)"

npx snarkjs zkey export verificationkey ./circom/cmd/cmd_0001.zkey ./circom/cmd/verification_key.json

npx snarkjs groth16 prove ./circom/cmd/cmd_0001.zkey ./circom/cmd/witness.wtns ./circom/cmd/proof.json ./circom/cmd/public.json

npx snarkjs groth16 verify ./circom/cmd/verification_key.json ./circom/cmd/public.json ./circom/cmd/proof.json

npx snarkjs zkey export solidityverifier ./circom/cmd/cmd_0001.zkey ./circom/cmd/cmd_verifier.sol

npx snarkjs zkey export soliditycalldata ./circom/cmd/public.json ./circom/cmd/proof.json
