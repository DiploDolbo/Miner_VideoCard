import React, { Component } from 'react';

// Видеокарты
import gt730_notwork from '../../img/work/Videocard_notwork.png';
import gt730_work from '../../img/work/Videocard_work.gif';

// Инфо
import info_click_img from '../../img/work/InfoClick.png'


import "./click.css"

const click = ({ masClick, onClick, money, sell_click, auto_click }) => {
  const element = masClick.map((item) => {
    const { time_1_percent, text, id, plus } = item;
    return (
      <div className='click' key={`${text}_${id}`}>
        <Click
          time_1_percent={time_1_percent}
          text={text}
          onClick={onClick}
          plus={plus}
          sell_click={sell_click}
          id={id}
          auto_click={auto_click}
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

  componentDidUpdate(){
    const{can, time} = this.props.auto_click;
    if(can && this.state.can_click)
    {
      const auto = setTimeout(() => {this.click(this.props.plus)}, time*1000)
    }
  }

  click = (plus) => {
    if (this.state.can_click) {
      this.start_cooldown()
      this.setState({
        can_click: false,
        cooldown: 0
      })
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
        cooldown: cooldown + 1
      })
    }
    else {
      clearInterval(this.time);
      this.setState({
        can_click: true,
        cooldown: 0
      })
    }
  }

  sell = () =>{
    const {sell_click, id} = this.props;
    sell_click(id)
  }

  render() {

    const { cooldown, can_click } = this.state;
    const { time_1_percent, text, plus} = this.props
    let img;
    if (can_click) { img = gt730_notwork; }
    else { img = gt730_work }
    return (
      <>
        <div className="info_click">
          {/* <img className="info_click_img" alt={'logo'} src={info_click_img}></img> */}
          <div className="info_click_text">
            <div className='name_click'>{text}</div>
            <div className="time_cooldown">{(time_1_percent / 10 - cooldown * time_1_percent / 1000).toFixed(2)} сек</div>
          </div>
        </div>
        <div className="img_VC" onClick={() => { this.click(plus) }}><img src={img} alt={'logo'}></img></div>
        <button className="sell_click" onClick={this.sell}>Sell</button>
        {/* <progress max="100" value={cooldown}></progress> */}

      </>
    )
  }
}

export default click;