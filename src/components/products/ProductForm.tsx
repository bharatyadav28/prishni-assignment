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
import getSavedProducts from "@/store/productAction";
import { useAppDispatch } from "@/store";
import { errorToast } from "@/utils/toasts";

interface propsType {
  pid: string | null;
  isUpdate: boolean;
}

export default function ProductForm({ pid, isUpdate }: propsType) {
  const { products, filterDetails } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  const { dbConnect, isLoading, error, setError } = useHttp();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isUpdate && pid && products) {
      const product: productType | undefined = (products as productType[]).find(
        (item: productType) => {
          return String(item.id) === String(pid);
        }
      );
      if (product) {
        setName(product?.name);
        setPrice(product.price);
        setQuantity(product.quantity);
      }
    }
  }, [isUpdate, pid, products]);

  if (error) {
    let message = isUpdate ? "Updation error:" : "Insertion Error: ";
    errorToast(message + error);
    setError("");
  }

  const postRequest = (data: any) => {
    const { minPrice, maxPrice, nProducts } = filterDetails;
    dispatch(getSavedProducts({ minPrice, maxPrice, nProducts }));
    setName("");
    setPrice(0);
    setQuantity(0);
  };

  const handleFormSubmit = () => {
    let url = `/api/products`;
    if (isUpdate) {
      url += `?id=${pid}`;
    }

    let payload = { id: "", name, price, quantity };
    if (isUpdate && pid) {
      payload.id = pid;
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

  const formValid = name.length > 0 && price && quantity > 0;

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
              <FolderInput className="mr-2 h-4 w-4 mt-[1px]" /> Add new product
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Edit product" : "Add new product"}
          </DialogTitle>
          <DialogDescription>
            {isUpdate &&
              `Make changes to Product here. Click save when you done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input
              id="username"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Quantity
            </Label>
            <Input
              id="username"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleFormSubmit}
            disabled={!formValid}
            className="disabled:cursor-not-allowed"
          >
            {isUpdate ? "Save changes" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog.Root>
  );
}
