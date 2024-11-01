import { ApiServiceResult } from "@/utils";
import { ResponseResult } from "../types/responseTypes";
import { MagazaType } from "@/types/Magaza";

export const AddMagazaApiService = async ({
  data,
  callBack,
}: {
  data: MagazaType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/magaza`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<MagazaType>;
  ApiServiceResult({ result, callBack, message: "Mağaza Eklendi" });
};

export const DeleteMagazaApiService = async ({
  id,
  callBack,
}: {
  id: number;
  callBack?: any;
}) => {
  const response = await fetch(`/api/magaza/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const result: ResponseResult<string> = await response.json();
  ApiServiceResult({
    result,
    callBack,
    message: "Mağaza Silindi",
    toastType: "error",
  });
};

export const UpdateMagazaApiService = async ({
  id,
  data,
  callBack,
}: {
  id: number;
  data: MagazaType;
  callBack?: any;
}) => {
  const response = await fetch(`/api/magaza/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ResponseResult<MagazaType>;
  ApiServiceResult({
    result,
    callBack,
    message: "Mağaza Bilgileri Güncellendi",
    toastType: "warning",
  });
};
