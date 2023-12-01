import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiAction } from '../../store/cartReducer';

const CartButton = () => {
  const totalQuantity=useSelector(state=>state.cart.totalQuantity)
  const dispatch=useDispatch()
  const clickHandler=()=>{
  dispatch(uiAction.openCloseCart())
  console.log('hi');
  }
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity} </span>
    </button>
  );
};

export default CartButton;
