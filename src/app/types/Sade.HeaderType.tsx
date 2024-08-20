import { SadeModelTurleri } from "@/data/Sade.data";
import { CustomOptionType } from "../../../types/inputTypes";

export type SadeModelType = {
  modelTuru: string | null;
  gram: number | null;
  ayar: number | null;
  renk: string | null;
  hasGram: number | null;
  fiyat: number | null;
};

export type SadeHeaderColumn = {
  header: string;
  accessor: keyof SadeModelType;
  type: "select" | "number";
  span: number;
  selectOptions?: CustomOptionType[];
};

export const SadeHeaders: SadeHeaderColumn[] = [
  {
    header: "Model Türü",
    accessor: "modelTuru",
    type: "select",
    selectOptions: SadeModelTurleri,
    span: 2,
  },
  {
    header: "Gram",
    accessor: "gram",
    type: "number",
    span: 1,
  },
  {
    header: "Ayar",
    accessor: "ayar",
    type: "number",
    span: 1,
  },
  {
    header: "Renk",
    accessor: "renk",
    type: "select",
    span: 1,
  },
  {
    header: "Has Gramı",
    accessor: "hasGram",
    type: "number",
    span: 1,
  },
  {
    header: "Fiyat",
    accessor: "fiyat",
    type: "number",
    span: 2,
  },
];
