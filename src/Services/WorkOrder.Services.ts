import { BaseService } from ".";
import { ResponseResult } from "../../types/responseTypes";
import { AddWorOrderType } from "../../types/WorkOrder.types";

export const AddWorkOrderService = async ({
  data,
}: {
  data: AddWorOrderType;
}): Promise<ResponseResult<any>> => {
  const result = await BaseService({
    url: "product/work-order",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<any>;
};

export const GetWorkOrderProductListModalService = async ({
  type,
  code,
}: {
  type?: string;
  code?: string;
}) => {
  let url = `product/product-list?&type=${type}`;
  if (code) {
    url += `&code=${code}`;
  }
  const result = await BaseService({
    url: url,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as ResponseResult<any>;
};
