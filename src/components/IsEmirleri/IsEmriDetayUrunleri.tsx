"use client";

import useSimpleWorkOrderProductList from "@/hooks/WorkOrderHooks/useSimpleWorkOrderProductList";
import CustomDatatable from "../CustomUI/CustomDatatable";
import { Column } from "react-table";
export type IsEmirleriProductColumnType = {
  pk: string;
  code: string;
  type_tr: string;
  price: React.ReactNode;
  quantity: number;
  used_carat: number;
};

export const UretimUrunleriColumns: Column<IsEmirleriProductColumnType>[] = [
  {
    Header: "Id",
    accessor: "pk",
  },
  {
    Header: "Kod",
    accessor: "code",
  },
  {
    Header: "Ürün Tipi",
    accessor: "type_tr",
  },
  {
    Header: "Adedi",
    accessor: "quantity",
  },
  {
    Header: "Kullanılan Karat",
    accessor: "used_carat",
  },
  {
    Header: "Fiyatı",
    accessor: "price",
  },
];

export default function IsEmirleriDetayUrunleri({ id }: { id: number }) {
  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useSimpleWorkOrderProductList({ work_order_id: id });
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <CustomDatatable
      totalPageCount={totalPageCount}
      columns={UretimUrunleriColumns}
      data={activeData}
      activePage={activePage}
      isFirstLarge={false}
      setActivePage={setActivePage}
    />
  );
}
