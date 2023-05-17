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

//import { Wallet } from 'services/wallet'; 
import events from 'events';
import Wallet from './services/wallet'; 

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import About from "./pages/About";

const eventEmitter = new events.EventEmitter();

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { clickedLink:'' };

    const phrase = 'huge mansion obscure weasel mix submit ripple attack then fade spoil picnic';
    this.wallet = new Wallet(
      eventEmitter,
      phrase,
    );

    eventEmitter.on('wallet provider setup done', (wallet) => {
      console.log('eventEmitter.on \'wallet provider setup done\':', wallet);
    });
  }

  componentDidMount() {
    console.log('this.state', this.state);
    console.log('this.wallet App', this.wallet);
    //console.log('app.js getNetwork:', this.wallet.provider);

    this.app.getEthersFromApp(this.wallet);
  }

  routeLink = (data) => {
    this.setState({
      clickedLink: data,
    });
  }

  render() {
    return (
      <div>
        <h2>React Wallet</h2>
        <p>
          <button id="home" onClick={() => {
            this.routeLink('');
          }}>home</button>

          <button id="settings" onClick={() => {
            this.routeLink('settings');
          }}>settings</button>

          <button id="search" onClick={() => {
            this.routeLink('search');
          }}>search</button>

          <button id="about" onClick={() => {
            this.routeLink('about');
          }}>about</button>
        </p>
        {
          (this.state.clickedLink === 'settings') ? (<Settings eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === 'search') ? (<Search eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === 'about') ? (<About wallet={this.wallet} eventEmitter={eventEmitter} />) : 
          (this.state.clickedLink === '') ? (<Home wallet={this.wallet} eventEmitter={eventEmitter} ref={app => {this.app = app;}} />) : 
          'NO ROUTE ERROR'
        }
      </div>
    )
  }
}
