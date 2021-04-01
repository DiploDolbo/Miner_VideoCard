import './Shop.css'

const Shop = ({ buy_click, library_VC }) => {

    const element = library_VC.map((item, i) => {
        const {text, price, voltage, plus} = item;
        return(
            <div key = {`shop_item_${i}`} className = "shop_item">
                <button onClick={() => { buy_click({text: text, price: price, votage: voltage}) }}>Взять {text}</button>
                <div className="info_shop_click">
                    <a>Стоит: {price}</a>
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