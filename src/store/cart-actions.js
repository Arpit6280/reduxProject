import { cartActions, uiAction } from "./cartReducer";



export const fetchCartData=()=>{
    return async(dispatch)=>{
       const fetchData=async()=>{
         const response = await fetch('https://react-http-62209-default-rtdb.firebaseio.com/cart.json')
         if(!response.ok){
            throw new Error('Could not fetch Data ');
         }
         const data =await response.json()
         return data;
       }
       try{
       const cartData= await fetchData();
       dispatch(cartActions.replaceCart(cartData))
       } catch(e){
        console.log('er',e);
        // dispatch(uiAction.showNotification({
        //     status:'error',
        //     title:'Error',
        //     message:'Sending cart data failed'
        //   }))
       }
    }
}