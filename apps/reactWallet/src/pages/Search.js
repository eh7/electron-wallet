import * as React from 'react'
import Wallet from '../services/wallet'; 
import Format from '../services/format';
const format = new Format();

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      wallet: this.props.wallet,
    };

    this.wallet = this.props.wallet;
  }

  async componentDidMount() {
    //console.log('componentDidMount state:', this.state);
    let state = this.state;
    state.ethersData = this.wallet.ethersData;
    state.show = true;

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
      console.log('error with getNetwork in home', err);
    }

    this.setState(state);
  }

  render() {
    if (!this.state.show) {
      return (<div>...loading...</div>);
    } else {
      return (
        <div>
          <h3>Search</h3>
          <h5>{this.wallet.data.addressCheckSum}</h5>
          <h5>{this.state.network}</h5>
          <ul>
            <li>
              <a href="../../index.html">root app</a>
            </li>
          </ul>
        </div>
      );
    }
  }
}
