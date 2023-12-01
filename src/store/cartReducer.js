import { configureStore, createSlice } from "@reduxjs/toolkit";

// createSlice

const initialUIState = { isCartShown: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    openCloseCart(state) {
      state.isCartShown = !state.isCartShown;
    },
  },
});

const cartSlice=createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity=existingItem.quantity+1
        existingItem.totalPrice=existingItem.totalPrice+newItem.price
      }
    },
    removeItemFromCart(state,action){
        state.totalQuantity--;
        const id=action.payload;
        const existingItem=state.items.find(item=> item.id===id);
        if(existingItem.quantity===1){
            state.items=state.items.filter(item=>item.id!==id)
        }else{
            existingItem.quantity--;
            existingItem.totalPrice=existingItem.totalPrice-existingItem.price
        }
    }
  },
});

const store = configureStore({
  reducer: { ui: uiSlice.reducer ,cart:cartSlice.reducer},
});
export const uiAction = uiSlice.actions;
export const cartActions=cartSlice.actions

export default store;