import React, { Component } from 'react';
import Alert from './components/alert/alert';

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
      { time_1_percent: 0.1, text: 'GT 730', id: 0 },
    ],
    library_VC: [{ time_1_percent: 0.1, text: 'GT 730'}],
    activeAlert: []
  }

  click = () => {
    if (this.state.count % 10 === 9 && this.state.count !== 0) {
      this.onAlert(`Вау ты сделал ${this.state.count + 1} кликов!`)
    }
    this.setState({
      count: this.state.count + 1
    })
  }

  add_click = (text) => {
    const { masClick, library_VC} = this.state;
    const indexClick = library_VC.findIndex(item => item.text === text)
    const nClick = library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({},nClick[0])
    const countClick = masClick.filter(item =>{
      return item.text === text
    })
    newClick.id = countClick.length;
    // const newClick = { time_1_percent: 100, text: 'GT 730', id: 2 }
    this.setState({
      masClick: [...masClick, newClick]
    })
  }

  onAlert = (message) => {
    this.setState(({ activeAlert }) => {
      let id;
      if (activeAlert.length == 0) {
        id = 0;
      }
      else {
        id = activeAlert[activeAlert.length - 1].id + 1;
      }
      const before = activeAlert;
      const newAlert = { text: message, id: id };
      const newM = [...before, newAlert];
      return {
        activeAlert: newM
      }
    })
  }

  closeAlert = (id) => {
    this.setState(({ activeAlert }) => {
      const index = activeAlert.findIndex((item) => item.id == id)
      const before = activeAlert.slice(0, index);
      const after = activeAlert.slice(index + 1);
      const neew = [...before, ...after];

      return {
        activeAlert: neew
      }
    })
  }

  render() {
    const { count, masClick, activeAlert } = this.state;
    return (
      <div className='App'>
        <div className='App-header'>
          <p>
            Miner_VideoCard
          </p>
        </div>
        <Alert
          activeAlert = {activeAlert} 
          closeAlert = {this.closeAlert}

        ></Alert>
        <GamePlace
          masClick={masClick}
          count={count}
          click={this.click}
          add_click={this.add_click}
        ></GamePlace>
      </div>
    )
  }
}

const GamePlace = ({ element, masClick, count, click, add_click }) => {
  return (
    <div className='Game-place'>
      <div className='List-click'>
        <p>Сделано кликов: {count}</p>
        {element}
        <Click
          masClick={masClick}
          onClick={click}
          time_1_percent={10}
        ></Click>
      </div>
      <Shop
        add_click={add_click}
      ></Shop>
    </div>
  )
}

const Shop = ({ add_click }) => {
  return (
    <div className="Shop">
      <p>Магазин</p>
      <button onClick={() => {add_click('GT 730')}}><p>Взять GT 730</p></button>
    </div>
  )
}




