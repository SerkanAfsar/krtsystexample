import { SaleType } from "@/types/Satis";
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
  data: SaleType;
}): Promise<ResponseResult<SaleType>> => {
  const result = await BaseService({
    url: "product/customer/products/sales-product/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<SaleType>;
};
