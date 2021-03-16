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
    masClick: [
      { time_1_percent: 100, text: 'GT 730', id: 1 },
    ]
  }

  click = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  add_click = () => {
    const {masClick} = this.state;
    const newClick = {time_1_percent: 100, text: 'GT 730', id: 2}
    this.setState({
      masClick: [...masClick, newClick]
    })
  }

  render() {
    const { count, masClick } = this.state;
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
          <p>
            Miner_VideoCard
          </p>
        </div>
        <GamePlace
          element={element}
          masClick={masClick}
          count={count}
          click={this.click}
          add_click = {this.add_click}
        ></GamePlace>
      </div>
    )
  }
}

const GamePlace = ({ element, masClick, count, click, add_click}) => {
  return (
    <div className='Game-place'>
      <div className = 'List-click'>
        <p>Сделано кликов: {count}</p>
        {element}
        <Click
          masClick={masClick}
          onClick={click}
          time_1_percent={10}
        ></Click>
      </div>
      <Shop
        add_click = {add_click}
      ></Shop>
    </div>
  )
}

const Shop = ({add_click}) => {
  return (
    <div className="Shop">
      <p>Магазин</p>
      <button onClick = {add_click}><p>Взять GT 730</p></button>
    </div>
  )
}




