import React from "react";
import { Column } from "react-table";
import { WorkOrderLogType } from "../../../types/WorkOrder.types";
import { ProductType } from "../../../types/types";
import { CustomArrType } from "@/Containers/MucevherDetayContainer";

export type MucevherListType = {
  resim: string | null;
  mucevherKodu: string | null;
  model: string | null;
  sade: string | null;
  toplamKarat: number | null;
  toplamTasAdet: number | null;
  toplamIscilik: number | null | string;
  etiketFiyati: number | null | string;
  tedarikci: string | null;
  girisTarihi: string | null;
  ambar: string | null;
};

export const MucevherListesiDataHeaders: Column<
  MucevherListType & { islemler: React.ReactNode }
>[] = [
  {
    Header: "Resim",
    accessor: "resim",
  },
  {
    Header: "Mücevher Kodu",
    accessor: "mucevherKodu",
  },
  {
    Header: "Model",
    accessor: "model",
  },
  {
    Header: "Sade",
    accessor: "sade",
  },
  {
    Header: "Toplam Karat",
    accessor: "toplamKarat",
  },
  {
    Header: "Toplam Taş Adet",
    accessor: "toplamTasAdet",
  },
  {
    Header: "Toplam İşçilik",
    accessor: "toplamIscilik",
  },
  {
    Header: "Etiket Fiyatı",
    accessor: "etiketFiyati",
  },
  {
    Header: "Tedarikçi",
    accessor: "tedarikci",
  },
  {
    Header: "Üretim / Giriş Tarihi",
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
  price_tag: number | string | null;
  entry_date: string;
  sale_date: string;
  description: string;
  image: string;
  products: {
    sade: { [key: string]: string | number }[];
    pirlanta: { [key: string]: string | number }[];
    renkliTas: { [key: string]: string | number }[];
  };
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
