"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { DataTable } from "../table/DataTable";
import { columns } from "@/utils/productColumns";
import { productType } from "@/utils/interfaces-types";
import FilterProducts from "@/components/products/FilterProducts";
import { updateFilterDetails } from "@/store/productSlice";
import { RootState } from "@/store";
import getSavedProducts from "@/store/productAction";
import { useAppDispatch } from "@/store";
import { errorToast } from "@/utils/toasts";
import ProductForm from "./ProductForm";
import useHttp from "@/hooks/use-http";

export type dataType = productType[] | [];
export type incomingDataType = { data: dataType };

const ViewProducts = () => {
  const dispatch = useAppDispatch();
  const { products, filterDetails, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  console.log("isLoading:", isLoading);

  const { dbConnect, isLoading: isDeleting, error, setError } = useHttp();

  const { minPrice, maxPrice, nProducts } = filterDetails;

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilterDetails({ ...filterDetails, minPrice: event.target.value })
    );
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilterDetails({ ...filterDetails, maxPrice: event.target.value })
    );
  };
  const handleNProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilterDetails({ ...filterDetails, nProducts: event.target.value })
    );
  };

  if (error) {
    errorToast("Deletion error:" + error);
    setError("");
  }
  const postRequest = (data: any) => {
    const { minPrice, maxPrice, nProducts } = filterDetails;
    dispatch(getSavedProducts({ minPrice, maxPrice, nProducts }));
  };
  const handleProductDelete = async (id: string) => {
    dbConnect(
      {
        path: `/api/products?id=${id}`,
        method: "DELETE",
        payload: "",
      },
      postRequest
    );
  };

  useEffect(() => {
    const { minPrice, maxPrice, nProducts } = filterDetails;

    const interval = setTimeout(() => {
      return dispatch(getSavedProducts({ minPrice, maxPrice, nProducts }));
    }, 500);
    return () => clearInterval(interval);
  }, [filterDetails, dispatch]);

  return (
    <div className="mx-96 mt-16 mb-28">
      <div className="text-center  font-bold text-4xl mb-10">
        <span className="border-b-2 p-1 text-[#f97316]">Products</span>
      </div>
      <FilterProducts
        minPrice={minPrice}
        onMinPriceChange={handleMinPriceChange}
        maxPrice={maxPrice}
        onMaxPriceChange={handleMaxPriceChange}
        nProducts={nProducts}
        onNProductsChange={handleNProductChange}
      />
      {/* {!isLoading && ( */}
      <DataTable
        columns={columns}
        data={products}
        handleItemDelete={handleProductDelete}
        InputForm={ProductForm}
        isLoading={isLoading}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ViewProducts;
