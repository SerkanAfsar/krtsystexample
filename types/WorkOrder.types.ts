export type WorkOrderProductType = {
  product_id: number;
  quantity: number | null;
  used_carat: number | null;
  price: number | null;
};

export type ProductItemsType = {
  title: string;
  products: WorkOrderProductType[];
};

export type AddWorOrderType = {
  description: string;
  workorder_products: any[];
};
