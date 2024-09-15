import { BaseService } from ".";
import { ResponseResult } from "../../types/responseTypes";
import { CustomDataListType, TedarikciType } from "../../types/types";

export const AddTedarikciService = async ({
  data,
}: {
  data: TedarikciType;
}): Promise<ResponseResult<TedarikciType>> => {
  const result = await BaseService({
    url: "product/supplier",
    bodyData: data,
    method: "POST",
    hasToken: true,
    isFormData: false,
  });

  return result as ResponseResult<TedarikciType>;
};

export const GetTedarikciService = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<TedarikciType>> => {
  const result = await BaseService({
    url: `product/supplier/${id.toString()}`,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<TedarikciType>;
};

export const GetTedarikciDatatableService = async ({
  order_by,
  page,
  type,
  sort,
}: {
  order_by?: string | null;
  page?: number;
  type?: string | null;
  sort?: "asc" | "desc";
}): Promise<ResponseResult<CustomDataListType<TedarikciType>>> => {
  let urlPath: string = "product/supplier";
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

  return result as ResponseResult<CustomDataListType<TedarikciType>>;
};

export const DeleteTedarikciService = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<TedarikciType>> => {
  const result = await BaseService({
    url: `product/supplier/${id}/`,
    bodyData: null,
    method: "DELETE",
    hasToken: true,
  });

  return result as ResponseResult<TedarikciType>;
};

export const UpdateTedarikciService = async ({
  id,
  data,
}: {
  id: number;
  data: TedarikciType;
}): Promise<ResponseResult<TedarikciType>> => {
  const result = await BaseService({
    url: `product/supplier/${id.toString()}`,
    bodyData: data,
    method: "PUT",
    hasToken: true,
  });

  return result as ResponseResult<TedarikciType>;
};
