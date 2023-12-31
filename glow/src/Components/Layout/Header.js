import {Fragment}from "react"
import mealsImage from '../../assets/meals.jpeg';
import classes from './Header.module.css';
import HeaderCardButton from "./HeaderCardButton";
const Header=props=>{
    return <Fragment>
        <header className={classes.header}>
            <h1>Meals</h1>
            <HeaderCardButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
           <img src={mealsImage} alt="A table full of food" />
        </div>


    </Fragment>

};
export default Header;