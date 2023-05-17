import * as React from 'react'
import Wallet from '../services/wallet'; 
import Format from '../services/format';
const format = new Format();

export default class About extends React.Component {

  constructor(props) {
    super(props);

    /*
    this.state({
      ethersData: null,
    });
    this.wallet = this.props.wallet;

    this.eventEmitter = this.props.eventEmitter;

    this.eventEmitter = this.props.eventEmitter;

    this.eventEmitter.on('wallet provider setup done', async (wallet) => {
      this.wallet = wallet;

      let state = this.state;

      const network = await this.wallet.getNetwork();

      state.network = format.formatNetworkDataHtml(
        network.chainId,
        network.name,
        network,
      );
      state.networkId = network.chainId;
      state.networkName = network.name;
      this.setState(state);
    });
    */
  }

  render() {
    return (
      <h1>About</h1>
    );
    /*
    if (this.state.ethersData === null) {
      return (<div>...loading...</div>);
    } else {
      return (
        <div>
          <h3>Wallet About</h3>
          <ul>
            <li>
              <a href="../../index.html">root app</a>
            </li>
            <li>
              <a href="/settings">settings</a>
            </li>
          </ul>
        </div>
      );
    }
    */
  }
}
