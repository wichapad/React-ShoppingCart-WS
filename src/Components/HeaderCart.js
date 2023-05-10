import { MyCartContext } from "../Management/Context";

const HeaderCart = () => {
  const {amount} = MyCartContext()
  return (
    <button className="button">
      <span>Cart</span>
      <span className="budget">{amount}</span>
    </button>
  );
};

export default HeaderCart;
