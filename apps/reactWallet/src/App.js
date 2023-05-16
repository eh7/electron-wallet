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

const MainScreen = () => {
  return (
    <div>
      MainScreen
    </div>
  );
}

const SearchScreen = () => {
  return (
    <div>
      SearchScreen
    </div>
  );
}

const AboutScreen = () => {
  return (
    <div>
      AboutScreen
    </div>
  );
}

function AppRoutes () {
  return (
    <div>
      <Router
        main={
          <>
            <Route path="/" element={<MainScreen />} />
            <Route path="/search" element={<SearchScreen />} />
          </>
        }
        about={<Route path="/" element={<AboutScreen />} />}
      />
    </div>
  );
}

function ClickRouter(clickPath) {
  if (clickPath === 'about') {
    return (
      <AboutScreen />      
    );
  } else if (clickPath === 'search') {
    return (
      <SearchScreen />      
    );
  } else {
    return (
      <MainScreen />      
    );
  }
}

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
          <button id="settings" onClick={() => {
            this.routeLink('settings');
          }}>seetings</button>
          <button id="home" onClick={() => {
            this.routeLink('');
          }}>home></button>
          <button id="search" onClick={() => {
            this.routeLink('search');
          }}>search</button>
          <button id="about" onClick={() => {
            this.routeLink('about');
          }}>about</button>
        </p>
        {
          (this.state.clickedLink === 'search') ? (<SearchScreen />) : 
          (this.state.clickedLink === 'about') ? (<AboutScreen />) :
          (this.state.clickedLink === '') ? (<MainScreen />) :
          'NO ROUTE ERROR'
        }
        {
          (this.state.clickedLink === 'settings') ? (<Settings />) : 
          (this.state.clickedLink === '') ? (<Home />) : 
          'NO ROUTE ERROR'
        }
      </div>
    )
  }
}
