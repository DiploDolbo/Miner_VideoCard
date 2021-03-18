import React, { Component } from 'react';
import Alert from './components/alert/alert';

import Click from './components/Click/Click';
import Shop from './components/Shop/Shop';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.time = 0;
    this.library_VC = 
    [
      { time_1_percent: 10, text: 'GT 730', plus: 1, price: 5},
      { time_1_percent: 8, text: 'GT 750', plus: 1.5, price: 8}
    ];
  }

  state = {
    count: 0,
    masClick: [
    ],
    activeAlert: []
  }

  componentDidMount(){
    this.add_click({text:'GT 730', price: 0})
  }

  click = (plus) => {
    if (this.state.count % 10 === 9 && this.state.count !== 0) {
      this.onAlert(`Вау ты намайнить ${+this.state.count + 1} кликов!`)
    }
    this.setState({
      count: (+this.state.count + plus).toFixed(1)
    })
  }

  add_click = ({text, price}) => {
    const { masClick, count} = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({},nClick[0])
    const countClick = masClick.filter(item =>{
      return item.text === text
    })
    newClick.id = countClick.length;
    // const newClick = { time_1_percent: 100, text: 'GT 730', id: 2 }
    this.setState({
      masClick: [...masClick, newClick],
      count: count - price

    })
  }

  buy_click = ({text, price}) =>{
    const {count} = this.state;
    if(count >= price){this.add_click({text, price})}
    else{this.onAlert('Не хватает')}

  }

  onAlert = (message) => {
    this.setState(({ activeAlert }) => {
      let id;
      if (activeAlert.length === 0) {
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
      const index = activeAlert.findIndex((item) => item.id === id)
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
          <h1>Miner_VideoCard</h1>
          <h3 style = {{color: 'darkred'}}>С одобрения Ирины</h3>
        </div>
        <Alert
          activeAlert = {activeAlert} 
          closeAlert = {this.closeAlert}
        ></Alert>
        <GamePlace
          masClick={masClick}
          count={count}
          click={this.click}
          buy_click={this.buy_click}
          library_VC={this.library_VC}
        ></GamePlace>
      </div>
    )
  }
}

const GamePlace = ({masClick, count, click, buy_click, library_VC}) => {
  return (
    <div className='Game-place'>
      <div className='List-click'>
        <p>Намайнил: {count}</p>
        <Click
          masClick={masClick}
          onClick={click}
          time_1_percent={10}
        ></Click>
      </div>
      <Shop
        library_VC={library_VC}
        buy_click={buy_click}
      ></Shop>
    </div>
  )
}





