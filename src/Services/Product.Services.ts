import {
  AddProductType,
  ProductResponseType,
  ResponseResult,
} from "@/types/responseTypes";
import { BaseService } from ".";
import { GetNextOrderType } from "@/types/inputTypes";

export const GetProductService = async ({
  id,
}: {
  id: Number;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: `product/${id.toString()}`,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult;
};

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

export const UpdateProductService = async ({
  id,
  data,
}: {
  id: Number;
  data: AddProductType;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: `product/${id.toString()}`,
    bodyData: data,
    method: "PUT",
    hasToken: true,
  });
  return result as ResponseResult;
};

export const DeleteProductService = async ({
  id,
}: {
  id: Number;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: `product/${id.toString()}/`,
    bodyData: null,
    method: "DELETE",
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

export const GetProductDatatableService = async ({
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
  if (type) {
    urlPath += `&type=${type}`;
  }

  const result = await BaseService({
    url: urlPath,
    method: "GET",
    bodyData: null,
    hasToken: true,
  });
  return result as ProductResponseType;
};

export const GetNextOrderForMixedDiamondService = async ({
  type = "Diamond",
  code,
}: {
  type: string;
  code: string;
}): Promise<ResponseResult> => {
  const data = { type, code };
  const result = await BaseService({
    url: "product/get-next-order-for-mixed-diamond/",
    method: "Post",
    bodyData: data,
    hasToken: true,
  });
  return result as ResponseResult;
};

export const GetNextOrderFromSingleDiamondService = async ({
  from_mixed = false,
  code,
}: {
  from_mixed: boolean;
  code: string;
}): Promise<ResponseResult> => {
  const data = { from_mixed, code };
  const result = await BaseService({
    url: "product/product-single-next-order/",
    method: "Post",
    bodyData: data,
    hasToken: true,
  });
  return result as ResponseResult;
};
export const GetListMixedProductsCodeDiamondService = async ({
  code,
}: {
  code: string;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: `product/list-mixed-products-codes/?code=${code}`,
    method: "Get",
    bodyData: null,
    hasToken: true,
  });
  return result as ResponseResult;
};

export const GetSadeCodeByTypeService = async ({
  type,
}: {
  type: string;
}): Promise<ResponseResult> => {
  const result = await BaseService({
    url: `product/product-simple-next-order/`,
    method: "Post",
    bodyData: { type },
    hasToken: true,
  });
  return result as ResponseResult;
};
