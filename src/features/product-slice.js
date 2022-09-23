import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllStatus",
  async (thunkAPI) => {
    const result = await fetch("https://fakestoreapi.com/products");

    return await result.json();
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
