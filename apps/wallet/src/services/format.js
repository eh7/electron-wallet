export default class Format {

  formatNetworkDataHtml = (
    networkId,
    networkName,
    network,
  ) => {
    const keys = Object.keys(network);

    const formattedNetworkData = keys.map((data, index) => {
      if (data !== '_defaultProvider') {
        // console.log('index', index, '\ndata', data);
        return (<p>{data}: {network[data]}</p>);
      }
    });

    return (
      <div>
        {formattedNetworkData}
      </div>
    );
  }
}
