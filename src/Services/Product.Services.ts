import { AddProductType } from "@/types/responseTypes";
import { BaseService } from ".";

export const AddProductService = async (data: AddProductType): Promise<any> => {
  return await BaseService({
    url: "product/",
    body: data,
    method: "POST",
  });
};
