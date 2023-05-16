import * as React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Wallet Home</h1>
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
