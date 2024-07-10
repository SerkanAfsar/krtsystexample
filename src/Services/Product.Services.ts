import { ResponseResult } from "../../types/responseTypes";
import { BaseService } from ".";
import { GetNextOrderType, NextOrderType } from "../../types/inputTypes";
import { ProductListType, ProductType } from "../../types/types";

export const GetProductService = async ({
  id,
}: {
  id: Number;
}): Promise<ResponseResult<ProductType>> => {
  const result = await BaseService({
    url: `product/${id.toString()}`,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<ProductType>;
};

export const AddProductService = async ({
  data,
}: {
  data: ProductType;
}): Promise<ResponseResult<ProductType>> => {
  const result = await BaseService({
    url: "product/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });
  return result as ResponseResult<ProductType>;
};

export const UpdateProductService = async ({
  id,
  data,
}: {
  id: Number;
  data: ProductType;
}): Promise<ResponseResult<ProductType>> => {
  const result = await BaseService({
    url: `product/${id.toString()}`,
    bodyData: data,
    method: "PUT",
    hasToken: true,
  });
  return result as ResponseResult<ProductType>;
};

export const DeleteProductService = async ({
  id,
}: {
  id: Number;
}): Promise<ResponseResult<ProductType>> => {
  const result = await BaseService({
    url: `product/${id.toString()}/`,
    bodyData: null,
    method: "DELETE",
    hasToken: true,
  });
  return result as ResponseResult<ProductType>;
};

export const GetProductDatatableService = async ({
  order_by,
  page,
  type,
}: {
  order_by?: string | null;
  page?: number;
  type?: string | null;
}): Promise<ResponseResult<ProductListType>> => {
  let urlPath: string = "product/?order_by='pk'";
  // if (order_by) {
  //   urlPath += `order_by=${order_by}`;
  // }
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
  return result as ResponseResult<ProductListType>;
};

export const GetNextOrderForMixedDiamondService = async ({
  type = "Diamond",
  code,
}: {
  type: string;
  code: string;
}): Promise<ResponseResult<GetNextOrderType>> => {
  const data = { type, code };
  const result = await BaseService({
    url: "product/get-next-order-for-mixed-diamond/",
    method: "Post",
    bodyData: data,
    hasToken: true,
  });
  return result as ResponseResult<GetNextOrderType>;
};

export const GetNextOrderFromSingleDiamondService = async ({
  from_mixed = false,
  code,
  type,
}: {
  from_mixed: boolean;
  code: string;
  type: "Diamond" | "Single" | "ColoredStone";
}): Promise<ResponseResult<GetNextOrderType>> => {
  const data = { from_mixed, code, type };
  const result = await BaseService({
    url: "product/product-single-next-order/",
    method: "Post",
    bodyData: data,
    hasToken: true,
  });
  return result as ResponseResult<GetNextOrderType>;
};
export const GetListMixedProductsCodeDiamondService = async ({
  code,
  type,
}: {
  code: string;
  type: string;
}): Promise<ResponseResult<string[]>> => {
  const result = await BaseService({
    url: `product/list-mixed-products-codes/?code=${code}&type=${type}`,
    method: "Get",
    bodyData: null,
    hasToken: true,
  });
  return result as ResponseResult<string[]>;
};

export const GetSadeCodeByTypeService = async ({
  type,
}: {
  type: string;
}): Promise<ResponseResult<NextOrderType>> => {
  const result = await BaseService({
    url: `product/product-simple-next-order/`,
    method: "Post",
    bodyData: { type },
    hasToken: true,
  });
  return result as ResponseResult<NextOrderType>;
};
