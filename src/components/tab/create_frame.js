import React from 'react';

import Shop from '../Shop/Shop';
import Upgrade from '../Upgrade/Upgrade';
import Click from '../Click/Click';

const CreateFrame = ({
     frame, activeFrame, library_VC, upgrade_VC, auto_click,
    buy_click, sell_click, masClick, onClick, money, up_voltage,
    voltage_VC, max_voltage_VC, onAlert, turn_on_off_VC
    }) => {
    const elements = frame.map((item, i) => {
        const { nameF } = item;
        const { name } = activeFrame;
        let clas, element;
        if (`${name}_${i}` === `${nameF}_${i}`) {
            clas = 'frame frame_active'
        }
        else {
            clas = 'frame'
        }
        // eslint-disable-next-line default-case
        switch (nameF) {
            case 'Shop':
                element = <Shop
                    library_VC={library_VC}
                    buy_click={buy_click}
                // onAlert = {onAlert}
                >
                </Shop>
                break;
            case 'Upgrade':
                element = <Upgrade
                    upgrade_VC={upgrade_VC}
                // onAlert={onAlert}
                ></Upgrade>
                break;
            case 'Click':
                element = <Click
                    masClick={masClick}
                    onClick={onClick}
                    money={money}
                    sell_click={sell_click}
                    auto_click={auto_click}
                    up_voltage={up_voltage}
                    voltage_VC={voltage_VC}
                    max_voltage_VC={max_voltage_VC}
                    onAlert={onAlert}
                    turn_on_off_VC={turn_on_off_VC}
                >
                </Click>
        }
        return (
            <div
                key={`${nameF}_${i}`}
                className={clas}
            >
                {element}
            </div>
        )
    })

    return (
        <>
            {elements}
        </>
    )
}

export default CreateFrame;