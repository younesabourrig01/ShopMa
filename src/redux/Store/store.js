import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../redux/features/products/productsSlice";
import cartReducer from "../features/Cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
