export type SadeProductType = {
  pk?: number;
  code: string;
  type: string;
  image: string;
  created_at: string;
  updated_at: string;
  properties: { [key: string]: any | null };
  product_certificate: { [key: string]: any | null };
  total_cost: number;
  buy_date: any | null;
  remaining_count: number;
  menstrual_status: string | null;
  product_cost: number | null;
};
