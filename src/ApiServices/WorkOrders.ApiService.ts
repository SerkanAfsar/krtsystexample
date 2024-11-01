import { ApiServiceResult } from "@/utils";
import { ResponseResult } from "../types/responseTypes";
import { WorkOrderQueueType } from "../types/WorkOrder.types";

export const DeleteWorkOrderApiService = async ({
  id,
  callBack,
}: {
  id: number;
  callBack?: any;
}) => {
  const response = await fetch("/api/workorder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ id }),
  });
  const result: ResponseResult<string> = await response.json();
  ApiServiceResult({
    result,
    callBack,
    message: "İş Emri Silindi",
    toastType: "error",
  });
};

export const FinishWorkOrderApiService = async ({
  id,
  store_id,
  image,
  callBack,
}: {
  id: number;
  store_id: number;
  image: string;
  callBack?: any;
}) => {
  const response = await fetch("/api/workorder/finish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ id, store_id, image }),
  });
  const result: ResponseResult<string> = await response.json();
  ApiServiceResult({ result, callBack, message: "İş Emri Tamamlandı" });
};

export const WorkOrderQueueApiService = async ({
  code,
  callBack,
}: {
  code: string;
  callBack?: any;
}): Promise<string> => {
  const response = await fetch("/api/workorder/queue", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ code }),
  });
  const result: ResponseResult<WorkOrderQueueType> = await response.json();
  if (result.success) {
    const data = result.data as WorkOrderQueueType;
    return data.next_order;
  }
  return "";
};
