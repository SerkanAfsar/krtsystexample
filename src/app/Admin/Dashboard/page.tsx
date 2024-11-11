import ECommerce from "@/components/Dashboard/E-commerce";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  GetGemProductDatatableService,
  GetProductDatatableService,
} from "@/Services/Product.Services";
import { GetWorkOrdersList } from "@/Services/WorkOrder.Services";
import {
  CustomDataListType,
  MusteriType,
  ProductListType,
  TedarikciType,
} from "../../../types/types";
import { WorkOrderType } from "../../../types/WorkOrder.types";
import { GetMusteriDatatableService } from "@/Services/Customer.Service";
import { GetTedarikciDatatableService } from "@/Services/Supplier.Services";
import { GetMagazaDatatableService } from "@/Services/Magaza.Services";
import { MagazaType } from "@/types/Magaza";

export default async function Home() {
  const [
    pirlantaData,
    renklitasData,
    sadeData,
    mucevherData,
    isEmriResult,
    musteriData,
    tedarikciData,
    magazaData,
  ] = await Promise.all([
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
    GetMusteriDatatableService({}),
    GetTedarikciDatatableService({}),
    GetMagazaDatatableService({}),
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

  const musteriResult = musteriData.success
    ? (musteriData.data as CustomDataListType<MusteriType>)
    : null;

  const tedarikciResult = tedarikciData.success
    ? (musteriData.data as CustomDataListType<TedarikciType>)
    : null;

  const magazaResult = magazaData.success
    ? (musteriData.data as CustomDataListType<MagazaType>)
    : null;
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
          musteriCount={musteriResult?.count}
          tedarikciCount={tedarikciResult?.count}
          magazaCount={magazaResult?.count}
        />
      </DefaultLayout>
    </>
  );
}

export const dynamic = "force-dynamic";
