import { Dispatch } from "redux";

import { saveProducts, setLoading, fetchErrors } from "@/store/productSlice";
import { errorToast } from "@/utils/toasts";

interface paramTypes {
  nProducts: number;
  minPrice: number;
  maxPrice: number;
}
interface errorType {
  msg: string;
  [key: string]: unknown;
}

const getSavedProducts = ({ nProducts, minPrice, maxPrice }: paramTypes) => {
  return async (dispatch: Dispatch) => {
    console.log("fetching..................");
    try {
      dispatch(setLoading());
      const res = await fetch(
        `/api/products?limit=${nProducts}&min_price=${minPrice}&max_price=${maxPrice}`
      );
      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }
      const { data } = await res.json();

      dispatch(saveProducts(data.data));
    } catch (error) {
      let message = "An error occured while fetching saved todos.";
      if (error instanceof Error) {
        message = error.message;
        console.log(error.message);
      }

      errorToast("Products fetching error: " + message);
    }
  };
};

export default getSavedProducts;
