import * as React from 'react'
//import { render } from 'react-dom';
/*
import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  useNavigate,
} from 'react-router-dom';
import { Router, Route } from 'electron-router-dom';
*/

import events from 'events';
const eventEmitter = new events.EventEmitter();

//import * as Store from 'electron-store';
//const Store = require('electron-store');
//require('electron-store');
//import * as fs from 'fs';
//console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', fs.openSync);
//const appData = fs.openSync('/tmp/appData.elec.json');
//import { ipcRenderer } from 'electron';
/*
try {
    var isFileSaverSupported = !!new Blob;
} catch (e) {console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx', e)}
import { saveAs } from 'file-saver';
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
saveAs(blob, "helloWorld.txt");
const { app } = require('electron');
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx', app);
//console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx', app.getPath('userData'));
*/
//console.log('xxxxxxxxxxxxxxxxxxxxxx', window.myAPI);
//window.electronAPI.setTitle('set in abiContract app title');
window.electronAPI.setTitle('abiContract app page title');
window.walletAPI.walletPhrase((event, phrase) => {
  console.log('xxxxxxxxxxxxx handle walletPhrase callback:', phrase);
});
window.walletAPI.getPhrase();

/*
//import { Wallet } from 'services/wallet'; 
import Wallet from './services/wallet'; 

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import About from "./pages/About";
*/

const HomePageLink = () => {
  return (
    <ul>
      <li>
        <a href="../../index.html">root app</a>
      </li>
    </ul>
  );
}

const Home = () => {
  return (
    <div>
      <h5>Home Page</h5>
      <HomePageLink/>
    </div>
  );
}

const Settings = () => {
  return (
    <div>
      <h5>Settings Page</h5>
      <HomePageLink/>
    </div>
  );
}

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { clickedLink:'' };

    /*
    // this.wallet.checkWalletSetup();

    const phrase = 'huge mansion obscure weasel mix submit ripple attack then fade spoil picnic';
    this.wallet = new Wallet(
      eventEmitter,
      phrase,
    );

    eventEmitter.on('wallet provider setup done', (wallet) => {
      console.log('eventEmitter.on \'wallet provider setup done\':', wallet);
    });
    */
  }

  componentDidMount() {
    console.log('this.state', this.state);
    /*
    console.log('this.wallet App', this.wallet);
    //console.log('app.js getNetwork:', this.wallet.provider);

    this.app.getEthersFromApp(this.wallet);
    */
  }

  routeLink = (data) => {
    this.setState({
      clickedLink: data,
    });
  }

  render() {
    return (
      <div>
        <h2>ABI Contract Application</h2>
        <p>
          <button id="home" onClick={() => {
            this.routeLink('');
          }}>home</button>

          <button id="settings" onClick={() => {
            this.routeLink('settings');
          }}>settings</button>
        </p>
        {
          (this.state.clickedLink === 'settings') ? (<Settings wallet={this.wallet} eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === '') ? (<Home wallet={this.wallet} eventEmitter={eventEmitter} ref={app => {this.app = app;}} />) : 
          'NO ROUTE ERROR'
        }
      </div>
    )
  }
}
