import { Column } from "react-table";

export type SadeListType = {
  type?: string;
  resim?: React.ReactNode;
  sadeKodu?: string;
  modelTuru?: string;
  modelKodu?: string;
  atolye?: string;
  iscilik?: string;
  altinRengi?: string;
  gram?: string;
  ayar?: string;
  hasGrami?: string;
  aciklama?: string;
  girisTarihi?: string;
  total_cost?: number;
  cost_currency?: string;
};

export const SadeListHeaders: Column<
  SadeListType & { islemler?: React.ReactNode }
>[] = [
  {
    Header: "Resim",
    accessor: "resim",
  },
  {
    Header: "Sade Kodu",
    accessor: "sadeKodu",
  },
  {
    Header: "Model Kodu",
    accessor: "modelKodu",
  },
  {
    Header: "Model Türü",
    accessor: "modelTuru",
  },
  {
    Header: "Altın Ayarı",
    accessor: "ayar",
  },
  {
    Header: "Sade Gramı",
    accessor: "gram",
  },
  {
    Header: "Has Gramı",
    accessor: "hasGrami",
  },
  {
    Header: "İşçilik",
    accessor: "iscilik",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];
