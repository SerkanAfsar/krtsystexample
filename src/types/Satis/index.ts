import { Column } from "react-table";
import { ProductType } from "../../../types/types";

export type CustomerSaledProductsHeaderType = Omit<
  ProductType,
  "product_cost" | "image"
> & {
  saleDate: string | null;
  sales_price: React.ReactNode | null;
  product_cost: string | null;
  image: React.ReactNode | null;
};

export const CustomerSaledProductsHeader: Column<CustomerSaledProductsHeaderType>[] =
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
      Header: "Satış Tarihi",
      accessor: "saleDate",
    },
    {
      Header: "Maliyeti",
      accessor: "product_cost",
    },
    {
      Header: "Adet",
      accessor: "quantity",
    },
    {
      Header: "Karat",
      accessor: "remaining_count",
    },
    {
      Header: "Toplam Satış Fiyatı",
      accessor: "sales_price",
    },
  ];
