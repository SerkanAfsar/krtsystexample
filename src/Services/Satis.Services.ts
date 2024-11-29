import {
  SaleResponseType,
  SaleTypeFormResult,
  SimpleSaleType,
  UpdateSaleService,
} from "@/types/Satis";
import { BaseService } from ".";
import { ResponseResult } from "../types/responseTypes";
import { CustomDataListType } from "../types/types";

export const GetSatisUrunDatatableService = async ({
  order_by,
  page,
  type,
  code,
  sort,
}: {
  code?: string;
  order_by?: string | null;
  page?: number;
  type?: string | null;
  sort?: "asc" | "desc";
}): Promise<ResponseResult<CustomDataListType<any>>> => {
  let urlPath: string = "product/customer/products/";
  urlPath += `?order_by=${order_by ? (sort == "asc" ? `${order_by}` : `-${order_by}`) : "pk"}`;
  if (page) {
    urlPath += `&page=${page.toString()}`;
  }
  if (type) {
    urlPath += `&type=${type}`;
  }
  if (code) {
    urlPath += `&code=${code}`;
  }

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });

  return result as ResponseResult<CustomDataListType<any>>;
};

export const AddSatisService = async ({
  data,
}: {
  data: SaleTypeFormResult;
}): Promise<ResponseResult<any>> => {
  const result = await BaseService({
    url: "product/customer/products/sales-product/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<any>;
};

export const GetAllSatisList = async ({
  customer_id,
  page = 1,
}: {
  customer_id?: number;
  page: number;
}): Promise<ResponseResult<CustomDataListType<SaleResponseType>>> => {
  let urlPath: string = "product/customer/order-list/";

  if (page) {
    urlPath += `?page=${page.toString()}`;
  }
  if (customer_id) {
    urlPath += `&customer_id=${customer_id.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });

  return result as ResponseResult<CustomDataListType<SaleResponseType>>;
};

export const GetSimpleSatisById = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<SimpleSaleType[]>> => {
  let urlPath: string = "product/customer/order/product-list";

  if (id) {
    urlPath += `?customer_order_id=${id.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });

  return result as ResponseResult<SimpleSaleType[]>;
};

export const UpdateSatisService = async ({
  data,
}: {
  data: UpdateSaleService;
}): Promise<ResponseResult<any>> => {
  const result = await BaseService({
    url: "product/customer/refund/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<any>;
};

export const GetRefundedProductList = async ({
  customer_order_id,
}: {
  customer_order_id: number;
}): Promise<ResponseResult<any[]>> => {
  let urlPath: string = "product/customer/refunded-products";

  if (customer_order_id) {
    urlPath += `?customer_order_id=${customer_order_id.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });

  return result as ResponseResult<any[]>;
};

export const SaleMakePaymentEdit = async ({
  data,
}: {
  data: any;
}): Promise<ResponseResult<any[]>> => {
  let urlPath: string = "product/customer/make-payment/";

  const result = await BaseService({
    url: urlPath,
    method: "POST",
    bodyData: data,
    hasToken: true,
  });

  return result as ResponseResult<any[]>;
};
