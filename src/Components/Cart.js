//จัดการตะกร้าสินค้า
import { MyCartContext } from "../Management/Context";
import CartItem from "./CartItem";


const Cart = () =>{
    const {cart,total ,formatNumber} = MyCartContext()
    if (cart.length === 0) {
        //show ไม่มีสินค้าในตะกร้า
        return(
            <div className="shopping_cart">
                <div className="empty">Cart Not Found!!</div>
            </div>
        )
    } else {
        return(
            <div className="shopping_cart">
                <div className="title">Product</div>
                {cart.map((data)=>{
                    return <CartItem key={data.id} {...data}/>
                })}
                <div className="footer">Total : {formatNumber(total)} Bath</div>
            </div>
        )
    }
}

export default Cart