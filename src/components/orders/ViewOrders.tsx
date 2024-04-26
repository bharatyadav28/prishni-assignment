"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import getSavedOrders from "@/store/orderAction";
import { updateFilterDetails } from "@/store/orderSlice";
import { useAppDispatch } from "@/store";
import { DataTable } from "../table/DataTable";
import { columns } from "@/utils/orderColumns";
import FilterOrder from "@/components/orders/FilterOrder";
import { errorToast } from "@/utils/toasts";
import OrderForm from "./OrderForm";
import { orderType } from "@/utils/interfaces-types";
import useHttp from "@/hooks/use-http";

const ViewOrders = () => {
  const dispatch = useAppDispatch();
  const { dbConnect, isLoading: isDeleting, error, setError } = useHttp();

  const { orders, filterDetails, isLoading } = useSelector(
    (state: RootState) => {
      return state.orders;
    }
  );

  const { nOrders } = filterDetails;

  const handleNOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilterDetails({ ...filterDetails, nOrders: event.target.value })
    );
  };

  useEffect(() => {
    const { nOrders } = filterDetails;

    const interval = setTimeout(() => {
      return dispatch(getSavedOrders({ nOrders }));
    }, 500);
    return () => clearInterval(interval);
  }, [filterDetails, dispatch]);

  if (error) {
    errorToast("Deletion error:" + error);
    setError("");
  }

  const postRequest = (data: any) => {
    const { nOrders } = filterDetails;
    dispatch(getSavedOrders({ nOrders }));
  };

  const handleOrderDelete = async (id: string) => {
    dbConnect(
      {
        path: `/api/orders?id=${id}`,
        method: "DELETE",
        payload: "",
      },
      postRequest
    );
  };
  const modifiedOrders = orders.map((order: orderType) => {
    const { orderId, ...rest } = order;

    // Create a new object with 'id' and other properties from the original order
    return { id: orderId, ...rest };
  });

  return (
    <div className="mx-40 mt-16 mb-24">
      <div className="text-center  font-bold text-4xl mb-10">
        <span className="border-b-2  p-1 text-[#f97316]">Orders</span>
      </div>
      <FilterOrder nOrders={nOrders} onNOrdersChange={handleNOrderChange} />
      <DataTable
        columns={columns}
        data={modifiedOrders}
        handleItemDelete={handleOrderDelete}
        InputForm={OrderForm}
        isLoading={isLoading}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ViewOrders;
