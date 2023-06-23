# electron-wallet

# .env file setup

You need to add a .env file in root directory of this repo, for the reactWallet app and default express app to work.

An example would be a file with the following line..

<p>MAINNET_RPC_END_POINT="https://mainnet.infura.io/v3/55555555566666666667778999abc12b"</p>

The url would need to be a valid rpc endpoint for the ethereum mainnet, for now. Could be other if the network is not mainnet.

## LINKS

* https://github.com/electron/electron-quick-start-typescript

* https://davembush.medium.com/typescript-and-electron-the-right-way-141c2e15e4e1

* https://www.reddit.com/r/rust/comments/nv6a8c/using_electron_with_wasm/

* https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity

* https://pspdfkit.com/blog/2018/running-native-code-in-electron-and-the-case-for-webassembly/

* https://www.jsgarden.co/blog/how-to-handle-electron-ipc-events-with-typescript


Links to help figure code for loading wallet waiting 

* https://www.javascriptstuff.com/component-communication/#2-instance-methods

* https://www.valentinog.com/blog/await-react/

* https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html 


typescript render  ipc events

https://www.jsgarden.co/blog/how-to-handle-electron-ipc-events-with-typescript

TODOs

* DEFINE walletAPI functions between render and main, see preloaded script
* create abi contract interface based on this repo --->--> in ~/repos/dapp-dao-mono/apps/ui/nft-admin
* create basic wallets smart contract - delploy goerli

