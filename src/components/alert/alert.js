import React, { PureComponent } from 'react';

import "./alert.css";

const Alert = ({ activeAlert, closeAlert }) => {
    let element = null;
    if(activeAlert.text != undefined){
        element = (<Al
            text={activeAlert.text}
            id={activeAlert.id}
            closeAlert = {closeAlert}
        />)
        
    }
    return (
        <div id="alert_Cont">
            {element}
        </div>
    )
}

class Al extends PureComponent {

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
