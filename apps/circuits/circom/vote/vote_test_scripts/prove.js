const snarkjs = require("snarkjs");
const fs = require("fs");

async function run() {
  try {
    // const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 10, b: 21}, "circuit.wasm", "circuit_final.zkey");
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      {
        voter: 92007038543093028355208827160531269262238806247549818178164101363807072428775,
        vote: 2
      },
      "./circom/vote/vote_js/vote.wasm",
      "./circom/vote/vote_0001.zkey"
    );

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    //const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
    const vKey = JSON.parse(fs.readFileSync("./circom/vote/verification_key.json"));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }
  }
  catch (e) {
    console.log("error:", e);
  }
/*
*/
}

run().then(() => {
    process.exit(0);
});
