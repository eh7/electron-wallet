import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

//import https from 'https';

import pageSetup from '../utils/setup';

export default class TestAPI extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: {}
    };

    pageSetup();
  }

  
  getMessages = async () => {
    const host = "http://127.0.0.1:5000"
    const result = await axios.get(host + '/messages')
    console.log('messages', result)
    this.setState({ messages: result })
  }

  componentDidMount(){
    this.getMessages()
  }

  render() {
    return (
      <>
        <h1>Test node API</h1>
        <p>
          tesing the dht node api
          <div>
            {this.state.messages.data &&
              <ul>
                {
                  this.state.messages.data.map((item, index) => {
                    return (
                      <li>
                        <>{index}}</> 
                        {Object.keys(item).map((key, index) => {
                          return (
                            <p>{key}: {item[key]}</p>
                          )
                        })}
                      </li>
                    )
                  })
                }
              </ul>
            }
          </div>
        </p>
      </>
    );
  }
}
