import { BaseService } from ".";
import { ResponseResult } from "../types/responseTypes";
import { ProductListType } from "../types/types";
import {
  AddWorOrderType,
  WorkOrderAtolyeType,
  WorkOrderListType,
  WorkOrderNotificationType,
  WorkOrderPeopleList,
  WorkOrderQueueType,
  WorkOrderTeamGroupType,
  WorkOrderType,
} from "../types/WorkOrder.types";

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
  let url = `product/product-list/?&type=${type}`;
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

export const GetWorkOrderGroupTypes = async ({
  group_name,
}: {
  group_name?: string;
}): Promise<ResponseResult<WorkOrderTeamGroupType>> => {
  let url = `user/groups/`;
  if (group_name) {
    url += `?group_name=${group_name}`;
  }
  const result = await BaseService({
    url: url,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as ResponseResult<WorkOrderTeamGroupType>;
};

export const GetWorkOrderById = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<WorkOrderType>> => {
  const result = await BaseService({
    url: `product/work-order/${id}/`,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as ResponseResult<WorkOrderType>;
};

export const GetWorkOrderPeopleByGroups = async ({
  group_ids,
}: {
  group_ids: number[];
}): Promise<WorkOrderPeopleList[]> => {
  const result = await BaseService({
    url: "user/groups/",
    bodyData: { group_ids },
    method: "POST",
    hasToken: true,
    isResponseList: true,
  });

  return result as WorkOrderPeopleList[];
};

export const AddWorkOrderLogService = async ({
  data,
}: {
  data: WorkOrderAtolyeType;
}): Promise<ResponseResult<WorkOrderAtolyeType>> => {
  const result = await BaseService({
    url: "product/work-order-log/",
    bodyData: data,
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<WorkOrderAtolyeType>;
};

export const GetWorkOrdersList = async ({
  page,
  order_by,
  sort,
}: {
  page?: number;
  order_by?: string | null;
  sort?: "asc" | "desc";
}): Promise<any> => {
  let urlPath: string = "product/work-order-list/?";
  urlPath += `order_by=${order_by ? (sort == "asc" ? `${order_by}` : `-${order_by}`) : "pk"}`;
  if (page) {
    urlPath += `&page=${page.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as any;
};

export const GetSimpleWorkOrderProductList = async ({
  work_order_id,
  page,
  order_by,
  sort,
}: {
  work_order_id: number;
  page?: number;
  order_by?: string | null;
  sort?: "asc" | "desc";
}): Promise<ResponseResult<ProductListType>> => {
  let urlPath: string = "product/work-order/product-list/?";
  urlPath += `order_by=${order_by ? (sort == "asc" ? `${order_by}` : `-${order_by}`) : "pk"}`;
  if (page) {
    urlPath += `&page=${page.toString()}`;
  }
  if (work_order_id) {
    urlPath += `&work_order_id=${work_order_id.toString()}`;
  }

  const result = await BaseService({
    url: urlPath,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as ResponseResult<ProductListType>;
};

export const GetWorkOrderLogsByWorkOrderId = async ({
  id,
}: {
  id: number;
}): Promise<ResponseResult<WorkOrderListType>> => {
  let url = `product/work-order-log/`;
  if (id) {
    url += `?work_order_id=${id}`;
  }
  const result = await BaseService({
    url: url,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as ResponseResult<WorkOrderListType>;
};

export const DeleteWorkOrderById = async ({
  work_order_id,
}: {
  work_order_id: number;
}): Promise<ResponseResult<string>> => {
  const result = await BaseService({
    url: "product/cancel-work-order/",
    bodyData: { work_order_id },
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<string>;
};

export const GetNextOrderWorkOrderCode = async ({
  code,
}: {
  code: string;
}): Promise<ResponseResult<WorkOrderQueueType>> => {
  const result = await BaseService({
    url: "product/product-gem-next-order/",
    bodyData: code,
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<WorkOrderQueueType>;
};

export const FinishWorkOrderById = async ({
  work_order_id,
  ware_house,
  image,
}: {
  work_order_id: number;
  ware_house: string;
  image: string;
}): Promise<ResponseResult<string>> => {
  const result = await BaseService({
    url: "product/finish-work-order/",
    bodyData: { work_order_id, ware_house, image },
    method: "POST",
    hasToken: true,
  });

  return result as ResponseResult<string>;
};

export const GetWorkOrderNotificationListService = async (): Promise<
  ResponseResult<WorkOrderNotificationType>
> => {
  const result = await BaseService({
    url: "product/user/notifications/",
    method: "GET",
    hasToken: true,
    bodyData: null,
  });

  return result as ResponseResult<WorkOrderNotificationType>;
};

export const PostWorkOrderNotificationReadService = async ({
  notification_id,
}: {
  notification_id: number;
}): Promise<ResponseResult<any>> => {
  const result = await BaseService({
    url: "product/user/mark-as-read/",
    method: "POST",
    hasToken: true,
    bodyData: { notification_id },
  });

  return result as ResponseResult<any>;
};
