import React, { PureComponent } from 'react';
import Alert from './components/alert/alert';

import Tab from './components/tab/create_tab';
import Frame from './components/tab/create_frame';

import './App.css';

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.time = 0;
    this.alert_money = 10;
    this.time_payment = 72;
    this.coef_watts = 0.1;
    this.count_buy_VC = 0;
    this.chilling = 0;
    this.library_VC =
      [
        { time_1_percent: 2.4, text: 'GT730', plus: 1, price: 5, voltage: 1, coif_volt: 0.5 },
        { time_1_percent: 2.4, text: 'GT750', plus: 1.5, price: 8, voltage: 2, coif_volt: 0.5},
        { time_1_percent: 2.4, text: 'GT760', plus: 2, price: 16, voltage: 3, coif_volt: 0.5 }
      ];
    this.upgrade_VC = [
      { buy: true, description: 'Братан будет кликать за тебя',
        name_properties: 'Время задержки', properties: 0.5, 
        name: 'autoclick', text: 'Помощь братана', func: this.autoClick,
        price: 100, coef: 0.1 },
      { buy: true, description: 'Aerocool топ за сови деньги',
        name_properties: 'Ватт', properties: 2, name: 'BP', 
        text: 'БП по лучше', func: this.pluce_voltage_VC, price: 100, coef: 0},
      { buy: true, description: 'Ещё одна полочка',
        name_properties: 'Плюс место', properties: 1, name: 'FP',
        text: "Освободить место", func: this.plus_count_VC, price: 200, coef: 0 },

    ]
  }

  state = {
    money: 300,
    spentWatts: 0,
    day: 0,
    count: 0,
    payment: 0,
    count_VC: 0,
    max_count_VC: 3,
    voltage_VC: 0,
    max_voltage_VC: 10,
    temp_VC: 23,
    max_temp_VC: 70,
    auto_click: { can: false, time: 0 },
    masClick: [],
    activeAlert: {},
    tab: [
      { nameWP: "Click", text: "ГЛАВНОЕ" },
      { nameWP: "Shop", text: "МАГАЗИН" },
      { nameWP: "Upgrade", text: "УЛУЧШИТЬ" },
      { nameWP: "Test_1", text: "Text_1"},
      { nameWP: "Test_2", text: "Text_2"},
      { nameWP: "Test_3", text: "Text_3"},
    ],
    frame: [
      { nameF: "Click" },
      { nameF: "Shop" },
      { nameF: "Upgrade" }
    ],
    activeFrame: { name: "Click" },
    curtain: false
  }

  componentDidMount() {
    this.add_click({ text: 'GT730', price: 0 })
    this.paymentInterval = setInterval(this.paymentTime, this.time_payment * 1000)
    this.spentWattsInterval = setInterval(this.spentWattsFunction, 2400)
  }

  paymentTime = () => {
    const {money, payment, spentWatts} = this.state;
    let pay = spentWatts + payment;
    let mon = (+money - pay).toFixed(1);
    this.onAlert(`ПЛАТИ НАЛОГИ ${pay}!`)
    console.log(pay)
    this.setState({
        money: mon,
        spentWatts: 0,
        day: 0
      })
  }

  spentWattsFunction = () => {
    const {spentWatts, voltage_VC, day} = this.state;
    let pay = +(spentWatts + voltage_VC * this.coef_watts).toFixed(1)
    let d = day + 1;
    this.setState({
      spentWatts: pay,
      day: d
    })

  }

  // Update

  autoClick = (time, price) => {
    const { money, payment } = this.state;
    if (money >= price) {
      this.upgrade_VC[0].buy = false;
      let mon = (+money - price).toFixed(1);
      this.setState({
        money: mon,
        payment: +payment + price * this.upgrade_VC[0].coef,
        auto_click: { can: true, time: time },
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  pluce_voltage_VC = (count, price) => {
    const {money, payment} = this.state;
    if (money >= price){
      let mon = (+money - price).toFixed(1);
      this.setState({
        money: mon,
        payment: +payment + price * this.upgrade_VC[1].coef,
        max_voltage_VC: this.state.max_voltage_VC + count
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
        payment: +payment + price * this.upgrade_VC[2].coef,
        max_count_VC: this.state.max_count_VC + count
      })
    }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
  }

  plus_chilling = (count, price) => {

  }

  // 

  click = (plus) => {
    const { money} = this.state;
    let mon = (+money + plus).toFixed(1);
    this.setState({
      money: mon,
    })
  }

  up_voltage = (voltage, working, index) => {
    let volt, temp;
    // const indexClick = this.state.masClick.findIndex((item) => { return item.id === id && item.text === text })
    const fClick = this.state.masClick.slice(0, index);
    const sClick = this.state.masClick.slice(index + 1);
    let click = Object.assign({}, this.state.masClick[index]);
    if (!working) {
      volt = this.state.voltage_VC + voltage;
      temp = this.state.temp_VC + 20;
      click.working = true;
    }
    else{
      volt = this.state.voltage_VC - voltage;
      temp = this.state.temp_VC - 20;
      click.working = false;
    }
    this.setState({
      masClick: [...fClick, click, ...sClick],
      voltage_VC: volt,
      temp_VC: temp
    })
  }

  add_click = ({ text, price }) => {
    const { masClick, money, count_VC, voltage_VC } = this.state;
    const indexClick = this.library_VC.findIndex(item => item.text === text)
    const nClick = this.library_VC.slice(indexClick, indexClick + 1);
    const newClick = Object.assign({}, nClick[0]);

    this.count_buy_VC ++;
    newClick.working = false;
    newClick.id = this.count_buy_VC;
    let mon = (+money - price).toFixed(1)

    this.setState({
      masClick: [...masClick, newClick],
      money: mon,
      count_VC: count_VC + 1,
      voltage_VC: voltage_VC + newClick.voltage
    })
  }

  buy_click = ({ text, price, voltage }) => {
    const { money, count_VC, max_count_VC, voltage_VC, max_voltage_VC} = this.state;
    if (money >= price && count_VC < max_count_VC ) { this.add_click({ text, price }) }
    else if (money < price) {
      this.onAlert('Не хватает')
    }
    // else if (voltage_VC >= max_voltage_VC){
    //   this.onAlert('БП не потянет')
    // }
    else if (count_VC >= max_count_VC) {
      this.onAlert('Нет места')
    }
  }

  sell_click = (index, working) => {
    const { masClick, money, count_VC, payment, voltage_VC } = this.state;
    // const index = masClick.findIndex((item) => { return item.id === id && item.text === text })
    const newMasClick = [...masClick.slice(0, index), ...masClick.slice(index + 1)]
    const price = masClick[index].price;
    // const pay = (+payment - price * 0.1).toFixed(1);
    let mon = +(+money + price * 0.9).toFixed(1);
    let volt;
    if (working) volt = masClick[index].voltage * 2;
    else volt = masClick[index].voltage;
    this.setState({
      money: mon,
      masClick: newMasClick,
      count_VC: count_VC - 1,
      voltage_VC: voltage_VC - volt
    })
  }

  turn_on_off_VC = (voltage, working, index, VC_on, coif_volt) => {
    let volt;
    // const indexClick = this.state.masClick.findIndex((item) => { return item.id === id && item.text === text })
    const fClick = this.state.masClick.slice(0, index);
    const sClick = this.state.masClick.slice(index + 1);
    let click = Object.assign({}, this.state.masClick[index]);
    if (working && !VC_on) {
      volt = this.state.voltage_VC - voltage * 2;
      click.working = false;
    }
    else if(!working && !VC_on){
      volt = this.state.voltage_VC - voltage;
      click.working = false;
    }
    else if(VC_on)
    {
      volt = this.state.voltage_VC + voltage;
      click.working = false;
    }
    this.setState({
      masClick: [...fClick, click, ...sClick],
      voltage_VC: volt
    })

  }

  //Alert
  onAlert = (message) => {
    const newAlert = { text: message, id: 0 };
    this.setState({
        activeAlert: newAlert
      })
  }

  closeAlert = () => {
    this.setState({
        activeAlert: {}
      })
  }

  //Tab
  onSwitch = (nameWP, id_t) => {
    const { name, id } = this.state.activeFrame;

    if (`${nameWP}_tab_${id_t}` === `${name}_tab_${id}`) return;
    else {
      this.setState({
        activeFrame: { name: nameWP, id: id_t }
      })
    }
  }

  switch_curtain = () => {
    const {curtain} = this.state
    this.setState({
      curtain: !curtain
    })
  }

  render() {
    const { 
      money, masClick, activeAlert, tab, frame,
      activeFrame, auto_click, count_VC, max_count_VC,
      voltage_VC, max_voltage_VC, temp_VC, max_temp_VC,
      spentWatts, day,curtain
      } = this.state;
    return (
      <div className='App'>
        <div className='App-header'>
          <a>MINER VIDEOCARD</a>
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
          temp_VC={temp_VC}
          max_temp_VC={max_temp_VC}
          onAlert={this.onAlert}
          turn_on_off_VC={this.turn_on_off_VC}
          spentWatts={spentWatts}
          day={day}
          curtain={curtain}
          switch_curtain={this.switch_curtain}
        ></GamePlace>
      </div>
    )
  }
}

const GamePlace = ({
  masClick, money, onClick, buy_click, sell_click,
  library_VC, upgrade_VC, auto_click, tab, frame,
  activeFrame, onSwitch, max_count_VC, count_VC,
  up_voltage, max_voltage_VC, voltage_VC, temp_VC,
  max_temp_VC, onAlert,turn_on_off_VC, spentWatts,
  day, curtain, switch_curtain
}) => {
  return (
    <div className='Game-place'>
      <div id='shop_upgrade'>
        <div id='tab_s_u'>
          <Tab
            tab={tab}
            activeFrame={activeFrame}
            onSwitch={onSwitch}
            curtain={curtain}
            switch_curtain={switch_curtain}
          >
          </Tab>
        </div>
        <div id="game_info_img">
          <div id="game_info">
            <a>Баланс: {money} $</a>
            <a>Видюх: {count_VC}/{max_count_VC} </a>
            <a>БП: {voltage_VC}/{max_voltage_VC} Вт </a>
            <a>Градусы: {temp_VC}/{max_temp_VC} ℃ </a>
            <a>День: {day}</a>
            <a>Налоги: {spentWatts}</a>
          </div>
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
            voltage_VC={voltage_VC}
            max_voltage_VC={max_voltage_VC}
            onAlert={onAlert}
            turn_on_off_VC={turn_on_off_VC}
          >
          </Frame>

        </div>
      </div>
    </div>
  )
}






