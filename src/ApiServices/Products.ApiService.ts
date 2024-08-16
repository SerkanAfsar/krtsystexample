import { ApiServiceResult } from "@/utils";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType, ProductType } from "../../types/types";
import useAlertDelete from "@/hooks/useAlertDelete";

export const DeleteProductApiService = async ({
  id,
  callBack,
}: {
  id: number;
  callBack?: any;
}) => {
  const response = await fetch(`/api/product/${id}`, {
    method: "DELETE",
  });
  const result = (await response.json()) as ResponseResult<ProductListType>;
  ApiServiceResult({ result, callBack, message: "Ürün Silindi" });
};

export const AddProductApiService = async ({
  data,
  callBack,
}: {
  data: ProductType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/product`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<ProductType>;
  ApiServiceResult({ result, callBack, message: "Ürün Eklendi" });
};

export const UpdateProductApiService = async ({
  id,
  data,
  callBack,
}: {
  id: number;
  data: ProductType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/product/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<ProductType>;
  ApiServiceResult({ result, callBack, message: "Ürün Güncellendi" });
};
