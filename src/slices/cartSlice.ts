import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartCourse {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
}

interface CartState {
  items: CartCourse[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add a course to the cart
    addToCart: (state, action: PayloadAction<CartCourse>) => {
      const course = action.payload;
      // Client-Side Validation: Only add if the course ID is not already present
      if (!state.items.find(item => item.id === course.id)) {
        state.items.push(course); 
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const courseId = action.payload;
      state.items = state.items.filter(item => item.id !== courseId);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Selectors to retrieve data from the state
// Returns the array of cart items
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

// Calculates and returns the total price, formatted to two decimal places
export const selectCartTotal = (state: { cart: CartState }) => {
  return state.cart.items
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);
};

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;