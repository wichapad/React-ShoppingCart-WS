//แสดงรายการสินค้าแต่ละรายการ
import plus from "../image/plus.svg";
import minus from "../image/minus.svg";
import deleteIcon from "../image/delete-icn.svg";
import { MyCartContext } from "../Management/Context";

const CartItem = ({ id, name, image_url, price, quantity }) => {
  const { removeItem, toggleQuantity ,formatNumber} = MyCartContext();
  return (
    <div className="item">
      <div className="product_image">
        <img src={image_url} alt={name} />
      </div>
      <div className="product_des">
        <span>{name}</span>
        <span>Price : {formatNumber(price)}</span>
      </div>
      <div className="quantity">
        <button className="plus_btn" onClick={() => toggleQuantity(id,"increment")}>
          <img src={plus} alt="" />
        </button>
        <input type="text" value={quantity} disabled />
        <button className="minus_btn" onClick={() => toggleQuantity(id,"decrement")}>
          <img src={minus} alt="" />
        </button>
      </div>
      <div className="total_price">{formatNumber(quantity * price)}</div>
      <div className="product_remove" onClick={() => removeItem(id)}>
        <img src={deleteIcon} alt="" />
      </div>
    </div>
  );
};

export default CartItem;
