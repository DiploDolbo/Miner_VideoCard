import React, {Component} from 'react';
import gt730_notwork from '../../img/work/Videocard_notwork.png';
import gt730_work from '../../img/work/Videocard_work.gif';

import "./click.css"

const click = ({masClick, onClick}) => {
  const element = masClick.map((item) => {
    const {time_1_percent, text, id, plus} = item;
    return(
      <div key = {`${text}_${id}`}>
        <Click 
          time_1_percent = {time_1_percent}
          text = {text}
          onClick = {onClick}
          plus = {plus}
        ></Click>
      </div>
    )
  })
  return(
    <div id = 'list'>
      {element}
    </div>
  )

}

class Click extends Component {

    state = {
      cooldown: 0,
      can_click: true,
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
  
    render() {
  
      const {cooldown, can_click} = this.state;
      const {time_1_percent, text, plus} = this.props
      let img;
      if(can_click){img = gt730_notwork;}
      else {img = gt730_work}
      return (
        <div className = 'click'>
          <div className = 'name_click'>{text}</div>
          <button onClick={() => {this.click(plus)}}>Нажми меня!</button>
          <div className = "img_VC"><img src = {img} alt = {'logo'}></img></div>
          {/* <progress max="100" value={cooldown}></progress> */}
          <div className = "time_cooldown">{(time_1_percent / 10 - cooldown * time_1_percent / 1000).toFixed(2)} сек</div>
        </div>
      )
    }
  }

  export default click;