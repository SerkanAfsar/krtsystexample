import ECommerce from "@/components/Dashboard/E-commerce";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  GetGemProductDatatableService,
  GetProductDatatableService,
} from "@/Services/Product.Services";
import { GetWorkOrdersList } from "@/Services/WorkOrder.Services";
import { ProductListType } from "../../../../types/types";
import { WorkOrderType } from "../../../../types/WorkOrder.types";

export default async function Home() {
  const [pirlantaData, renklitasData, sadeData, mucevherData, isEmriResult] =
    await Promise.all([
      GetProductDatatableService({
        order_by: "pk",
        page: 1,
        type: "Diamond",
      }),
      GetProductDatatableService({
        order_by: "pk",
        page: 1,
        type: "ColoredStone",
      }),
      GetProductDatatableService({
        order_by: "pk",
        page: 1,
        type: "Simple",
      }),
      GetGemProductDatatableService({
        order_by: "pk",
        page: 1,
      }),
      GetWorkOrdersList({ page: 1, order_by: "pk" }),
    ]);

  const pirlantaResult = pirlantaData.success
    ? (pirlantaData.data as ProductListType)
    : null;
  const renklitasResult = renklitasData.success
    ? (renklitasData.data as ProductListType)
    : null;
  const sadeResult = sadeData.success
    ? (sadeData.data as ProductListType)
    : null;
  const mucevherResult = mucevherData.success
    ? (mucevherData.data as ProductListType)
    : null;

  const isEmriData = isEmriResult?.results as WorkOrderType[];

  return (
    <>
      <DefaultLayout>
        <ECommerce
          workorderCount={isEmriResult.count}
          pirlantaCount={pirlantaResult?.count}
          renkliTasCount={renklitasResult?.count}
          sadeCount={sadeResult?.count}
          mucevherCount={mucevherResult?.count}
          isEmriData={isEmriData}
        />
      </DefaultLayout>
    </>
  );
}

export const dynamic = "force-dynamic";
