import React from 'react';

import "./Upgrade.css"

const Upgrade = ({ upgrade_VC }) => {

    const element = upgrade_VC.map((item, i) => {
        const { buy, text, price, func, properties, name, name_properties, description } = item;
        let classN = '', info_upgrade = '', click = () => func(properties, price);
        if(!buy) 
        {
            classN = 'buy';
            info_upgrade = 'Куплено';
            click = () => {};
        }
        return (
            // <div className="name_buy">
            //         <div className="name_VC">{text}</div>
            //         <button onClick={() => { buy_click({text: text, price: price, votage: voltage}) }}>Купить</button>
            //     </div>
            //     <div className="info_shop_click">
            //         <a>Стоит: {price}</a>
            //         <a>Доход: {plus}</a>
            //         <a>Ватт: {voltage}</a>
            //     </div>
            <div key={`upgrade_${i}`} className={`upgrade_item ${classN}`}>
                <div className="name_buy_upgrade">
                    <button className={`name_upgrade ${name}`} onClick={click}><div>{text}</div></button>
                </div>
                <div className="info_upgrade" >
                    <div className="description_update">{description}</div>
                    <div>{name_properties}: {properties}</div>
                    <div className="price_upgrade">Стоит: {price}$</div>
                </div>
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