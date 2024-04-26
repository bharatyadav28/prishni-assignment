import { createSlice } from "@reduxjs/toolkit";

import { productType } from "@/utils/interfaces-types";

interface FilterDetails {
  minPrice: number;
  maxPrice: number;
  nProducts: number;
}

interface ProductsState {
  products: productType[];
  filterDetails: FilterDetails;
  errors: string;
  isLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  filterDetails: {
    minPrice: 0,
    maxPrice: -1,
    nProducts: 0,
  },
  errors: "",
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      state.products = action.payload;
      state.errors = "";
      state.isLoading = false;
    },
    updateFilterDetails: (state, action) => {
      state.filterDetails = action.payload;
    },
    fetchErrors: (state, actions) => {
      state.errors = actions.payload;
      state.isLoading = false;
    },

    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { saveProducts, updateFilterDetails, fetchErrors, setLoading } =
  productsSlice.actions;
export default productsSlice.reducer;
