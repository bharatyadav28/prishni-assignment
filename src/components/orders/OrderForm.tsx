import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FolderInput } from "lucide-react";
import { RefreshCw } from "lucide-react";

import { RootState } from "@/store";
import useHttp from "@/hooks/use-http";
import { productType } from "@/utils/interfaces-types";
import getSavedOrders from "@/store/orderAction";
import { useAppDispatch } from "@/store";
import { errorToast } from "@/utils/toasts";
import { itemsType } from "@/utils/interfaces-types";
import SelectProduct from "./SelectProduct";
import { orderType } from "@/utils/interfaces-types";

interface propsType {
  pid: string | null;
  isUpdate: boolean;
}
interface addressType {
  City: string;
  Country: string;
  ZipCode: string;
}

export default function OrderForm({ pid, isUpdate }: propsType) {
  const { orders, filterDetails } = useSelector(
    (state: RootState) => state.orders
  );
  const dispatch = useAppDispatch();

  const { dbConnect, isLoading, error, setError } = useHttp();
  const [createdOn, setCreatedOn] = useState("");
  const [userAddress, setUserAddress] = useState<addressType>({
    City: "",
    Country: "",
    ZipCode: "",
  });

  let items = [];
  const [numberOfProducts, setNOfProducts] = useState(0);
  const [productId, setProductId] = useState("");

  const [open, setOpen] = useState(false);
  console.log("oid", pid);

  useEffect(() => {
    console.log("sddsd", isUpdate, pid, orders);

    if (isUpdate && pid && orders) {
      console.log("dsd");
      const order: orderType | undefined = (orders as orderType[]).find(
        (item: orderType) => {
          console.log("useAddress", item.orderId, String(pid));

          return String(item.orderId) === String(pid);
        }
      );
      if (order) {
        setCreatedOn(order?.createdOn);
        setUserAddress(order.userAddress);

        setProductId(order.items[0].productId);
        setNOfProducts(order.items[0].boughtQuantity);
      }
    }
  }, [isUpdate, pid, orders]);

  if (error) {
    let message = isUpdate ? "Updation error:" : "Insertion Error: ";
    errorToast(message + error);
    setError("");
  }

  const postRequest = (data: any) => {
    const { nOrders } = filterDetails;
    dispatch(getSavedOrders({ nOrders }));
    setCreatedOn("");
    setUserAddress({
      City: "",
      Country: "",
      ZipCode: "",
    });
    setNOfProducts(0);
    setProductId("");
  };

  const handleFormSubmit = () => {
    let url = `/api/orders`;
    if (isUpdate) {
      url += `?id=${pid}`;
    }
    items.push({ productId, boughtQuantity: numberOfProducts });

    let payload = { id: "", userAddress, items, createdOn: "" };
    if (isUpdate && pid && createdOn) {
      payload.id = pid;
      payload.createdOn = createdOn;
    }

    dbConnect(
      {
        path: url,
        method: isUpdate ? "PUT" : "POST",
        payload,
      },
      postRequest
    );
    setOpen(false);
  };

  let isFormValid =
    (isUpdate ? createdOn : true) &&
    userAddress.City &&
    userAddress.Country &&
    userAddress.ZipCode &&
    productId &&
    numberOfProducts;

  console.log(
    "vgdv",
    isFormValid,
    userAddress.City,
    userAddress.Country,
    userAddress.ZipCode,
    items.length
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isUpdate ? (
            <div className="flex">
              update
              <RefreshCw size="15px" className="mt-[3px] ml-1" />
            </div>
          ) : (
            <div className="flex">
              <FolderInput className="mr-2 h-4 w-4 mt-[1px]" /> Add new Order
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Edit Order" : "Add new order"}</DialogTitle>
          <DialogDescription>
            {isUpdate &&
              `Make changes to order here. Click save when you done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isUpdate && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="created-on" className="text-right">
                Created On
              </Label>
              <Input
                id="on"
                value={createdOn}
                onChange={(e) => {
                  setCreatedOn(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Address
            </Label>
            <div>
              <Input
                id="city"
                value={userAddress.City}
                placeholder="City"
                onChange={(e) =>
                  setUserAddress({ ...userAddress, City: e.target.value })
                }
                className="col-span-3 mb-2"
              />
              <Input
                id="country"
                value={userAddress.Country}
                placeholder="Country"
                onChange={(e) =>
                  setUserAddress({ ...userAddress, Country: e.target.value })
                }
                className="col-span-3 mb-2"
              />
              <Input
                id="zip-code"
                value={userAddress.ZipCode}
                placeholder="Zip code"
                onChange={(e) =>
                  setUserAddress({ ...userAddress, ZipCode: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <div>
            <SelectProduct
              numberOfProducts={numberOfProducts}
              setNOfProducts={setNOfProducts}
              productId={productId}
              setProductId={setProductId}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!isFormValid}
            onClick={handleFormSubmit}
            className="disabled:cursor-not-allowed"
          >
            {isUpdate ? "Save changes" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog.Root>
  );
}
