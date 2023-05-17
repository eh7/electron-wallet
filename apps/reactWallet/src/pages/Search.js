import * as React from 'react'
import Wallet from '../services/wallet'; 
import Format from '../services/format';
const format = new Format();

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <h3>Wallet Search</h3>
        <ul>
          <li>
            <a href="../../index.html">root app</a>
          </li>
          <li>
            <a href="/settings">settings</a>
          </li>
        </ul>
      </div>
    )
  }
}
