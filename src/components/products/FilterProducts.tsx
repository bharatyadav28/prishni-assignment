import React from "react";

import { Input } from "@/components/ui/input";
import ProductForm from "@/components/products/ProductForm";

interface propsTypes {
  minPrice: number;
  onMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxPrice: number;
  onMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nProducts: number;
  onNProductsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterProducts: React.FC<propsTypes> = ({
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  nProducts,
  onNProductsChange,
}) => {
  return (
    <div className="flex w-full justify-center items-center gap-3 mb-5">
      <Input
        type="string"
        value={minPrice === 0 ? "" : minPrice}
        onChange={onMinPriceChange}
        id="min-price"
        placeholder="min-price"
        className=" w-24 italic font-semibold"
      />
      <Input
        type="string"
        value={maxPrice === -1 ? "" : maxPrice}
        onChange={onMaxPriceChange}
        id="max-price"
        placeholder="max-price"
        className="w-24 italic font-semibold"
      />
      <Input
        type="string"
        value={nProducts === 0 ? "" : nProducts}
        onChange={onNProductsChange}
        id="nProducts"
        placeholder="N Products"
        className="w-28 italic font-semibold"
      />

      <ProductForm pid={null} isUpdate={false} />
    </div>
  );
};

export default FilterProducts;
