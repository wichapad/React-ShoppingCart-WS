//กำหนด action ในแอพ หรือการกระทำที่เกิดขึ้นในแอพ

const Reducer = (state, action) => {
  // state คือก้อนข้อมูล product ใน app
  if (action.type === "REMOVE_ITEM") {
    //เช็คว่า action ที่เกิดขึ้นเป็น remove item หรือไม่ ถ้าเป็นจริง คือต้องการ reomove ออกไปจาก state
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload), // กรองสมาชิกใน array ดึงเอา item แต่ละรายการที่อยู่ใน cart และตรวจเช็คว่า item.id มีค่าไม่เท่ากับ payload หรือเลข id ที่ส่งมาหรือเปล่า
    };
  }
  if (action.type === "TOGGLE_QUANTITY") {
    let newCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          //เช็คว่า มีสมาชิกใดที่อยู่ใน cart นี้ มี id ที่ตรงกับ id ที่ส่งมาพร้อมกันกับ action //แสดงรายละเอียดของ item เพื่อที่จะดูข้อมูลด้านใน item ของเราว่าเป็นอย่างไร เมื่อเทียบกับ id ที่ส่งมา
          if (action.payload.type === "increment") {
            //เป็นการเพิ่ม quantity ตาม id ที่ส่งมา
            return {
              ...item,
              quantity: item.quantity < 5 ? item.quantity + 1 : item.quantity, //ถ้าค่าใน quantity น้อยกว่า 5 จะเพิ่มค่าทีละ 1 แต่ถ้ามากกว่าจะให้เป็นค่าคงที่
            };
          }
          if (action.payload.type === "decrement") {
            //เป็นการลด quantity ตาม id ที่ส่งมา
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        }
        return item;
      })
      // eslint-disable-next-line
      .filter((item) => item.quantity != 0); //ถ้า item มีค่าเป็น 0 ให้เอา item ออกไป
    console.log(newCart);
    return {
      ...state,
      cart: newCart,
    };
  }
  if (action.type === "CALCULATE_TOTAL") {
    const { total, amount } = state.cart.reduce(
      (cartTotal, item) => {
        const { price, quantity } = item;
        const itemTotal = price * quantity;
        cartTotal.total += itemTotal;
        cartTotal.amount += quantity;
        return cartTotal
      },
      {
        //เก็บค่าเริ่มต้นของ cartTotal
        total: 0,
        amount: 0,
      }
    );
    return {
      ...state,
      total,
      amount,
    };
  }
};

export default Reducer;
