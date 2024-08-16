import React from "react";
import { Column } from "react-table";

export type MucevherListType = {
  resim: string | null;
  mucevherKodu: string | null;
  model: string | null;
  sade: string | null;
  toplamKarat: number | null;
  toplamTasAdet: number | null;
  toplamIscilik: number | null;
  etiketFiyati: number | null;
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
