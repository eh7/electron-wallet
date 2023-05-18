import * as React from 'react'
import Wallet from '../services/wallet'; 
import Format from '../services/format';
const format = new Format();

export default class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      wallet: this.props.wallet,
    };

    this.wallet = this.props.wallet;

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

  async componentDidMount() {
    let state = this.state;
    state.ethersData = this.wallet.ethersData;
    state.show = true;
    this.setState(state);

    try {
      console.log('this.wallet home onMount', this.wallet);
      const network = await this.wallet.getNetwork();
      state.network = format.formatNetworkDataHtml(
        network.chainId,
        network.name,
        network,
      );
      state.networkId = network.chainId;
      state.networkName = network.name;
    }
    catch (err) {
      console.log('error with getNetwork in about', err);
    }

    this.setState(state);
  }

  render() {
    if (!this.state.show) {
      return (<div>...loading...</div>);
    } else {
      return (
        <div>
          <h3>About</h3>
          <h5>{this.wallet.data.addressCheckSum}</h5>
          <h5>{this.state.network}</h5>
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
