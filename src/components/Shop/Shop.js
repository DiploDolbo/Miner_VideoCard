import './Shop.css'

const Shop = ({ buy_click, library_VC }) => {

    const element = library_VC.map((item, i) => {
        const {text, price, voltage, plus} = item;
        return(
            <div key = {`shop_item_${i}`} className = "shop_item">
                <div className="name_buy">
                {/* <button className={`name_upgrade ${name}`} onClick={click}><div>{text}</div></button> */}
                    <button className={`name_VC ${text}`} onClick={() => { buy_click({text: text, price: price, votage: voltage}) }}>
                        <div >{text}</div>
                    </button>
                </div>
                <div className="info_shop_click">
                    <a>Доход: {plus}</a>
                    <a>Ватт: {voltage}</a>
                    <a className="price_shop">Стоит: {price}</a>
                </div>
                
            </div>
        )
    })

    return (
        <div className="Shop">
            <div id = 'shop_list'>
                {element}
            </div>
        </div>
    )
}

export default Shop;