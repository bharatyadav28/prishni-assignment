"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import OrderForm from "@/components/orders/OrderForm";
import { mOrderType } from "./interfaces-types";
import { errorToast } from "@/utils/toasts";
import { itemsType } from "@/utils/interfaces-types";

export const columns: ColumnDef<mOrderType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },

  {
    accessorKey: "createdOn",
    header: "Created On",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "userAddress",
    header: "User Address",
    cell: ({ row }) => {
      const address = row.getValue("userAddress");

      let formattedAddress = "...";
      if (address) {
        formattedAddress = Object.values(address).join(", ");
      }

      return <div className=" font-medium">{formattedAddress}</div>;
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue("items");
      let formattedItems = "...";

      if (Array.isArray(items)) {
        const itemsArr = items.map((item: itemsType) => item.productId);

        formattedItems = itemsArr.join(", ");
      }

      return <div className=" font-medium">{formattedItems}</div>;
    },
  },
];
