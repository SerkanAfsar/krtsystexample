import { MagazaType } from "@/types/Magaza";
import { BaseService } from ".";
import { ResponseResult } from "../types/responseTypes";
import { CustomDataListType } from "../types/types";

export const AddMagazaService = async ({
  data,
}: {
  data: MagazaType;
}): Promise<ResponseResult<MagazaType>> => {
  const result = await BaseService({
    url: "product/store",
    bodyData: data,
    method: "POST",
    hasToken: true,
    isFormData: false,
  });

  return result as ResponseResult<MagazaType>;
};

export const GetAllMagazaService = async (): Promise<
  ResponseResult<CustomDataListType<MagazaType>>
> => {
  const result = await BaseService({
    url: "product/store",
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as ResponseResult<CustomDataListType<MagazaType>>;
};

export const GetMagazaService = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<MagazaType>> => {
  const result = await BaseService({
    url: `product/store/${id.toString()}`,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<MagazaType>;
};

export const DeleteMagazaService = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<MagazaType>> => {
  const result = await BaseService({
    url: `product/store/${id}/`,
    bodyData: null,
    method: "DELETE",
    hasToken: true,
  });

  return result as ResponseResult<MagazaType>;
};

export const UpdateMagazaService = async ({
  id,
  data,
}: {
  id: number;
  data: MagazaType;
}): Promise<ResponseResult<MagazaType>> => {
  const result = await BaseService({
    url: `product/store/${id.toString()}`,
    bodyData: data,
    method: "PUT",
    hasToken: true,
  });

  return result as ResponseResult<MagazaType>;
};

export const GetMagazaDatatableService = async ({
  order_by,
  page,
  type,
  sort,
}: {
  order_by?: string | null;
  page?: number;
  type?: string | null;
  sort?: "asc" | "desc";
}): Promise<ResponseResult<CustomDataListType<MagazaType>>> => {
  let urlPath: string = "product/store";
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

  return result as ResponseResult<CustomDataListType<MagazaType>>;
};
