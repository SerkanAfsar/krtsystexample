import { Column } from "react-table";

export type PirlantaListType = {
  code?: string;
  kesim?: string;
  carat?: string;
  sertifika?: string;
  renk?: string;
  renk2?: string;
  berraklik?: string;
  berraklik2?: string;
  cut?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  sertifikaTarihi?: string;
  proposion?: string;
  min?: string;
  max?: string;
  height?: string;
  sertifikaNo?: string;
  paraportFiyatı?: string;
  ppc?: number;
  total_coast?: string;
};

export const PirlantaListHeaders: Column<
  PirlantaListType & { islemler?: React.ReactNode }
>[] = [
  {
    Header: "Pırlanta Kodu",
    accessor: "code",
  },
  {
    Header: "-",
    columns: [
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
        Header: "Renk2",
        accessor: "renk2",
      },
    ],
  },
  {
    Header: "BERRAKLIK",
    columns: [
      {
        Header: "Berraklık",
        accessor: "berraklik",
      },
      {
        Header: "Berraklık2",
        accessor: "berraklik2",
      },
    ],
  },
  // {
  //   Header: "Cut",
  //   accessor: "cut",
  // },
  // {
  //   Header: "Polish",
  //   accessor: "polish",
  // },
  // {
  //   Header: "Symmetry",
  //   accessor: "symmetry",
  // },
  // {
  //   Header: "Floruence",
  //   accessor: "fluorescence",
  // },
  {
    Header: "FINISH",
    columns: [
      {
        Header: "Proportion",
        accessor: "proposion",
      },
      {
        Header: "Polish",
        accessor: "polish",
      },
      {
        Header: "Symmetry",
        accessor: "symmetry",
      },
    ],
  },
  {
    Header: "FLUORESCENCE",
    columns: [
      {
        Header: "Fluorescence",
        accessor: "fluorescence",
      },
    ],
  },

  {
    Header: "MEASURMENTS",
    columns: [
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
    ],
  },

  {
    Header: "SERTİFİKA",
    columns: [
      {
        Header: "Sertifika No",
        accessor: "sertifikaNo",
      },
      {
        Header: "Sertifika Tarihi",
        accessor: "sertifikaTarihi",
      },
    ],
  },
  {
    Header: "FİYAT",
    columns: [
      // {
      //   Header: "Sertifika No",
      //   accessor: "sertifikaNo",
      // },
      // {
      //   Header: "Sertifika Tarihi",
      //   accessor: "sertifika",
      // },
      {
        Header: "Rapaport",
        accessor: "paraportFiyatı",
      },
      {
        Header: "PPC",
        accessor: "ppc",
      },
      {
        Header: "Toplam",
        accessor: "total_coast",
      },
    ],
  },

  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];
