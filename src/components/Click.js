import React, {Component} from 'react';

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
          can_click: true
        })
      }
    }
  
    render() {
  
      const {cooldown} = this.state;
      const {time_1_percent, text} = this.props
      return (
        <div>
          <a>{text} </a>
          <button onClick={this.click}>Нажми меня!</button>
          <a> </a>
          <progress max="100" value={cooldown}></progress>
          <a> {(time_1_percent / 10 - cooldown * time_1_percent / 1000).toFixed(2)} сек</a>
        </div>
      )
    }
  }

  export default click;