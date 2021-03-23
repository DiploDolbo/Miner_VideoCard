import React, { Component } from 'react';

// import SwitchTab from './switch_tab.js';

import './tab.css';

export default class Tab extends Component {

    state = {
        onClos: this.props.onClose
    }

    // onClose = (e) =>{
    //     e.stopPropagation();
    //     this.state.onClos();
    // }

    
    render() {
        const {i, nameWP, text, onSwitch, clas} = this.props;
        const id_tab = `${nameWP}_${i}`
        // let tabs = window.parent.document.getElementById('panel_WP');
        return (
            <span id={id_tab} className={clas} onClick={onSwitch}>
                <a>{text ? text : 'Tab'}</a>
                {/* <span onClick={(e) =>this.onClose(e)}> X</span> */}
            </span>
        )
    }
}