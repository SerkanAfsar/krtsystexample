import { ApiServiceResult } from "@/utils";
import { ResponseResult } from "../../types/responseTypes";
import { MusteriType } from "../../types/types";

export const AddCustomerApiService = async ({
  data,
  callBack,
}: {
  data: MusteriType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/customer`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<MusteriType>;
  ApiServiceResult({ result, callBack, message: "Müşteri Eklendi" });
};

export const DeleteMusteriApiService = async ({
  id,
  callBack,
}: {
  id: number;
  callBack?: any;
}) => {
  const response = await fetch(`/api/customer/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const result: ResponseResult<string> = await response.json();
  ApiServiceResult({
    result,
    callBack,
    message: "Müşteri Silindi",
    toastType: "error",
  });
};

export const UpdateCustomerApiService = async ({
  id,
  data,
  callBack,
}: {
  id: number;
  data: MusteriType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/customer/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<MusteriType>;
  ApiServiceResult({
    result,
    callBack,
    message: "Müşteri Bilgileri Güncellendi",
    toastType: "warning",
  });
};
