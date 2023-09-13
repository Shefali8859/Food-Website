import CartIcon from '../Cart/Cardicon';
import classes from './HeaderCardButton.module.css';
import CartContext from '../../Store/cart-context';
import { useContext, useEffect , useState} from 'react';

const HeaderCartButton = (props) => {
  const [btnIsHighLighted,setBtnIsHighLighted]=useState(false);
  const cartCtx= useContext(CartContext);

  const { items }=cartCtx;
  
  const numberOfCartIteas= items.reduce((curNumber,item)=>{
    return curNumber+item.amount;
  },0);
 

const btnClasses = `${classes.button} ${btnIsHighLighted? classes.bump: ''}`;
useEffect(()=>{
  if(items.length===0){
    return;
  }
  setBtnIsHighLighted(true);

  const timer=setTimeout(()=>{
    setBtnIsHighLighted(false);
  },300);

  return ()=>{
   clearTimeout(timer);
  };
},[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
       <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartIteas}</span>
    </button>
  );
};

export default HeaderCartButton;