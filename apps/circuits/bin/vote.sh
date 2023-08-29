mkdir ./circom/vote

circom ./circuits/vote.circom -o ./circom/vote --r1cs --wasm --sym

npx snarkjs r1cs print ./circom/vote/vote.r1cs ./circom/vote/vote.sym

npx snarkjs r1cs export json ./circom/vote/vote.r1cs ./circom/vote/vote.r1cs.json

node ./circom/vote/vote_js/generate_witness.js ./circom/vote/vote_js/vote.wasm ./circom/vote/input.json ./circom/vote/witness.wtns

npx snarkjs wtns export json ./circom/vote/witness.wtns ./circom/vote/witness.json

npx snarkjs groth16 setup ./circom/vote/vote.r1cs ./circom/ptau/pot12_final.ptau ./circom/vote/vote_0000.zkey 

npx snarkjs zkey contribute ./circom/vote/vote_0000.zkey ./circom/vote/vote_0001.zkey --name="Test Name" -e="$(head -n 4096 /dev/urandom | openssl sha1)"

npx snarkjs zkey export verificationkey ./circom/vote/vote_0001.zkey ./circom/vote/verification_key.json

npx snarkjs groth16 prove ./circom/vote/vote_0001.zkey ./circom/vote/witness.wtns ./circom/vote/proof.json ./circom/vote/public.json

npx snarkjs groth16 verify ./circom/vote/verification_key.json ./circom/vote/public.json ./circom/vote/proof.json

npx snarkjs zkey export solidityverifier ./circom/vote/vote_0001.zkey ./circom/vote/vote_verifier.sol

npx snarkjs zkey export soliditycalldata ./circom/vote/public.json ./circom/vote/proof.json
