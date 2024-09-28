import React from "react";

export type WorkOrderProductType = {
  product_id: number;
  quantity: number | null;
  used_carat: number | null;
  price: number | null;
  type?: string | null;
  ayar?: string | null;
  modelTuru?: string | null;
};

export type ProductItemsType = {
  title: string;
  products: WorkOrderProductType[];
};

export type AddWorOrderType = {
  description: string;
  workorder_products: any[];
  product_temp_code: string;
};

export type WorkOrderAtolyeType = {
  work_order: number;
  from_person: number;
  to_person: number;
  from_group: number;
  to_group: number;
  wastage: number;
  output_gram: number;
  cost: number;
  description: string;
};

export type WorkOrderTeamGroupType = {
  id: number;
  name: string;
};

export type WorkOrderPeopleList = {
  id: number;
  username: string;
  email: string;
};

export type WorkOrderType = {
  id: number;
  total_product_cost: string;
  image: string;
  description: string;
  is_active: boolean;
  status: string;
  user: string;
  created_at: string;
  last_process_date: any;
  exit?: string;
  group?: string;
  product_temp_code?: string;
  totalProductColumn?: React.ReactNode;
  labor_cost: number | null;
  total_cost: number | null;
};

export type WorkOrderLogType = {
  id: number;
  work_order: number;
  created_at: string;
  updated_at: string;
  from_person: string;
  to_person: string;
  from_group: string;
  to_group: string;
  wastage: number | null;
  output_gram: number;
  cost: number;
  description: string | null;
};

export type WorkOrderListType = {
  total_labor_cost: number | null;
  logs: WorkOrderLogType[] | null;
};

export type WorkOrderQueueType = {
  next_order: string;
};
