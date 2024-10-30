import { ApiServiceResult } from "@/utils";
import { ResponseResult } from "../types/responseTypes";
import { TedarikciType } from "../types/types";

export const AddTedarikciApiService = async ({
  data,
  callBack,
}: {
  data: TedarikciType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/supplier`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<TedarikciType>;
  ApiServiceResult({ result, callBack, message: "Tedarikçi Eklendi" });
};

export const DeleteTedarikciApiService = async ({
  id,
  callBack,
}: {
  id: number;
  callBack?: any;
}) => {
  const response = await fetch(`/api/supplier/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const result: ResponseResult<string> = await response.json();
  ApiServiceResult({
    result,
    callBack,
    message: "Tedarikçi Silindi",
    toastType: "error",
  });
};

export const UpdateTedarikciApiService = async ({
  id,
  data,
  callBack,
}: {
  id: number;
  data: TedarikciType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/supplier/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<TedarikciType>;
  ApiServiceResult({
    result,
    callBack,
    message: "Tedarikçi Bilgileri Güncellendi",
    toastType: "warning",
  });
};
