export type PirlantaModelType = {
  kesim: string | null;
  carat: number | null;
  berraklik: string | null;
  renk: string | null;
  mensei: string | null;
  adet: number | null;
  fiyat: number | null;
};

export type PirlantaHeaderColumn = {
  header: string;
  accessor: keyof PirlantaModelType;
  span: number;
};

export const PirlantaHeaders: PirlantaHeaderColumn[] = [
  {
    header: "Kesim",
    accessor: "kesim",
    span: 2,
  },
  {
    header: "Karat",
    accessor: "carat",
    span: 1,
  },
  {
    header: "Berraklık",
    accessor: "berraklik",
    span: 2,
  },
  {
    header: "Renk",
    accessor: "renk",
    span: 1,
  },
  {
    header: "Menşei",
    accessor: "mensei",
    span: 2,
  },
  {
    header: "Adet",
    accessor: "adet",
    span: 1,
  },
  {
    header: "Fiyat",
    accessor: "fiyat",
    span: 2,
  },
];
