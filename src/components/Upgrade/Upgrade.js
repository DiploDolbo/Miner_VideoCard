import React, {Component} from 'react';

import "./Upgrade.css"
// export default class Upgrade extends Component{
    
//     render(){
//         const {upgrade_VC} = this.props;
//         return(
//             <h1>Coming soon</h1>
//         )
//     }
// }

const Upgrade = ({upgrade_VC}) => {
    
    const element = upgrade_VC.map((item, i) => {
        const {text, price, func} = item;
        return(
            <div key = {`upgrade_${i}`} className = {'upgrade_item'}>
                <button onClick = {func}>{text}</button>
                <a>Стоит: {price}</a>
            </div>
        )
    })

    return(
        <div className = "Upgrade">
            <div id = "upgrade_list">
                {element}
            </div>
        </div>
    )

}

export default Upgrade