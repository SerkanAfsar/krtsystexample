import { BaseService } from ".";
import { ResponseResult } from "../../types/responseTypes";
import {
  AddWorOrderType,
  WorkOrderAtolyeType,
  WorkOrderListType,
  WorkOrderLogType,
  WorkOrderPeopleList,
  WorkOrderTeamGroupType,
  WorkOrderType,
} from "../../types/WorkOrder.types";

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
}: {
  page?: number;
}): Promise<any> => {
  let url = `product/work-order-list/`;
  if (page) {
    url += `?page=${page}`;
  }

  const result = await BaseService({
    url: url,
    bodyData: null,
    method: "GET",
    hasToken: true,
  });

  return result as any;
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
