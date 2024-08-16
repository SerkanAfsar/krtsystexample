import { Column } from "react-table";

export type RenkliTasListType = {
  code: string;
  menstrual_status?: string;
  renkliTas?: string;
  carat?: number;
  renk?: string;
  kesim?: string;
  mensei?: string;
  treatment?: string;
  aciklama?: string;
  fromsingleormixed?: string;
  pricePerCarat?: number;
  frommixedItem?: string;
  sertifikaDosyasi?: File;
  total_cost?: number;
};

export const RenklitasListHeaders: Column<
  RenkliTasListType & { islemler?: React.ReactNode }
>[] = [
  {
    Header: "Renkli Taş Kodu",
    accessor: "code",
  },
  {
    Header: "Renkli Taş",
    accessor: "renkliTas",
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
    Header: "Kesim",
    accessor: "kesim",
  },
  {
    Header: "Menşei",
    accessor: "mensei",
  },
  {
    Header: "Treatment",
    accessor: "treatment",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];
