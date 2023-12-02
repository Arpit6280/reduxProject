import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { uiAction } from './store/cartReducer';
import { fetchCartData } from './store/cart-actions';

let isInitial=true;

function App() {
  const isCartShown= useSelector(state=>state.ui.isCartShown)
  const cart=useSelector(state=>state.cart)
  const changed=useSelector(state=>state.cart.changed)
  const notification=useSelector(state=>state.ui.notification)
  const dispatch=useDispatch();


  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(()=>{
    const sendCartData=async()=>{
    dispatch(uiAction.showNotification({
      status:'pending',
      title:'Sending..',
      message:'Sending cart data'
    }))
  const response= await fetch('https://react-http-62209-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart)
    })
      if(!response.ok){
        
       
        throw new Error('Sending cart data failed')
      }
    

    dispatch(uiAction.showNotification({
      status:'success',
      title:'Success',
      message:'Sent cart data succesfully'
    }))
  }

  if(isInitial){
    isInitial=false
    return;
  }
  if(changed){
  sendCartData().catch(error=>{
    dispatch(uiAction.showNotification({
      status:'error',
      title:'Error',
      message:'Sending cart data failed'
    }))
  })
}
  },[cart,dispatch])
  console.log(isCartShown);
  console.log(notification);
  return (
    <>
   {notification &&  <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
     {isCartShown && <Cart /> }
      <Products />
    </Layout>
    </>
  );
}

export default App;
