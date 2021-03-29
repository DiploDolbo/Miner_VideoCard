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
        { time_1_percent: 4.8, text: 'GT730', plus: 1, price: 5 , voltage: 1},
        { time_1_percent: 4.8, text: 'GT750', plus: 1.5, price: 8, voltage: 2},
        { time_1_percent: 4.8, text: 'GT760', plus: 2, price: 16, voltage: 3}
      ];
    this.upgrade_VC = [
      { buy: true, properties: 0.5, text: 'Помощь братана', func: this.autoClick, price: 100 },
      { buy: true, properties: 1, text: "Освободить место", func: this.plus_count_VC, price: 200 }
    ]
  }

  state = {
    money: 100,
    count: 0,
    payment: 0.5,
    count_VC: 0,
    max_count_VC: 3,
    voltage_VC: 0,
    max_voltage_VC: 10,
    auto_click: { can: false, time: 0 },
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

  autoClick = (time, price) => {
    const { money, payment} = this.state;
    if (money >= price) {
      this.upgrade_VC[0].buy = false;
      let mon = (+money - price).toFixed(1);
      this.setState({
        money: mon,
        payment: +payment + price * 0.1,
        auto_click: { can: true, time: time },
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  plus_count_VC = (count, price) => {
    const { money, payment } = this.state;
    if (money >= price) {
      let mon = (+money - price).toFixed(1);
      this.setState({
        money: mon,
        payment: +payment + price * 0.05,
        max_count_VC: this.state.max_count_VC + count
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  componentDidMount() {
    this.add_click({ text: 'GT730', price: 0 })
  }

  click = (plus) => {
    const { money, count, payment} = this.state;

    let mon = (+money + plus).toFixed(1);
    if (count % this.time_payment === 0 && count !== 0) {
      mon = (+mon - payment).toFixed(1);
      this.onAlert(`ПЛАТИ НАЛОГИ ${payment}!`)
    }
    this.setState({
      money: mon,
      count: count + 1,
    })
  }

  up_voltage = (voltage, can_click, id) => {
    let volt;
    // const indexClick = this.props.masClick.findIndex(item => item.id = id)
    const fClick = this.state.masClick.slice(0, id);
    const sClick = this.state.masClick.slice(id + 1);
    let click = Object.assign({}, this.state.masClick[id]);
    if(can_click){
      volt = this.state.voltage_VC + voltage;
      click.work = 'true';
    }
    else{
      volt = this.state.voltage_VC - voltage;
      click.work = 'false';
    }
    this.setState({
      // masClick: [...fClick, click, ...sClick],
      voltage_VC: volt
    })
  }

  add_click = ({ text, price }) => {
    const { masClick, money, payment, count_VC, voltage_VC } = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({}, nClick[0]);
    const copyClick = masClick.filter(item => {
      return item.text === text
    })
    newClick.id = copyClick.length;
    newClick.work = 'false';
    let pay = (+payment + price * 0.1).toFixed(1);
    let mon = (+money - price).toFixed(1)

    // const newClick = { time_1_percent: 100, text: 'GT 730', id: 2 }
    this.setState({
      masClick: [...masClick, newClick],
      money: mon,
      payment: pay,
      count_VC: count_VC + 1,
      voltage_VC: voltage_VC + newClick.voltage
    })
  }

  buy_click = ({ text, price }) => {
    const { money, count_VC, max_count_VC } = this.state;
    if (money >= price && count_VC < max_count_VC) { this.add_click({ text, price }) }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    else if (count_VC >= max_count_VC) {
      this.onAlert('Нет места')
    }
  }

  sell_click = (text, id) => {
    const question = window.confirm('Видюху продаж?')
    if (question) {
      const { masClick, money, count_VC, payment, voltage_VC} = this.state;
      const index = masClick.findIndex((item) => { return item.id === id && item.text === text })
      const newMasClick = [...masClick.slice(0, index), ...masClick.slice(index + 1)]
      const price = masClick[index].price;
      const pay = (+payment - price * 0.1).toFixed(1);
      let mon = (+money + price * 0.9).toFixed(1);
      let volt;
      if(masClick[index].work) volt = masClick[index].voltage * 2;
      else volt = masClick[index].voltage;
      this.setState({
        money: mon,
        masClick: newMasClick,
        count_VC: count_VC - 1,
        payment: pay,
        voltage_VC: voltage_VC - volt
      })
    }
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
    const { money, masClick, activeAlert, tab, frame, activeFrame, auto_click, count_VC, max_count_VC, voltage_VC, max_voltage_VC } = this.state;
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
          upgrade_VC={this.upgrade_VC}
          auto_click={auto_click}
          tab={tab}
          frame={frame}
          activeFrame={activeFrame}
          onSwitch={this.onSwitch}
          count_VC={count_VC}
          max_count_VC={max_count_VC}
          up_voltage={this.up_voltage}
          voltage_VC={voltage_VC}
          max_voltage_VC={max_voltage_VC}
        ></GamePlace>
      </div>
    )
  }
}

const GamePlace = ({
  masClick, money, onClick, buy_click, sell_click,
  library_VC, upgrade_VC, auto_click, tab, frame,
  activeFrame, onSwitch, max_count_VC, count_VC,
  up_voltage, max_voltage_VC, voltage_VC
}) => {
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
        <div id = "game_info">
          <a>Намайнил: {money}</a>
          <a>Видюх: {count_VC}/{max_count_VC} </a>
          <a>БП: {voltage_VC}/{max_voltage_VC} </a>
        </div>
        <div id='frames'>
          <Frame
            frame={frame}
            activeFrame={activeFrame}
            buy_click={buy_click}
            sell_click={sell_click}
            library_VC={library_VC}
            upgrade_VC={upgrade_VC}
            auto_click={auto_click}
            masClick={masClick}
            onClick={onClick}
            up_voltage={up_voltage}
            money={money}
          >
          </Frame>

        </div>
      </div>
    </div>
  )
}






