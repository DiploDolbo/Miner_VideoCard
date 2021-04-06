import React from 'react';
// import Tab from './tab';

// import SwitchTab from './switch_tab.js';

import './tab.css';

const CreateTab = ({ tab, onSwitch, activeFrame, curtain, switch_curtain }) => {
    let elements_1, elements_2, style = ''
    elements_1 = tab.map((item, i) => {
        if (i < 3) {
            const { nameWP, text } = item;
            const { name } = activeFrame;
            let clas;
            const full_name = `${nameWP}_tab_${i}`
            if (`${name}_tab_${i}` === full_name) {
                clas = 'tab_wp tab_wp_active'
            }
            else {
                clas = 'tab_wp'
            }
            return (
                <div key={full_name} className={clas} onClick={() => onSwitch(nameWP, i)}>
                    {text ? text : 'Tab'}
                </div>
            )
        }
    })
    if (curtain) {
        style = 'active_curtain'
        elements_2 = tab.map((item, i) => {
            if (i < 6 && i > 2) {
                const { nameWP, text } = item;
                const { name } = activeFrame;
                let clas;
                const full_name = `${nameWP}_tab_${i}`
                if (`${name}_tab_${i}` === full_name) {
                    clas = 'tab_wp tab_wp_active'
                }
                else {
                    clas = 'tab_wp'
                }
                return (
                    <div key={full_name} className={clas} onClick={() => onSwitch(nameWP, i)}>
                        <a>{text ? text : 'Tab'}</a>
                    </div>
                )
            }
        })
    }


    return (
        <>
            <div className="tab_floor">{elements_1}</div>
            <div className="tab_floor">{elements_2}</div>
            <div className={style} onClick={switch_curtain} id="curtain">☰</div>
        </>
    )
}

export default CreateTab