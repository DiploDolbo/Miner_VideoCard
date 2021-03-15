import React, {Component} from 'react';

export default class Click extends Component {

    state = {
      cooldown: 0,
      can_click: true,
      time_1_percent: this.props.time_1_percent
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
      const { time_1_percent } = this.state;
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
  
      const { count, cooldown, time_1_percent } = this.state;
      return (
        <div>
          <button onClick={this.click}>Нажми меня!</button>
          <progress max="100" value={cooldown}></progress>
          <a> {(time_1_percent / 10 - cooldown * time_1_percent / 1000).toFixed(2)} сек</a>
        </div>
      )
    }
  }