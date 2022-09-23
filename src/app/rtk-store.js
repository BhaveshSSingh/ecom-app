import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/product-slice";
import cartReducer from "../features/cart-slice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
