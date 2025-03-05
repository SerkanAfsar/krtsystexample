import React from "react";
import { Column } from "react-table";

import { CustomArrType } from "@/Containers/MucevherDetayContainer";
import { ProductType } from "../types";
import { WorkOrderLogType } from "../WorkOrder.types";

export type MucevherListType = {
  checkBox?: React.ReactNode;
  resim: string | null;
  code: string | null;
  model: string | null;
  cıkısGramı: string | null;
  sade: string | null;
  totalCarat: number | null;
  totalNumberOfStones: number | null;
  totalLaborCost: number | null | string;
  priceTag: number | null | string;
  tedarikci: string | null;
  girisTarihi: string | null;
  ambar: string | null;
};

type MucevherDataTableType = Column<
  MucevherListType & { islemler: React.ReactNode }
> & {
  isCenter?: boolean;
};
export const MucevherListesiDataHeaders: MucevherDataTableType[] = [
  {
    Header: "Seç",
    accessor: "checkBox",
    isCenter: true,
  },
  {
    Header: "Resim",
    accessor: "resim",
    isCenter: true,
  },
  {
    Header: "Mücevher Kodu",
    accessor: "code",
  },
  {
    Header: "Model",
    accessor: "model",
  },
  {
    Header: "Çıkış Gramı",
    accessor: "cıkısGramı",
  },
  {
    Header: "Sade",
    accessor: "sade",
  },
  {
    Header: "Toplam Karat",
    accessor: "totalCarat",
  },
  {
    Header: "Toplam Taş Adet",
    accessor: "totalNumberOfStones",
  },
  {
    Header: "Toplam İşçilik",
    accessor: "totalLaborCost",
  },
  {
    Header: "Etiket Fiyatı",
    accessor: "priceTag",
  },
  {
    Header: "Tedarikçi",
    accessor: "tedarikci",
  },
  {
    Header: "Üretim / Giriş",
    accessor: "girisTarihi",
  },
  {
    Header: "Ambar",
    accessor: "ambar",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export type MucevherDetayType = {
  work_order_logs: WorkOrderLogType[];
  inside_products: ProductType[] | CustomArrType;
  product_code: string;
  product?: ProductType | null;
};

export type AddMucevherExternalType = {
  code: string;
  model: string;
  total_carat: number;
  simple: string;
  reference_no: string;
  style_no: string;
  labor_cost: number;
  purchase_price: number;
  price_tag: number;
  entry_date: string;
  sale_date: string;
  description: string;
  image: string;
  products: {
    sade: { [key: string]: string | number | null }[];
    pirlanta: { [key: string]: string | number | null }[];
    renkliTas: { [key: string]: string | number | null }[];
  };
  store_id: number;
  supplier_id?: number;
};

export type MucevherSadeRegisterType = {
  modelTuru: string;
  gram: number;
  ayar: string;
  renk: string;
  hasGrami: number;
  fiyat: number;
};

export type MucevherPirlantaRegisterType = {
  kesim: string;
  carat: number;
  berraklik: string;
  renk: number;
  mensei: string;
  adet: number;
  fiyat: number;
};

export type RenkliTasRegisterType = {
  renkliTas: string;
  kesim: string;
  carat: number;
  berraklik: string;
  renk: number;
  mensei: string;
  adet: number;
  fiyat: number;
};
