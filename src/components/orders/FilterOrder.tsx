import React from "react";

import { Input } from "@/components/ui/input";
import OrderForm from "./OrderForm";

interface propsTypes {
  nOrders: number;
  onNOrdersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterOrder: React.FC<propsTypes> = ({ nOrders, onNOrdersChange }) => {
  return (
    <div className="flex w-full justify-center gap-3 mb-5">
      <Input
        type="string"
        value={nOrders === 0 ? "" : nOrders}
        onChange={onNOrdersChange}
        id="nProducts"
        placeholder="N Orders"
        className="w-24 italic font-medium"
      />

      <OrderForm pid={null} isUpdate={false} />
    </div>
  );
};

export default FilterOrder;
