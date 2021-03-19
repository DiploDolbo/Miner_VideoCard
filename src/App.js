import React, { Component } from 'react';
import Alert from './components/alert/alert';

import Click from './components/Click/Click';
import Shop from './components/Shop/Shop';

import Tab from './components/tab/create_tab';
import Frame from './components/tab/create_frame';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.time = 0;
    this.alert_money = 10;
    this.time_payment = 10;
    this.library_VC = 
    [
      { time_1_percent: 10, text: 'GT 730', plus: 1, price: 5},
      { time_1_percent: 8, text: 'GT 750', plus: 1.5, price: 8},
      { time_1_percent: 5, text: 'GT 760', plus: 2, price: 16}
    ];
  }

  state = {
    money: 0,
    count: 0,
    payment: 0.5,
    masClick: [
    ],
    activeAlert: [],
    tab: [
      { nameWP: "Shop", text: "Магазин"},
      { nameWP: "Upgrade", text: "Upgrade" }
    ],
    frame: [
      {nameF: "Shop"},
      {nameF: "Upgrade"}
    ],
    activeFrame: {name: "Shop"}
  }

  componentDidMount(){
    this.add_click({text:'GT 730', price: 0})
  }

  click = (plus) => {
    const {money, count, payment} = this.state;

    let mon = (+money + plus).toFixed(1)
    if (count % this.time_payment === 0 && count !== 0)
    {
      mon -= payment;
      this.onAlert(`ПЛАТИ НАЛОГИ ${payment}!`)
    }
    console.log(count);

    this.setState({
      money: mon,
      count: count + 1
    })
  }

  add_click = ({text, price}) => {
    const { masClick, money, payment} = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({},nClick[0])
    const moneyClick = masClick.filter(item =>{
      return item.text === text
    })
    newClick.id = moneyClick.length;
    // const newClick = { time_1_percent: 100, text: 'GT 730', id: 2 }
    this.setState({
      masClick: [...masClick, newClick],
      money: money - price,
      payment: payment + price * 0.1
    })
  }

  buy_click = ({text, price}) =>{
    const {money} = this.state;
    if(money >= price){this.add_click({text, price})}
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

  onSwitch = (nameWP, id_t) => {
    const { name, id } = this.state.activeFrame;

    if (`${nameWP}_tab_${id_t}` == `${name}_tab_${id}`) return;
    else {
        this.setState({
            activeFrame: { name: nameWP, id: id_t }
        })
    }
}

  render() {
    const { money, masClick, activeAlert, tab, frame, activeFrame } = this.state;
    return (
      <div className='App'>
        <div className='App-header'>
          <a>Miner_VideoCard</a>
          <a style = {{color: 'darkred'}}>С одобрения Ирины</a>
        </div>
        <Alert
          activeAlert = {activeAlert} 
          closeAlert = {this.closeAlert}
        ></Alert>
        <GamePlace
          masClick={masClick}
          money={money}
          click={this.click}
          buy_click={this.buy_click}
          library_VC={this.library_VC}
          tab={tab}
          frame={frame}
          activeFrame={activeFrame}
          onSwitch={this.onSwitch}
        ></GamePlace>
      </div>
    )
  }
}

const GamePlace = ({masClick, money, click, buy_click, library_VC, tab, frame, activeFrame, onSwitch}) => {
  return (
    <div className='Game-place'>
      <div className='List-click'>
        <p>Намайнил: {money}</p>
        <Click
          masClick={masClick}
          onClick={click}
          time_1_percent={10}
        ></Click>
      </div>
      <div id = 'shop_upgrade'>
        <div id = 'tab_s_u'>
          <Tab
            tab={tab}
            activeFrame={activeFrame}
            onSwitch={onSwitch}
          >
          </Tab>
        </div>
          <Frame
            frame={frame}
            activeFrame={activeFrame}
            buy_click={buy_click}
            library_VC={library_VC}
          >
          </Frame>
      </div>
      
    </div>
  )
}






