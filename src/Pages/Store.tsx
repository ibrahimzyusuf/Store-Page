import storeItems from "../Data/items.json";
import StoreItem from '../Components/StoreItem'


const Store = () => {
return (
    <div className='store'>
        <h1 className='store_title'>Store</h1>
        <div className="items_container">
            {storeItems.map(item=>
                <div className="item" key={item.id}><StoreItem {...item}/></div>
            )}
        </div>
    </div>
)
}

export default Store