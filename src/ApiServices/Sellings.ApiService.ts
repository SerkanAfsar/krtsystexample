import { ProductSaleType } from "@/Containers/SatisEkleContainer";
import { ResponseResult } from "../../types/responseTypes";
import { ApiServiceResult } from "@/utils";

export const AddSellinApiService = async ({
  data,
  callBack,
}: {
  data: ProductSaleType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/selling`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<ProductSaleType>;
  ApiServiceResult({ result, callBack, message: "Satış Eklendi" });
};
