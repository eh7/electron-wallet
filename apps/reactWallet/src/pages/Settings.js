import * as React from 'react'
import Wallet from '../services/wallet'; 
import Format from '../services/format';
const format = new Format();

export default class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      wallet: this.props.wallet,
    };

    this.wallet = this.props.wallet;

    /*
    this.eventEmitter = this.props.eventEmitter;

//console.log('settings props:', this.props);
//consol.log('this.eventEmitter settings:', this.eventEmitter);
//alert(this.eventEmitter);

    this.eventEmitter.on('wallet provider setup done', async (wallet) => {
      this.wallet = wallet;
console.log('this.eventEmitter.on wallet setup in settings', wallet);

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

      //console.log('eventEmitter.on \'wallet provider setup done\' (Settings):', wallet, 'this.state:', this.state);
    });
    */
    //console.log('XXXXXXXXXXXXX constructor done Settings.js');
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
          <h3>Settings</h3>
          <h5>{this.wallet.data.addressCheckSum}</h5>
          <h5>{this.state.network}</h5>
          <ul>
            <li>
              <a href="../../index.html">root app</a>
            </li>
          </ul>
        </div>
      )
    }
  }
}
