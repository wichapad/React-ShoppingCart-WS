//สร้าง context API ในการให้บริการข้อมูล แก่ component ในแอพ
import { createContext, useContext, useReducer, useEffect } from "react";
import CartData from "../data/CartData";
import reducer from "./reducer";

const initState = {
  //นำข้อมูลใน CartData มาเก็บรวมเป็นก้อนๆ เดียว
  cart: CartData, //เก็บข้อมูลใน cart data ลงใน props cart
  total: 0, //เก็บยอดรวมของ product
  amount: 0, //เก็บข้อมูลปริมาณ product
};
const CartContext = createContext(); //ข้อมูลที่ส่งไปทำงานใน component และ ทำงานอยู่ใน cartprovider

export const MyCartContext = () => {
  //ถ้า component ไหนจะใช้ cartContext ให้มาเรียกใช้ function myCartContext
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  //ผู้ให้บริการข้อมูลในแอพ โดยส่งข้อมูล cartContext ไปใช้ เปรียบเหมือนเราสร้าง component ขึ้นมาอีกตัว แล้วมี component ลูกด้านใน ทำการกระจายหรือแชร์ข้อมูลไปยัง component อื่นๆ ภายในแอพ

  const [state, dispatch] = useReducer(reducer, initState); //นำข้อมูลใน initState มาทำงาน เก็บลง array state ใน array คือ ก้อนข้อมูล dispatch คือการเปลี่ยนแปลงข้อมูล

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.cart]); //เมื่อมีการเปลี่ยนแปลงข้อมูลใน state cart จะให้ระบบสั่ง dispatch ให้เกิด action เกิดขึ้นในแอพ

  const removeItem = (id) => {
    //ลบ item ตามเลข id  เมื่อมีการเรียกใช้ฟังชั่น ให้ส่ง parameter id ไปด้วย
    dispatch({ type: "REMOVE_ITEM", payload: id }); //removeitem คือชื่อรูปแบบ หรือชื่อเกิดขึ้นภายใน action ให้ส่งเลข id ไปทำงานด้วย
  };

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const toggleQuantity = (id, type) => {
    //เพิ่มลดสินค้า
    dispatch({ type: "TOGGLE_QUANTITY", payload: { id, type } });
  };

  return (
    <CartContext.Provider value={{ ...state, removeItem, toggleQuantity ,formatNumber}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
