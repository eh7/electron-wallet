import * as React from 'react'
import Wallet from '../services/wallet'; 
import Format from '../services/format';
const format = new Format();

export default class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.setState({
      show: '',
    });

    //console.log('this.state:', this.state);

    this.wallet = this.props.wallet;

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
      state.show = 'true';
      this.setState(state);
    });
  }

  async componentDidMount() {
    //let state = this.state;
    //state.ethersData = this.wallet.ethersData;
    //state.show = true;
    //this.setState(state);
console.log('componentDidMount state:', this.state);
  }

  render() {
    //console.log('zzzzzzzzzzzzzzzzzzzzzzz', this.state.show);
    //if (!this.state.show) {
      return (<div>...loading...</div>);
    //}
    //} else {
    //if (!this.state.show) {
      return (
        <div>
           settings
        </div>
      );
    //} else {
      return (
        <div>
           settings
        </div>
      );
    //}

    //    <div>
    //      <h3>Wallet Home</h3>
    //      <h5>{this.getAddress()}</h5>
    //      <h5>{this.state.network}</h5>
    //      <ul>
    //        <li>
    //          <a href="../../index.html">root app</a>
    //        </li>
    //      </ul>
    //    </div>
    //  )
    //}
    /*
    return (
      <div>
        <h3>Wallet Settings Form</h3>
        <ul>
          <li>
            <a href="../../index.html">root app</a>
          </li>
          <li>
            <a href="/home">home</a>
          </li>
        </ul>
      </div>
    )
    */
  }
}
