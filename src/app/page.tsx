import Image from "next/image";

import ViewProducts from "@/components/products/ViewProducts";
import ViewOrders from "@/components/orders/ViewOrders";

export default function Home() {
  return (
    <main>
      <ViewProducts />
      <ViewOrders />
    </main>
  );
}
