export type LoginResultType = {
  message?: string | null;
  result: boolean;
  payload: {
    token?: string;
    user?: {
      email: string;
    };
    password?: string[];
    username?: string[];
  };
};

export type AddProductType = {
  code?: string;
  type?: string;
  properties?: { [key: string]: string };
  image?: string;
  product_inside?: { [key: string]: string };
  total_cost?: string;
  buy_date?: string;
  product_certificate?: { [key: string]: string };
  product_cost?: { [key: string]: string };
  menstrual_status?: string;
};
