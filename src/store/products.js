import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  list: undefined,
  status: null,
};

export const productsStore = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setProducts: (state, { payload }) => {
      state.list = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setStatus } = productsStore.actions;

export default productsStore.reducer;
