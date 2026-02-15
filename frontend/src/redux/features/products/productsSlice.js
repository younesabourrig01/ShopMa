import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    filter: "all",
    sortBy: "name",
  },
};

// fetch products (async thunk )
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }

      const res = await response.json();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// slice
export const productsSlice = createSlice({
  name: "product",
  initialState,

  //   reducers
  reducers: {
    setFilter: (state, action) => {
      state.filters.filter = action.payload;
    },

    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },

    resetFilters: (state) => {
      state.filters = {
        filter: "all",
        sortBy: "name",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// actions
export const { setFilter, setSortBy, resetFilters } = productsSlice.actions;

// reducer
export default productsSlice.reducer;
