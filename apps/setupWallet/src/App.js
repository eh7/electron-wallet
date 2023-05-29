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

import Wallet from '../../services/wallet';

import events from 'events';
const eventEmitter = new events.EventEmitter();

window.electronAPI.setTitle('Setup Wallet App');
window.walletAPI.walletPhrase((event, phrase) => {
  console.log('xxxxxxxxxxxxx handle walletPhrase callback:', phrase);
});
window.walletAPI.getPhrase();

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

export class NewWalletForm extends React.Component {
//const NewWalletForm = (props) => {
//
  constructor (props) {
    super(props);
    console.log(props);
    this.state = {
      password: '',
    }
  }

  onChangeInput = (event) => {
    //console.log('name', event.target.name);
    //console.log('value', event.target.value);
    this.state[event.target.name] = event.target.value;
    //console.log('state value', this.state[event.target.name]);
  }

  onSubmitForm = async (event) => {
    event.preventDefault();
    console.log('onSubmit', event.target.name);
    //alert(this.state.password);

    eventEmitter.on('wallet provider setup done', (wallet) => {
      console.log('setupWallet NewWalletFrom -- eventEmitter.on \'wallet provider setup done\':', wallet);
    });

    const phrase = '';
    this.wallet = new Wallet(
      eventEmitter,
      phrase,
    );

    await this.wallet.setupWallet();
    await this.wallet.setupWalletKeystore(this.state.password);
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
        <h5>New Wallet Form</h5>
        <form onSubmit={this.onSubmitForm}>
          Password:<br/>
          <input name='password' type='password' required onChange={this.onChangeInput}/><br/>
          <button type='submit'>create</button>
        </form>
        <HomePageLink/>
      </div>
    );
  }
}

const ImportWalletForm = () => {
  return (
    <div>
      <h5>Import Wallet Form</h5>
      <HomePageLink/>
    </div>
  );
}

const ExportWalletForm = () => {
  return (
    <div>
      <h5>Export Wallet Form</h5>
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
        <h2>Wallet Setup Application</h2>
        <p>
          <button id="home" onClick={() => {
            this.routeLink('');
          }}>home</button>

          <button id="new" onClick={() => {
            this.routeLink('new');
          }}>new</button>

          <button id="import" onClick={() => {
            this.routeLink('import');
          }}>import</button>

          <button id="export" onClick={() => {
            this.routeLink('export');
          }}>export</button>

          <button id="settings" onClick={() => {
            this.routeLink('settings');
          }}>settings</button>
        </p>
        {
          (this.state.clickedLink === 'new') ? (<NewWalletForm app={this} wallet={this.wallet} eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === 'import') ? (<ImportWalletForm wallet={this.wallet} eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === 'export') ? (<ExportWalletForm wallet={this.wallet} eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === 'settings') ? (<Settings wallet={this.wallet} eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === '') ? (<Home wallet={this.wallet} eventEmitter={eventEmitter} ref={app => {this.app = app;}} />) : 
          'NO ROUTE ERROR'
        }
      </div>
    )
  }
}
