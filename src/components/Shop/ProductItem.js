import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cartReducer';

const ProductItem = (props) => {
  const dispacth=useDispatch()
  const { title, price, description,id } = props;
  const addtoCartHandler=()=>{
     dispacth(cartActions.addItemToCart({
      id,
      title,
      price,
     }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addtoCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
