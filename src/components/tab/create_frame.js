import React from 'react';

import Shop from '../Shop/Shop';
import Upgrade from '../Upgrade/Upgrade';

const CreateFrame = ({ frame, activeFrame, library_VC, buy_click }) => {
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

                // onAlert={onAlert}
                ></Upgrade>
                break;
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