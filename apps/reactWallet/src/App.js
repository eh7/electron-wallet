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
*/
import {
  useNavigate,
} from 'react-router-dom';

import { Router, Route } from 'electron-router-dom';

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import About from "./pages/About";

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { clickedLink:'' };
  }

  componentDidMount() {
    console.log('this.state', this.state);
  }

  routeLink = (data) => {
    this.setState({
      clickedLink: data,
    });
  }

  render() {
    return (
      <div>
        <h4>reactWallet:</h4>
        <p>
          <button id="home" onClick={() => {
            this.routeLink('');
          }}>home</button>

          <button id="settings" onClick={() => {
            this.routeLink('settings');
          }}>seetings</button>

          <button id="search" onClick={() => {
            this.routeLink('search');
          }}>search</button>

          <button id="about" onClick={() => {
            this.routeLink('about');
          }}>about</button>
        </p>
        {
          (this.state.clickedLink === 'settings') ? (<Settings />) : 
          (this.state.clickedLink === 'search') ? (<Search />) : 
          (this.state.clickedLink === 'about') ? (<About />) : 
          (this.state.clickedLink === '') ? (<Home />) : 
          'NO ROUTE ERROR'
        }
      </div>
    )
  }
}
