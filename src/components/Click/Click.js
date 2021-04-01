import React, { PureComponent } from 'react';

// Видеокарты
import gt730_notwork from '../../img/work/Nofancard_notwork.png';
import gt730_work from '../../img/work/Nofancard_work.gif';
import gt750_notwork from '../../img/work/2fancard_notwork.png';
import gt750_work from '../../img/work/2fancard_work.gif';
import gt760_notwork from '../../img/work/Watercard_notwork.png';
import gt760_work from '../../img/work/Watercard_work.gif';


// Инфо
// import info_click_img from '../../img/work/InfoClick.png'


import "./click.css"

const click = (
  { masClick, onClick, money, sell_click, auto_click, up_voltage, voltage_VC, max_voltage_VC, onAlert}
  ) => {
  const mas_VC =
  {
    GT730_notwork: gt730_notwork,
    GT730_work: gt730_work,
    GT750_notwork: gt750_notwork,
    GT750_work: gt750_work,
    GT760_notwork: gt760_notwork,
    GT760_work: gt760_work,
  }
  const element = masClick.map((item, i) => {
    const { time_1_percent, text, id, plus, voltage, working} = item;
    const notwork = mas_VC[`${text}_notwork`];
    const work = mas_VC[`${text}_work`]

    return (
      <div className='click' key={`${text}_${id}`}>
        <Click
          time_1_percent={time_1_percent}
          text={text}
          onClick={onClick}
          plus={plus}
          sell_click={sell_click}
          index={i}
          auto_click={auto_click}
          notwork={notwork}
          work={work}
          voltage={voltage}
          up_voltage={up_voltage}
          working={working}
          voltage_VC={voltage_VC}
          max_voltage_VC={max_voltage_VC}
          onAlert={onAlert}
        ></Click>
      </div>
    )
  })
  return (
    <div className='List-click'>
      <div id='list'>
        {element}
      </div>
    </div>
  )
}

class Click extends PureComponent {

  constructor(props){
    super(props)
    this.time_auto_click = 0;
    this.time_interval_cooldown = 0;
  }

  state = {
    cooldown: 0,
  }

  componentDidMount() {
    this.auto_click();
  }

  componentWillUnmount(){
    clearInterval(this.time_auto_click)
    clearTimeout(this.time_interval_cooldown)
  }

  auto_click = () => {
    if (this.props.auto_click.can) {
      this.time_auto_click = setTimeout(() => this.click(this.props.plus, this.props.voltage), this.props.auto_click.time * 1000)
    }
  }

  click = (plus, voltage) => {
    const{voltage_VC, max_voltage_VC} = this.props;

    if (!this.props.working && voltage_VC + voltage <= max_voltage_VC) {
      this.start_cooldown(plus, voltage)
    }
    else if(voltage_VC + voltage > max_voltage_VC){
      this.props.onAlert('БП не потянет')
    }
  }
  start_cooldown = (plus, voltage) => {
    const { time_1_percent, working, index, text } = this.props;
    this.props.up_voltage(voltage, working, index, text);
    this.time_interval_cooldown = setInterval(() => this.plus_cooldown(plus, voltage), time_1_percent * 10)
  }

  plus_cooldown = (plus, voltage) => {
    const { cooldown } = this.state;
    const { working, index, text} = this.props
    if (cooldown !== 100) {
      this.setState({
        cooldown: cooldown + 1
      })
    }
    else {
      clearInterval(this.time_interval_cooldown);
      this.props.onClick(plus);
      this.props.up_voltage(voltage, working, index, text);
      this.auto_click();
      this.setState({
        cooldown: 0
      })
    }
  }

  sell = () => {
    const question = window.confirm('Видюху продаж?')
    if (question) {
      const { sell_click, index} = this.props;
      clearTimeout(this.time_auto_click);
      clearInterval(this.time_interval_cooldown);
      sell_click(index, this.props.working)
    }
  }

  render() {

    const { cooldown} = this.state;
    const { time_1_percent, text, plus, notwork, work, voltage, working} = this.props
    let img;
    if (!working) { img = notwork; }
    else { img = work }
    return (
      <>
        <div className="info_click">
          {/* <img className="info_click_img" alt={'logo'} src={info_click_img}></img> */}
          <div className="info_click_text">
            <div className='name_click'>{text}</div>
            <div className="time_cooldown">{(time_1_percent - cooldown * time_1_percent / 100).toFixed(2)} сек</div>
          </div>
          <div className="img_VC" onClick={() => { this.click(plus, voltage) }}><img src={img} alt={'logo'}></img></div>
          <button className="sell_click" onClick={this.sell}>Sell</button>
        </div>
        {/* <progress max="100" value={cooldown}></progress> */}

      </>
    )
  }
}

export default click;