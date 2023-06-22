/*
// `contextBridge` expose an API to the renderer process.
// `ipcRenderer` is used for IPC (inter-process communication) with main process.
// We use it in the preload instead of renderer in order to expose only
// whitelisted wrappers to increase the security of our aplication.
import { contextBridge, ipcRenderer } from 'electron'

// Create a type that should contain all the data we need to expose in the
// renderer process using `contextBridge`.
export type ContextBridgeApi = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  readFile: () => Promise<string>
}

const exposedApi: ContextBridgeApi = {
  readFile: () => {
    // Send IPC event to main process to read the file.
    ipcRenderer.send('read-file')

    // Wrap a promise around the `.once` listener that will be sent back from
    // the main process, once the file has been read.
    return new Promise((resolve) => {
      ipcRenderer.once('read-file-success', (event, data: string) => resolve(data))
    })
  },
}

// Expose our functions in the `api` namespace of the renderer `Window`.
//
// If I want to call `readFile` from the renderer process, I can do it by
// calling the function `window.api.readFile()`.
contextBridge.exposeInMainWorld('api', exposedApi)
*/