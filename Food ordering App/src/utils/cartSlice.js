import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isNew: false,
    addItemsFromNewRestaurant: false,
    restaurantDetails: {},
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
    isNewFlag: (state, action) => {
      console.log("in action", action, action.payload);
      state.isNew = action.payload;
    },
    addItemsFromNewRestaurantFlag: (state, action) => {
      state.addItemsFromNewRestaurant = action.payload;
    },
    addRestaurantDetails: (state, action) => {
      state.restaurantDetails = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  clearCart,
  isNewFlag,
  addItemsFromNewRestaurantFlag,
  addRestaurantDetails,
} = cartSlice.actions;
