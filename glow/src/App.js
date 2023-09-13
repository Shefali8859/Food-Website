
import Header from "./Components/Layout/Header";
import React, {  useState} from "react";
import Meals from "./Components/Meals/Meals";
import Cart from './Components/Cart/Cart';
import CartProvider from "./Store/CartProvider";



function App() {
  const [cartIsShown,setCartIsShown] =useState(false);
  const  showCartHandler =()=>{
    setCartIsShown(true);
  };
  const hideCartHandeler=()=>{
       setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandeler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
       <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
