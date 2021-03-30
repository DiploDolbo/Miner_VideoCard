import './Shop.css'

const Shop = ({ buy_click, library_VC }) => {

    const element = library_VC.map((item, i) => {
        const {text, price, voltage} = item;
        return(
            <div key = {`shop_item_${i}`} className = "shop_item">
                <button onClick={() => { buy_click({text: text, price: price, votage: voltage}) }}>Взять {text}</button>
                <a>Стоит: {price}</a>
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