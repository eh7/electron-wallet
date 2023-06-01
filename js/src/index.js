
/*
 import("../../node_modules/hello-wasm/hello_wasm.js")
  .then((js) => {
    js.greet("WebAssembly with npm");
  });
  .catch((error) => {
    console.log('import error:', error);
  });


import {
  greet,
  default as init
} from '../hello-wasm/pkg/hello_wasm.js';

//import { fs } from 'fs';

function readFile(path, type) {
  return new Promise((resolve, reject) => fs.readFile(path, type,
    (err, data) => err ? reject(err) : resolve(data))
  );
}

async function run () {
  let buf = await readFile('path/to/mod.wasm');
  //let mod = await WebAssembly.instantiate(buf, {env}); 
}

run();


//import test from '../hello-wasm/pkg/hello_wasm.js';
console.log(1111111111111111111111);
*/
