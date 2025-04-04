import React from "react";

export type WorkOrderProductType = {
  product_id: number;
  quantity: number | null;
  used_carat: number | null;
  price: number | null;
  type?: string | null;
  ayar?: string | null;
  modelKodu?: string | null;
  modelTuru?: string | null;
  renk?: string | null;
  name?: string | null;
  status?: string | number | null; 
  current_cost?: number | null; 
};

export type ProductItemsType = {
  title: string;
  products: WorkOrderProductType[];
};

export type AddWorkOrderType = {
  model_type: number,
  total_product_cost : string,
  gender : string,
  description: string;
  workorder_products: any[];
  product_temp_code: string;
  current_cost?: string | null;
};

export type UpdateWorkOrderType = {
  model_type: number,
  total_product_cost? : string,
  current_cost : string,
  gender : string,
  description: string;
  workorder_products: any[];
  product_temp_code: string;
  work_order_id: number;
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
  gender: string;
  model_type_name: string;
  model_type: number;
  total_labor_cost?: number;
  current_cost ?: string;
};

export type WorkOrderLogType = {
  id: number;
  work_order: number;
  created_at: string;
  updated_at: string;
  from_person: string;
  to_person: string;
  from_group: string;
  user_group: string;
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

export type WorkOrderNotificationType = {
  id: number;
  title: string;
  description: string;
  is_read: boolean;
  created_at: string;
  work_order: number;
};

export type WorkOrderWastagePayloadType = {
  work_order_product_wastage: {
    work_order_product_id: number;
    wastage: number | null;
    wastage_quantity: number | null;
    unused_carat: number | null;
  }[];
  will_update_products: {
    work_order_product_ids: number[];
    status: string;
    target_user_id: number | null;
    from_user_id: number | null;
    pupil_user_id: number | null;
  };
  work_order_log: {
    work_order: number;
    output_gram: string | number;
    cost: string | number;
    description: string;
    product_ids: number[];
  };
};

