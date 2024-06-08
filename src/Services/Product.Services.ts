import {
  AddProductType,
  ProductResponseType,
  ResponseResult,
} from "@/types/responseTypes";
import { BaseService } from ".";
import { GetNextOrderType } from "@/types/inputTypes";

export const AddProductService = async ({
  data,
}: {
  data: AddProductType;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: "product/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });
  return result as ResponseResult;
};

export const DiamondQueueByCodeService = async ({
  data,
}: {
  data: GetNextOrderType;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: "product/get-next-order/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });
  return result as ResponseResult;
};

export const GetDiamondDataTableService = async ({
  order_by,
  page,
  type,
}: {
  order_by?: string | null;
  page?: number;
  type?: string | null;
}): Promise<ProductResponseType> => {
  let urlPath: string = "product/?";
  // if (order_by) {
  //   urlPath += `order_by=${order_by}`;
  // }
  if (page) {
    urlPath += `page=${page.toString()}`;
  }
  // if (page) {
  //   type += `type=${type}`;
  // }
  console.log(urlPath);

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });
  return result as ProductResponseType;
};
