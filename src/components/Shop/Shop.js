import './Shop.css'

const Shop = ({ buy_click, library_VC }) => {

    const element = library_VC.map((item, i) => {
        const {text, price, voltage, plus} = item;
        return(
            <div key = {`shop_item_${i}`} className = "shop_item">
                <div className="name_buy">
                    <div className="name_VC">{text}</div>
                    <button onClick={() => { buy_click({text: text, price: price, votage: voltage}) }}>Купить</button>
                </div>
                <div className="info_shop_click">
                    <a className="price">Стоит: {price}</a>
                    <a>Доход: {plus}</a>
                    <a>Ватт: {voltage}</a>
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