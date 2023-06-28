import PubSub from 'pubsub-js'

export default class MyPubSub {

  constructor () {
  }

  token = {};

  on = (event, callback) => {
    console.log('eventBus listen - on:', event);
    this.token[event] = PubSub.subscribe(event, callback); 
  }

  dispatch = (event, data) => {
    console.log('eventBus - dispatch - event:', data);
    PubSub.publish(event, data);
  }

  remove = (event, callback) => {
    console.log('eventBus - remove:', event);
    PubSub.unsubscribe(this.token[token]);
    callback();
  }
}
