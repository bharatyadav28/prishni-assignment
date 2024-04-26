import { createSlice } from "@reduxjs/toolkit";

import { orderType } from "@/utils/interfaces-types";

interface FilterDetails {
  nOrders: number;
}

interface OrdersState {
  orders: orderType[];
  filterDetails: FilterDetails;
  errors: string;
  isLoading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  filterDetails: {
    nOrders: 0,
  },
  errors: "",
  isLoading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    saveOrders: (state, action) => {
      state.orders = action.payload;
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

export const { saveOrders, updateFilterDetails, fetchErrors, setLoading } =
  ordersSlice.actions;
export default ordersSlice.reducer;
