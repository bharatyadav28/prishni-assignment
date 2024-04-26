export type productType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface itemsType {
  productId: string;
  boughtQuantity: number;
  amount: number;
}

export interface orderType {
  orderId: string;
  createdOn: string;
  totalAmount: number;
  userAddress: {
    City: string;
    Country: string;
    ZipCode: string;
  };
  items: itemsType[];
}

export interface mOrderType {
  id: string;
  createdOn: string;
  totalAmount: number;
  userAddress: {
    City: string;
    Country: string;
    ZipCode: string;
  };
  items: itemsType[];
}
