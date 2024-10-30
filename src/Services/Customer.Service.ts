import { BaseService } from ".";
import { ResponseResult } from "../types/responseTypes";
import {
  CustomDataListType,
  CustomerPurchatedProducts,
  MusteriType,
} from "../types/types";

export const AddCustomerService = async ({
  data,
}: {
  data: MusteriType;
}): Promise<ResponseResult<MusteriType>> => {
  const result = await BaseService({
    url: "product/customer",
    bodyData: data,
    method: "POST",
    hasToken: true,
    isFormData: false,
  });

  return result as ResponseResult<MusteriType>;
};

export const GetMusteriDatatableService = async ({
  order_by,
  page,
  type,
  sort,
}: {
  order_by?: string | null;
  page?: number;
  type?: string | null;
  sort?: "asc" | "desc";
}): Promise<ResponseResult<CustomDataListType<MusteriType>>> => {
  let urlPath: string = "product/customer";
  urlPath += `?order_by=${order_by ? (sort == "asc" ? `${order_by}` : `-${order_by}`) : "id"}`;
  if (page) {
    urlPath += `&page=${page.toString()}`;
  }
  if (type) {
    urlPath += `&type=${type}`;
  }

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });

  return result as ResponseResult<CustomDataListType<MusteriType>>;
};

export const DeleteMusteriService = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<MusteriType>> => {
  const result = await BaseService({
    url: `product/customer/${id}/`,
    bodyData: null,
    method: "DELETE",
    hasToken: true,
  });

  return result as ResponseResult<MusteriType>;
};

export const UpdateMusteriService = async ({
  id,
  data,
}: {
  id: number;
  data: MusteriType;
}): Promise<ResponseResult<MusteriType>> => {
  const result = await BaseService({
    url: `product/customer/${id.toString()}`,
    bodyData: data,
    method: "PUT",
    hasToken: true,
  });

  return result as ResponseResult<MusteriType>;
};

export const GetMusteriService = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<MusteriType>> => {
  const result = await BaseService({
    url: `product/customer/${id.toString()}`,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<MusteriType>;
};

export const GetCustomersListForSalesService = async ({
  search,
}: {
  search?: string;
}): Promise<ResponseResult<MusteriType>> => {
  let urlPath: string = "product/customer/search/";

  if (search) {
    urlPath += `?search=${search.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<MusteriType>;
};

export const GetCustomerPursahedList = async ({
  customerId,
  order_by,
  page,
  sort,
}: {
  customerId: number;
  order_by?: string | null;
  page?: number;

  sort?: "asc" | "desc";
}): Promise<ResponseResult<CustomerPurchatedProducts>> => {
  let urlPath: string = "product/customer/purchased-products/";

  urlPath += `?order_by=${order_by ? (sort == "asc" ? `${order_by}` : `-${order_by}`) : "id"}`;
  if (customerId) {
    urlPath += `&customer_id=${customerId}`;
  }
  if (page) {
    urlPath += `&page=${page.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<CustomerPurchatedProducts>;
};
