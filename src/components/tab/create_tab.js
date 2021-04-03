import React from 'react';
import Tab from './tab';

// import SwitchTab from './switch_tab.js';

import './tab.css';

const CreateTab = ({tab, onSwitch, activeFrame}) =>{
    const elements = tab.map((item, i) =>{
        const {nameWP} = item;
        const {name} = activeFrame;
        let clas;
        const full_name = `${nameWP}_tab_${i}`
        if(`${name}_tab_${i}` === full_name) 
                {
                    clas = 'tab_wp tab_wp_active'
                }
                else{
                    clas = 'tab_wp'
                }
        return(
            <div key = {full_name} className = {clas}>
                <Tab 
                    {...item}
                    clas = {clas}
                    onSwitch = {() => onSwitch(nameWP, i)}
                ></Tab>
            </div>
        )
    })

    return(
        <>
            {elements}
        </>
    )
}

export default CreateTab