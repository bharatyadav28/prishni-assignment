import { useSelector } from "react-redux";
import React from "react";
import { Input } from "@/components/ui/input";

import { RootState } from "@/store";
import Combobox from "../ui/Combobox";
import { productType } from "@/utils/interfaces-types";

interface propsTypes {
  numberOfProducts: number;
  setNOfProducts: React.Dispatch<number>;
  productId: string;
  setProductId: React.Dispatch<string>;
}

const SelectProduct: React.FC<propsTypes> = ({
  numberOfProducts,
  setNOfProducts,
  productId,
  setProductId,
}) => {
  const { products } = useSelector((state: RootState) => state.products);

  const selectedData = products.map((product: productType) => {
    return { value: product.id, label: product.name };
  });

  return (
    <div className="flex">
      <div className="mr-2">
        <Combobox
          frameworks={selectedData}
          productId={productId}
          setProductId={setProductId}
        />
      </div>
      <div className="">
        <Input
          value={numberOfProducts === 0 ? "" : numberOfProducts}
          onChange={(e) => {
            setNOfProducts(Number(e.target.value));
          }}
          placeholder="Quantitiy"
        />
      </div>
    </div>
  );
};

export default SelectProduct;
