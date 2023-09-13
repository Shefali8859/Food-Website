import classes from'./Cart.module.css';
import React,{ useContext ,useState} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../Store/cart-context';
import Checkout from './Checkout';

const Cart=props=>{
    const[isCheckout,setIsCheckout]=useState(false);
    const[isSubmiting,setIsSubmiting]=useState(false);
    const[didSubmit,setDidSubmit]=useState(false);
   const cartCtx = useContext(CartContext);

  const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length>0;

  const cartItemRemoveHandler=id=>{
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler=item=>
  {
    cartCtx.addItem(item);
  };

  const orderHandler =()=>{
     setIsCheckout(true);
  };
  
  const submitHandler=async(userData)=>{
    setIsSubmiting(true);
   await fetch('https://food-98f5e-default-rtdb.firebaseio.com/orders.json',{
        method:'POST',
        body: JSON.stringify({
            user:userData,
            orderedItems:cartCtx.items
        })
     });
     setIsSubmiting(false);
     setDidSubmit(true);
     cartCtx.clearCart();
  };


    const cartItems= (
    <ul className={classes['card-items']}>
        {cartCtx.items.map((item)=>(
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}/>
        ))}
    </ul>
    );
    const modalActions=(
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
            Close
            </button>
            {hasItem && <button className={classes.button} onClick={orderHandler}>
                Order
                </button>}
        </div>
    );
    const cartModalContent=(
        <React.Fragment>
             {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onClose }/>}
        {!isCheckout && modalActions}
        </React.Fragment>
    );
    const isSubmittingModalContext=<p>Sensing order data...</p>;
    const didSubmitModalContent=(
    <React.Fragment>
    <p>Successfully sent the order!</p>;
    <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
            Close
            </button>
        </div>
    </React.Fragment>
    );
    return (
    <Modal onClose={props.onClose}>
       {!isSubmiting && !didSubmit && cartModalContent}
       {isSubmiting && isSubmittingModalContext}
       {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
    );
};
export default Cart;