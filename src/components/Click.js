import React, {Component} from 'react';
import gt730_notwork from '../img/work/Videocard_notwork.png';
import gt730_work from '../img/work/Videocard_work.gif';

const click = ({masClick, onClick}) => {
  const element = masClick.map((item) => {
    const {time_1_percent, text, id} = item;
    return(
      <div key = {`click_${id}`}>
        <Click 
          time_1_percent = {time_1_percent}
          text = {text}
          onClick = {onClick}
        ></Click>
      </div>
    )
  })
  return(
    <>
      {element}
    </>
  )

}

class Click extends Component {

    state = {
      cooldown: 0,
      can_click: true,
    }
  
    click = () => {
      if (this.state.can_click) {
        this.start_cooldown()
        this.setState({
          can_click: false,
          cooldown: 0
        })
        this.props.onClick();
      }
    }
    start_cooldown = () => {
      const { time_1_percent } = this.props;
      this.time = setInterval(this.plus_cooldown, time_1_percent)
    }
  
    plus_cooldown = () => {
      const { cooldown } = this.state;
      if (cooldown != 100) {
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
      const {time_1_percent, text} = this.props
      let img;
      if(can_click){img = gt730_notwork;}
      else {img = gt730_work}
      return (
        <div className = 'click'>
          <a>{text} </a>
          <button onClick={this.click}>Нажми меня!</button>
          <img className = "img_VC" src = {img} alt = {'logo'}></img>
          {/* <progress max="100" value={cooldown}></progress> */}
          <div><a> {(time_1_percent / 10 - cooldown * time_1_percent / 1000).toFixed(2)} сек</a></div>
        </div>
      )
    }
  }

  export default click;