import React from "react";
import { Column } from "react-table";

export type CurrencyType = {
  isim?: string;
  alis?: string;
  satis?: string;
  degisim?: string;
  zaman?: string;
};

export type DovizKurlariType = Record<string, CurrencyType>;

export type ProductType = {
  pk?: number;
  code?: string | null;
  type?: "Diamond" | "Simple" | "ColoredStone" | "Gem";
  properties?: { [key: string]: string | number | undefined };
  image?: string | ArrayBuffer;
  created_at?: string;
  updated_at?: string;
  product_certificate?: { [key: string]: string | number | undefined };
  total_cost?: number;
  buy_date?: string;
  remaining_count?: number;
  menstrual_status?: string;
  product_cost?: { [key: string]: string | number | undefined };
  quantity?: number | null;
  supplier?: TedarikciType;
  store_id?: number;
  store?: any;
  labor_cost?: number;
  purchase_price?: number;
  price_tag?: number;
  product_inside?: [{ [key: string]: string | number }];
};

export type CustomerPurchatedProducts = {
  id: number;
  name: string;
  purchased_products: ProductType[];
};

export type ProductListType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductType[];
};

export type CustomDataListType<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type GetNextOrderType = {
  next_order?: string;
};

export type AuthType = {
  token: string;
  user: {
    email: string;
  };
  user_groups: UserGroupsType[];
};

export type AuthMeType = {
  id: number;
  username: string;
  email: string;
  groups: any[];
};

export type UserGroupsType = {
  id: number;
  name: string;
};

interface IData {
  sec: string;
  kesim: string;
  carat: string;
  berraklik: string;
  renk: string;
  adet: string;
  kullanilanKarat: string;
  maliyet: string;
  code?: string;
}

interface ISadeData {
  code?: string;
  resim?: React.ReactNode;
  sec: string;
  maden: string;
  renk: string;
  gram: string;
  has: string;
  model: string;
  maliyet: string;
}

export const SadeModalHeaders: (Column<ISadeData> & { isHidden?: boolean })[] =
  [
    { Header: "Seç", accessor: "sec" },
    { Header: "Resim", accessor: "resim" },
    { Header: "Ürün Kodu", accessor: "code" },
    { Header: "Renk", accessor: "renk" },
    { Header: "Gram", accessor: "gram" },
    { Header: "Has", accessor: "has" },
    { Header: "Model", accessor: "model" },
    { Header: "Maliyet", accessor: "maliyet" },
  ];

export const RenkliTasModalHeaders: (Column<IData & { name?: string }> & {
  isHidden?: boolean;
})[] = [
  { Header: "Seç", accessor: "sec" },
  {
    Header: "Ürün Kodu",
    accessor: "code",
  },
  {
    Header: "Renkli Taş",
    accessor: "name",
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
    Header: "Adet",
    accessor: "adet",
  },
  {
    Header: "Kullanılan Karat",
    accessor: "kullanilanKarat",
    isHidden: true,
  },
  {
    Header: "Maliyet",
    accessor: "maliyet",
  },
];

export const PirlantaModalHeaders: (Column<IData> & { isHidden?: boolean })[] =
  [
    { Header: "Seç", accessor: "sec" },
    {
      Header: "Ürün Kodu",
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
      Header: "Adet",
      accessor: "adet",
    },
    {
      Header: "Kullanılan Karat",
      accessor: "kullanilanKarat",
      isHidden: true,
    },
    {
      Header: "Maliyet",
      accessor: "maliyet",
    },
  ];

export type TedarikciType = {
  id?: number;
  e_mail?: string;
  authorized_e_mail?: string;
  code?: string;
  type?: string;
  name?: string;
  phone?: string;
  address?: string;
  area?: string;
  currenc_code?: string;
  tax_office?: string;
  tax_number?: string;
  bank?: string;
  bank_address?: string;
  iban?: string;
  swift_code?: string;
  account_no?: string;
  authorized_name?: string;
  authorized_phone?: string;
  post_code?: string;
  balance_upper_limit?: string;
};

export type MusteriType = {
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  e_mail?: string;
  area?: string;
  country_code?: string;
  invoice_address?: string;
  shipping_address?: string;
  company_type?: string;
  company_foundation_date?: Date;
  tax_number?: string;
  bank?: string;
  chamber_of_commerce?: string;
  company_sector?: string;
  sector_year?: string;
  bank_account_info?: string;
  authorized_name?: string;
  authorized_phone?: string;
  authorized_e_mail?: string;
  posta_kodu?: string;
  banka_adi?: string;
  banka_adresi?: string;
  hesap_no?: string;
  iban?: string;
  swift_code?: string;
};

interface ISatisUrunType {
  sec: string;
  code: string;
  price: string;
  type: string;
  total_cost: string;
  totalCarat: number;
  kullanilanKarat: number;
  maliyet: string;
}

export const SatisModalHeader: (Column<ISatisUrunType> & {
  isHidden?: boolean;
})[] = [
  { Header: "Seç", accessor: "sec" },
  {
    Header: "Ürün Kodu",
    accessor: "code",
  },
  {
    Header: "Satış Fiyatı",
    accessor: "price",
  },
  {
    Header: "Tipi",
    accessor: "type",
  },
  {
    Header: "Toplam Fiyat",
    accessor: "total_cost",
  },
  // {
  //   Header: "Toplam Karat",
  //   accessor: "totalCarat",
  // },

  // {
  //   Header: "Kullanılan Karat",
  //   accessor: "kullanilanKarat",
  //   isHidden: true,
  // },
  {
    Header: "Maliyet",
    accessor: "maliyet",
  },
];
