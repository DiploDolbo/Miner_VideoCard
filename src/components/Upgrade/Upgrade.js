import React from 'react';

import "./Upgrade.css"

const Upgrade = ({ upgrade_VC }) => {

    const element = upgrade_VC.map((item, i) => {
        const { buy, text, price, func, properties } = item;
        let classN = '', info_upgrade = `Стоит: ${price}`, click = () => func(properties, price);
        if(!buy) 
        {
            classN = 'buy';
            info_upgrade = 'Куплено';
            click = () => {};
        }
        return (
            <div key={`upgrade_${i}`} className={`upgrade_item ${classN}`}>
                <button onClick={click}>{text}</button>
                <a>{info_upgrade}</a>
            </div>
        )
    })

    return (
        <div className="Upgrade">
            <div id="upgrade_list">
                {element}
            </div>
        </div>
    )

}

export default Upgrade