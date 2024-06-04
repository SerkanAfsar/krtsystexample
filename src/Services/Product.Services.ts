import { AddProductType, ResponseResult } from "@/types/responseTypes";
import { BaseService } from ".";

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
