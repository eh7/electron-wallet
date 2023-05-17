import * as React from 'react'
import Wallet from '../services/wallet'; 

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ethersData: null,
    };
    this.wallet = this.props.wallet;
    /*
    console.log(props.wallet);
    alert('this.wallet sent as props from App see console');
    const phrase = 'huge mansion obscure weasel mix submit ripple attack then fade spoil picnic';
    this.wallet = new Wallet(
      phrase,
    );
    */
  }

  getAddress = () => {
    return this.wallet.data.addressCheckSum;
    //return "TODO";
  }

  // called from App.js when wallet is completed initialization
  getEthersFromApp = async (wallet) => {
    this.wallet = wallet;
    console.log('getEthersFromApp in Home', this.wallet);
    this.setState({
      ethersData: wallet.ethersData,
    });
    //this.getNetwork()
  }

  getNetwork = () => {
    /*
    this.setState({
      network: this.wallet.ethersData,
    });
    console.log('this.wallet.ethersData', this.wallet.ethersData);
    return 'getting network';
    */
  }

  async componentDidMount() {
    console.log('this.wallet.ethersData componentDidMount Home', this.wallet.ethersData);
  }

  render() {
    if (this.state.ethersData === null) {
      return (<div>...loading...</div>);
    } else {
      return (
        <div>
          <h3>Wallet Home</h3>
          <h5>{this.getAddress()}</h5>
          <h5>{this.getNetwork()}</h5>
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
}
