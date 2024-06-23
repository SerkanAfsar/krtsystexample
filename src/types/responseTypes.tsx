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
  code: string | null;
  type: string;
  properties?: { [key: string]: string | number };
  image?: string;
  product_inside?: { [key: string]: string | number };
  total_cost?: number;
  buy_date?: string;
  product_certificate?: { [key: string]: string | number };
  product_cost?: { [key: string]: string };
  menstrual_status?: string;
};

export type ResponseResult = {
  result?: boolean;
  message?: string | null;
  payload: any;
};

export type ProductResponseType = {
  result: boolean;
  message: string | null;
  payload: {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
  };
};
