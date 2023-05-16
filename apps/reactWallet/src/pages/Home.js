import * as React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h3>Wallet Home</h3>
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
