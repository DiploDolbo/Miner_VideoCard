import React, { Component } from 'react';
import Alert from './components/alert/alert';

import Tab from './components/tab/create_tab';
import Frame from './components/tab/create_frame';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.time = 0;
    this.alert_money = 10;
    this.time_payment = 20;
    this.library_VC =
      [
        { time_1_percent: 1, text: 'GT 730', plus: 1, price: 5 },
        { time_1_percent: 0.8, text: 'GT 750', plus: 1.5, price: 8 },
        { time_1_percent: 0.5, text: 'GT 760', plus: 2, price: 16 }
      ];
  }

  state = {
    money: 100,
    count: 0,
    payment: 0.5,
    count_VC: 0,
    max_count_VC: 3,
    masClick: [
    ],
    activeAlert: [],
    tab: [
      { nameWP: "Click", text: "Click" },
      { nameWP: "Shop", text: "Магазин" },
      { nameWP: "Upgrade", text: "Upgrade" }
    ],
    frame: [
      { nameF: "Click" },
      { nameF: "Shop" },
      { nameF: "Upgrade" }
    ],
    activeFrame: { name: "Click" }
  }

  componentDidMount() {
    this.add_click({ text: 'GT 730', price: 0 })
  }

  click = (plus) => {
    const { money, count, payment } = this.state;

    let mon = (+money + plus).toFixed(1);
    if (count % this.time_payment === 0 && count !== 0) {
      mon = (+mon - payment).toFixed(1);
      this.onAlert(`ПЛАТИ НАЛОГИ ${payment}!`)
    }
    console.log(count);
    this.setState({
      money: mon,
      count: count + 1
    })
  }

  add_click = ({ text, price }) => {
    const { masClick, money, payment, count_VC} = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({}, nClick[0])
    // const moneyClick = masClick.filter(item => {
    //   return item.text === text
    // })
    newClick.id = masClick.length;
    let pay = (+payment + price * 0.1).toFixed(1);
    let mon = (+money - price).toFixed(1)

    // const newClick = { time_1_percent: 100, text: 'GT 730', id: 2 }
    this.setState({
      masClick: [...masClick, newClick],
      money: mon,
      payment: pay,
      count_VC: count_VC + 1
    })
  }

  buy_click = ({ text, price }) => {
    const { money, count_VC, max_count_VC} = this.state;
    if (money >= price && count_VC < max_count_VC) {this.add_click({ text, price })}
    else if(money < price)
    { 
      this.onAlert('Не хватает') 
    }
    else if(count_VC >= max_count_VC)
    {
      this.onAlert('Нет места')
    }
  }

  sell_click = (id) => {
    const {masClick, money, count_VC} = this.state;
    const sellClick = masClick.find(item => {return item.id === id})
    const index = masClick.findIndex((item) => {return item.id === id})
    const newMasClick = [...masClick.slice(0, index), ...masClick.slice(index+1)]
    let mon = (+money + sellClick.price * 0.9).toFixed(1);
    this.setState({
      money: mon,
      masClick: newMasClick,
      count_VC: count_VC - 1
    })

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

    if (`${nameWP}_tab_${id_t}` === `${name}_tab_${id}`) return;
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
          <a style={{ color: 'darkred' }}>С одобрения Ирины</a>
        </div>
        <Alert
          activeAlert={activeAlert}
          closeAlert={this.closeAlert}
        ></Alert>
        <GamePlace
          masClick={masClick}
          money={money}
          onClick={this.click}
          buy_click={this.buy_click}
          sell_click={this.sell_click}
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

const GamePlace = ({ masClick, money, onClick, buy_click, sell_click, library_VC, tab, frame, activeFrame, onSwitch }) => {
  return (
    <div className='Game-place'>
      <div id='shop_upgrade'>
        <div id='tab_s_u'>
          <Tab
            tab={tab}
            activeFrame={activeFrame}
            onSwitch={onSwitch}
          >
          </Tab>
        </div>
        <a id = 'money'>Намайнил: {money}</a>
        <div id='frames'>
          <Frame
            frame={frame}
            activeFrame={activeFrame}
            buy_click={buy_click}
            sell_click={sell_click}
            library_VC={library_VC}
            masClick={masClick}
            onClick={onClick}
            money={money}
          >
          </Frame>

        </div>
      </div>
    </div>
  )
}






