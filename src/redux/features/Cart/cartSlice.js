import { createSlice } from "@reduxjs/toolkit";

import { loadCartFromStorage } from "./cartStorage";

const initialState = loadCartFromStorage() || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += product.price;
      }

      state.totalPrice += product.price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.totalPrice;

      state.items = state.items.filter((item) => item.id !== id);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (!item || quantity <= 0) return;

      state.totalQuantity += quantity - item.quantity;
      state.totalPrice += item.price * (quantity - item.quantity);

      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
