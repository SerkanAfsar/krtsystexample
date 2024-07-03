export type ProductType = {
  pk?: number;
  code?: string | null;
  type?: "Diamond" | "Simple" | "ColoredStone";
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
};

export type ProductListType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductType[];
};

export type GetNextOrderType = {
  next_order?: string;
};

export type AuthType = {
  token: string;
  user: {
    email: string;
  };
};
