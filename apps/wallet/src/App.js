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

import eventBus from "./services/EventBus";
import Wallet from './services/wallet';


import events from 'events';
const eventEmitter = new events.EventEmitter();

window.electronAPI.setTitle('Wallet App');
window.walletAPI.walletPhrase((event, phrase) => {
  console.log('xxxxxxxxxxxxx handle walletPhrase callback:', phrase);
});
window.walletAPI.getPhrase();

export class SetupPasswordPage extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        class SetupPasswordPage
      </div>
    );
  }
}

export class LoginPage extends React.Component {
  constructor (props) {
    super(props);
    console.log(props);
    this.state = {
      authed: false,
      password: '',
    }

    window.walletAPI.handleAuthResult((event, authStatus) => {
      console.log('handleAuthResult authStatus:', authStatus);
      this.setState({ authed: authStatus });
      if (authStatus) {
        alert('auth okay');
        eventBus.dispatch("authOkay", { message: "authOkay" });
      } else {
        alert('auth failed');
        eventBus.dispatch("authFailed", { message: "authFailed" });
      }
      //alert(this.state.authed);
    });
    console.log('Listening for handleAuthResult event');
  }

  onChangeInput = (event) => {
    this.state[event.target.name] = event.target.value;
  }

  onSubmitForm = async (event) => {
    try {
      event.preventDefault();
      console.log('onLoginFormSubmit', event.target.name);
      window.walletAPI.auth(this.state.password);
      /*
      alert(this.state.password);
      const service = 'service';
      const account = 'account';
      console.log(
        setPassword(service, account, this.state.password)
      );
      console.log(
        getPassword(service, account)
      );
      */
    }
    catch (e) {
      console.warn('onSubmitForm error:', e.error);
    
    }
  }

  componentDidMount() {
    console.log('componentDidMount state:', this.state);
  }

  render () {
    return (
      <div>
        <h2>Wallet Login Form</h2>
        <form onSubmit={this.onSubmitForm}>
          Enter Wallet Password:<br/>
          <input name='password' type='password' required onChange={this.onChangeInput}/><br/>
          <button type='submit'>authenticate</button>
        </form>
      </div>
    );
  }
}

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
    try {
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
    catch (e) {
      console.warn('onSubmitForm error:', e.error);
    
    }
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
      </div>
    );
  }
}

const ImportWalletForm = () => {
  return (
    <div>
      <h5>Import Wallet Form</h5>
    </div>
  );
}

const ExportWalletForm = () => {
  return (
    <div>
      <h5>Export Wallet Form</h5>
    </div>
  );
}

const Settings = () => {
  return (
    <div>
      <h5>Settings Page</h5>
    </div>
  );
}

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      clickedLink:'',
      passwordSet: false,
    };

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

  componentDidMount() {
    eventBus.on("authOkay", (data) =>
      this.setState({ authed: true })
    );
    console.log('App this.state:', this.state);
    //alert('componentDidMount run');
  }

  componentWillUnmount() {
    eventBus.remove("authOkay");
  }

  routeLink = (data) => {
    this.setState({
      clickedLink: data,
    });
  }

  checkPasswordSet = () => {
    window.authAPI.checkPasswordSetResult((event, status) => {
      console.log('window.authAPI.checkPasswordSetResult:', status);
      if (status) {
        alert('password set, now login');
        this.setState({ passwordSet: true });
        //eventBus.dispatch("passwordSetupDoAuth", { message: "doAuth" });
      } else {
        alert('no password set, prompt to setup');
      }
    });
    window.authAPI.checkPasswordSet();
  }

  render() {
    this.checkPasswordSet();
    if (!this.state.passwordSet) {
      return (
        <div>
          <SetupPasswordPage />
        </div>
      );
    } else {
      return (
        <div>
          {
            (!this.state.authed) ? (<LoginPage />) : 
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
              <p>
                <button onClick={() => {
                  alert('clear keystore')
                  window.walletAPI.saveKeystoreData([])
                }}>clear keystore</button>
      
                <button onClick={() => {
                  window.walletAPI.keystoreSeedHex((event, keystore) => {
                    console.log('keystore in storage:', JSON.stringify(keystore));
                  });
                  console.log('request keystore', window.walletAPI.getKeystoreSeedHex());
      
                  window.walletAPI.walletData((event, data) => {
                    console.log('walletData in storage:', data);
                  });
                  console.log('request keystore', window.walletAPI.getWalletData());
                }}>show keystore</button>
      
                <button onClick={() => {
                  console.log('wallet data', window.walletAPI.getWalletData());
                }}>show wallet</button>
              </p>
            </div>
          }
        </div>
      )
    }
  }

  /*
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
        <p>
          <button onClick={() => {
            alert('clear keystore')
            window.walletAPI.saveKeystoreData([])
          }}>clear keystore</button>

          <button onClick={() => {
            window.walletAPI.keystoreSeedHex((event, keystore) => {
              console.log('keystore in storage:', JSON.stringify(keystore));
            });
            console.log('request keystore', window.walletAPI.getKeystoreSeedHex());

            window.walletAPI.walletData((event, data) => {
              console.log('walletData in storage:', data);
            });
            console.log('request keystore', window.walletAPI.getWalletData());
          }}>show keystore</button>

          <button onClick={() => {
            console.log('wallet data', window.walletAPI.getWalletData());
          }}>show wallet</button>
        </p>

      </div>
    )
  }
  */
}
