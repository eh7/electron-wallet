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

document.addEventListener('DOMContentLoaded', async () => {
  window.walletAPI.walletInit(null);
  const phrase = 'message pair slush taste armor sunset hawk process moral twin sugar rifle';
  window.walletAPI.walletInit(phrase);
  console.log('onLoad');

  //import('./pkg/hello_wasm.js');
  //const hello_wasm = await import('./pkg/hello_wasm.js');
  //console.log(hello_wasm);
});
