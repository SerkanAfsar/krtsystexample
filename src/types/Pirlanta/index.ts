import { Column } from "react-table";

export type PirlantaListType = {
  code?: string;
  kesim?: string;
  carat?: string;
  sertifika?: string;
  renk?: string;
  berraklik?: string;
  cut?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  min?: string;
  max?: string;
  height?: string;
  sertifikaNo?: string;
  paraportFiyatı?: string;
};

export const PirlantaListHeaders: Column<
  PirlantaListType & { islemler?: React.ReactNode }
>[] = [
  {
    Header: "Pırlanta Kodu",
    accessor: "code",
  },
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
    Header: "Berraklık",
    accessor: "berraklik",
  },
  {
    Header: "Cut",
    accessor: "cut",
  },
  {
    Header: "Polish",
    accessor: "polish",
  },
  {
    Header: "Symmetry",
    accessor: "symmetry",
  },
  {
    Header: "Floruence",
    accessor: "fluorescence",
  },
  {
    Header: "Min",
    accessor: "min",
  },
  {
    Header: "Max",
    accessor: "max",
  },
  {
    Header: "Height",
    accessor: "height",
  },
  {
    Header: "Sertifika",
    accessor: "sertifika",
  },
  {
    Header: "Rapaport",
    accessor: "paraportFiyatı",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];
