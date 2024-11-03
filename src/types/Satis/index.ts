import { Column } from "react-table";
import { ProductType } from "../types";

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

export type SaleProductType = {
  product_id: number;
  used_carat: number;
  sales_price: number;
  total_cost?: number;
  type?: string;
  code?: string;
};
export type SalePayment = {
  payment_type: "Nakit" | "Kredi Kartı";
  payment_price: number;
};
export type SaleType = {
  products: SaleProductType[];
  customer_id: number;
  payments: SalePayment[];
  total_payment: number;
  total_nonpayed: number;
};

export type SaleTypeFormResult = {
  products: SaleProductType[];
  customer_id: number;
  payment_details: { [key: string]: number };
  total_paid_amount: number;
  total_remaining_amount: number;
  total: number;
};

export type SaleResponseType = Omit<
  SaleTypeFormResult,
  "customer" | "customer_id"
> & {
  customer: {
    name: string;
  };
};

export type SatisListesiHeaderType = {
  musteri: string;
  satilanUrunler: string | null;
  odenen: string;
  kalan: string;
  toplamTutar: string;
  odemeYontemi: string;
};

export const SatisListesiHeaderColumns: Column<SatisListesiHeaderType>[] = [
  {
    Header: "Müşteri",
    accessor: "musteri",
  },
  {
    Header: "Satılan Ürünler",
    accessor: "satilanUrunler",
  },
  {
    Header: "Ödenen",
    accessor: "odenen",
  },
  {
    Header: "Kalan",
    accessor: "kalan",
  },
  {
    Header: "Toplam Tutar",
    accessor: "toplamTutar",
  },
  {
    Header: "Ödeme Yöntemi",
    accessor: "odemeYontemi",
  },
];
