import React, { Component } from 'react';

import Click from './components/Click'
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.time = 0;
  }

  state = {
    count: 0,
  }


  click = () => {
    this.setState({
      count: this.state.count + 1
    })
  }


  render() {
    const { count} = this.state;
    let element;
    if (count % 10 === 0 && count !== 0) {
      element = (
        <div>
          <h3>Вау ты сделал: {count} кликов</h3>
        </div>
      )
    }
    else {
      element = <div></div>
    }
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>
            Miner_VideoCard
          </h1>
        </div>
        <div className='Game-place'>
          <h2>Сделано кликов: {count}</h2>
          {element}
          <Click
            onClick={this.click}
            time_1_percent = {10}
          ></Click>
          <Click
            onClick={this.click}
            time_1_percent = {20}
          ></Click>

        </div>
      </div>
    )
  }
}




