export type RenkliTasModelType = {
  renkliTas: string | null;
  kesim: string | null;
  karat: number | null;

  renk: string | null;
  mensei: string | null;
  adet: number | null;
  fiyat: number | null;
};

export type RenkliTasHeaderColumn = {
  header: string;
  accessor: keyof RenkliTasModelType;
  span: number;
};

export const RenkliTasHeaders: RenkliTasHeaderColumn[] = [
  {
    header: "Renli Taş",
    accessor: "renkliTas",
    span: 2,
  },
  {
    header: "Kesim",
    accessor: "kesim",
    span: 2,
  },

  {
    header: "Karat",
    accessor: "karat",
    span: 2,
  },

  {
    header: "Renk",
    accessor: "renk",
    span: 1,
  },
  {
    header: "Mensei",
    accessor: "mensei",
    span: 1,
  },
  {
    header: "Adet",
    accessor: "adet",
    span: 1,
  },
  {
    header: "Fiyat",
    accessor: "fiyat",
    span: 1,
  },
];
