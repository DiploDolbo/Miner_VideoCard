import React, { Component } from 'react';

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

const click = ({ masClick, onClick, money, sell_click, auto_click }) => {
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
    const { time_1_percent, text, id, plus } = item;
    const notwork = mas_VC[`${text}_notwork`];
    const work = mas_VC[`${text}_work`]

    return (
      <div className='click' key={`${text}_${i}`}>
        <Click
          time_1_percent={time_1_percent}
          text={text}
          onClick={onClick}
          plus={plus}
          sell_click={sell_click}
          id={id}
          auto_click={auto_click}
          notwork={notwork}
          work={work}
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

class Click extends Component {

  state = {
    cooldown: 0,
    can_click: true,
  }

  componentDidMount(){
    this.auto_click();
  }

  auto_click = () => {
    if(this.props.auto_click.can)
    {
      setTimeout(() => this.click(this.props.plus), this.props.auto_click.time * 1000)
    }

  }

  click = (plus) => {
    if (this.state.can_click) {
      this.start_cooldown()
      this.props.onClick(plus);
    }
  }
  start_cooldown = () => {
    const { time_1_percent } = this.props;
    this.time = setInterval(this.plus_cooldown, time_1_percent)
  }

  plus_cooldown = () => {
    const { cooldown } = this.state;
    if (cooldown !== 100) {
      this.setState({
        can_click: false,
        cooldown: cooldown + 1
      })
    }
    else {
      clearInterval(this.time);
      this.auto_click();
      this.setState({
        can_click: true,
        cooldown: 0
      })
    }
  }

  sell = () => {
    const { sell_click, id, text} = this.props;
    sell_click(text ,id)
  }

  render() {

    const { cooldown, can_click } = this.state;
    const { time_1_percent, text, plus, notwork, work } = this.props
    let img;
    if (can_click) { img = notwork; }
    else { img = work }
    return (
      <>
        <div className="info_click">
          {/* <img className="info_click_img" alt={'logo'} src={info_click_img}></img> */}
          <div className="info_click_text">
            <div className='name_click'>{text}</div>
            <div className="time_cooldown">{(time_1_percent / 10 - cooldown * time_1_percent / 1000).toFixed(2)} сек</div>
          </div>
          <div className="img_VC" onClick={() => { this.click(plus) }}><img src={img} alt={'logo'}></img></div>
          <button className="sell_click" onClick={this.sell}>Sell</button>
        </div>
        {/* <progress max="100" value={cooldown}></progress> */}

      </>
    )
  }
}

export default click;