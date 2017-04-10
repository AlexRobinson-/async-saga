import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Count: {this.props.count}</p>
        <p>Another Count: {this.props.anotherCount}</p>
        <button onClick={() => this.props.increment()}>Increment</button>
        <button onClick={() => this.props.start()}>Start</button>
        <button onClick={() => this.props.stop()}>Stop</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    count: state.count,
    anotherCount: state.anotherCount
  }),
  {
    increment: () => ({ type: 'INCREMENT' }),
    start: () => ({ type: 'START_SYNCING' }),
    stop: () => ({ type: 'STOP_SYNCING' })
  }
)(App);
