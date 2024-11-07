import { Column } from "react-table";
import { ProductType } from "../types";

export type SupplierProductHeaderType = Omit<
  ProductType,
  "product_cost" | "image"
> & {
  buy_date: string | null;
  sales_price: React.ReactNode | null;
  product_cost: string | null;
  image: React.ReactNode | null;
  remaining_count: number | null;
};

export const SupplierProductDataTableHeaders: Column<SupplierProductHeaderType>[] =
  [
    {
      Header: "Resim",
      accessor: "image",
    },
    {
      Header: "Ürün Kodu",
      accessor: "code",
    },
    {
      Header: "Alış Tarihi",
      accessor: "buy_date",
    },
    // {
    //   Header: "Adet",
    //   accessor: "quantity",
    // },
    {
      Header: "Karat",
      accessor: "remaining_count",
    },
    {
      Header: "Toplam Satış Fiyatı",
      accessor: "sales_price",
    },
  ];
