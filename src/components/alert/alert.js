import React, { Component } from 'react';

import "./alert.css";

const Alert = ({ activeAlert, closeAlert }) => {
    const element = activeAlert.map((item) => {
        const { text, id } = item
        return (
            <div key = {`alert_${id}`}>
                <Al
                    text={text}
                    id={id}
                    closeAlert = {closeAlert}
                />

            </div>
        )
    })
    return (
        <div id="alert_Cont">
            {element}
        </div>
    )
}

class Al extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const {closeAlert, id} = this.props;
        setTimeout(() => closeAlert(id), 1000)
    }

    render() {
        const { text, id} = this.props;
        return (
            <div id={`alert_win_${id}`} className='alert_win'>
                <span id={`alert_text_${id}`} className='alert_text'>{`${text}`}</span>
                {/* <div className = 'close_alert' onClick = {() => {closeAlert(id)}}>X</div> */}
            </div>
        )
    }
}

export default Alert;
