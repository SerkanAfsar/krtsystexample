import { AddProductType, ResponseResult } from "@/types/responseTypes";
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
