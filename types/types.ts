import { Column } from "react-table";

export type ProductType = {
  pk?: number;
  code?: string | null;
  type?: "Diamond" | "Simple" | "ColoredStone";
  properties?: { [key: string]: string | number | undefined };
  image?: string | ArrayBuffer;
  created_at?: string;
  updated_at?: string;
  product_certificate?: { [key: string]: string | number | undefined };
  total_cost?: number;
  buy_date?: string;
  remaining_count?: number;
  menstrual_status?: string;
  product_cost?: { [key: string]: string | number | undefined };
};

export type ProductListType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductType[];
};

export type GetNextOrderType = {
  next_order?: string;
};

export type AuthType = {
  token: string;
  user: {
    email: string;
  };
};

interface IData {
  sec: string;
  kesim: string;
  carat: string;
  berraklik: string;
  renk: string;
  adet: string;
  kullanilanKarat: string;
  maliyet: string;
}

interface ISadeData {
  sec: string;
  maden: string;
  renk: string;
  gram: string;
  has: string;
  model: string;
  maliyet: string;
}

export const ModalSadeHeaders: Column<ISadeData>[] = [
  { Header: "Seç", accessor: "sec" },
  { Header: "Maden", accessor: "maden" },
  { Header: "Renk", accessor: "renk" },
  { Header: "Gram", accessor: "gram" },
  { Header: "Has", accessor: "has" },
  { Header: "Model", accessor: "model" },
  { Header: "Maliyet", accessor: "maliyet" },
];

export const ModalHeaders: Column<IData>[] = [
  { Header: "Seç", accessor: "sec" },
  {
    Header: "Kesim",
    accessor: "kesim",
  },
  {
    Header: "Karat",
    accessor: "carat",
  },
  {
    Header: "Renk",
    accessor: "renk",
  },
  {
    Header: "Adet",
    accessor: "adet",
  },
  {
    Header: "Kullanılan Karat",
    accessor: "kullanilanKarat",
  },
  {
    Header: "Maliyet",
    accessor: "maliyet",
  },
];
