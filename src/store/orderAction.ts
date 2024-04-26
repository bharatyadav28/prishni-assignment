import { Dispatch } from "redux";

import { saveOrders, setLoading, fetchErrors } from "@/store/orderSlice";
import { errorToast } from "@/utils/toasts";

interface paramTypes {
  nOrders: number;
}
interface errorType {
  msg: string;
  [key: string]: unknown;
}

const getSavedOrders = ({ nOrders }: paramTypes) => {
  return async (dispatch: Dispatch) => {
    console.log("fetching..................");
    try {
      dispatch(setLoading());
      const res = await fetch(`/api/orders?limit=${nOrders}`);
      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }
      const { data } = await res.json();
      console.log("data:", data);

      dispatch(saveOrders(data));
    } catch (error) {
      let message = "An error occured while fetching saved todos.";
      if (error instanceof Error) {
        message = error.message;
        console.log(error.message);
      }

      errorToast("Orders fetching error: " + message);
    }
  };
};

export default getSavedOrders;
