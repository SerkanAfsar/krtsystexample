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

export type ResponseResult<T> = {
  success?: boolean;
  data?: T | null | string | number | any[];
  error?: string[] | null | string;
  statusCode: number;
  detail?: string | null;
};
