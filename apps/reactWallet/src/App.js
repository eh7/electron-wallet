import * as React from 'react'
//import { render } from 'react-dom';
import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Settings from "./pages/Settings";

//import path from 'path';

//console.log(path.join(__dirname, 'index.html'));

//const userAgent = navigator.userAgent.toLowerCase();

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' component={<Home />} />
            <Route path='/settings' component={<Settings />} />
          </Routes>
    
        xxx
          /*
            //alert(this.props)
            //let hash = 'hahs';//window.location.pathname.replace(/^.*#/);
            {alert(window.location.pathname.search('#'))}
            alert(window.location.pathname.replace(/.*#/, ''))
          {
          }
          //{alert(window.location.href)}
          //{alert(window.location.pathname)}
          <Home />
          <Settings />
          <a href='/#test'>test</a>
          */
        xxx

        </Router>
      </div>
    )
  }
}
