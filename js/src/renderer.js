const setButton = document.getElementById('btn');
const titleInput = document.getElementById('title');
const wasm1Button = document.getElementById('wasm1');
const wasm2Button = document.getElementById('wasm2');

//import init, { greet, greet2 } from "../static/pkg/hello_wasm.js";
//const hello_wasm = "../static/pkg/hello_wasm.js";

setButton.addEventListener('click', () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
  console.log('called setTitle context with:', title);
})

wasm1Button.addEventListener('click', () => {
  import('./pkg/hello_wasm.js')
    .then((module) => {
      module.greet('WebAssembly GAV greet');
    })
    .catch((error) => {
       console.log('wasm import error:', error);
    })
});

wasm2Button.addEventListener('click', () => {
  import('./pkg/hello_wasm.js')
    .then((module) => {
      module.greet2('WebAssembly GAVb greet2');
    })
    .catch((error) => {
       console.log('wasm import error:', error);
    })
  /*
  import init, { greet, greet2 } from "./src/pkg/hello_wasm.js";
  init().then(() => {
    greet("WebAssembly GAV");
    greet2("WebAssembly");
  });
  */
  console.log('wasm button clicked');
});

window.walletAPI.handleWalletData((event, data) => {
  console.log('walletData from main:', data);
  //event.sender.send('counter-value', newValue)
})

document.addEventListener('DOMContentLoaded', async () => {
  window.walletAPI.walletInit(null);
  const phrase = 'message pair slush taste armor sunset hawk process moral twin sugar rifle';
  window.walletAPI.walletInit(phrase);
  console.log('onLoad');

//  await initWasm();
  //  //(obj) => obj.instance.exports.exported_func()
  //);
  //console.log(WebAssembly)
  //import('./pkg/hello_wasm.js');
  //const hello_wasm = await import('./pkg/hello_wasm.js');
  //console.log(hello_wasm);
});

//ipc.on('asynReply', (event, args) => {
// replyDiv.innerHTML = args;
//});

async function initWasm() {
  const importObject = {
    imports: { imported_func: (arg) => console.log(arg) },
  };
  const wasmResponse = await fetch("./src/pkg/hello_wasm_bg.wasm");
  const wasmBytes = await wasmResponse.arrayBuffer();
  const wasmResults = await WebAssembly.instantiate(wasmBytes, importObject);
console.log(wasmResults);
  //await WebAssembly.instantiateStreaming(fetch("./src/pkg/hello_wasm_bg.wasm"), importObject);
  //.then(
}
