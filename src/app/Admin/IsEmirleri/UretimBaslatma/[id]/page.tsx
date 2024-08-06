import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IsEmriBaslatmaContainer from "@/Containers/IsEmriBaslatmaContainer";
import {
  GetWorkOrderById,
  GetWorkOrderGroupTypes,
} from "@/Services/WorkOrder.Services";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import {
  WorkOrderTeamGroupType,
  WorkOrderType,
} from "../../../../../../types/WorkOrder.types";
import IsEmirDetayLoglari from "@/components/IsEmirleri/IsEmirDetayLoglari";
import { notFound } from "next/navigation";
import { ResponseResult } from "../../../../../../types/responseTypes";

export default async function UretimBaslatma({ params }: { params: Params }) {
  if (!params?.id || isNaN(params?.id)) {
    return notFound();
  }

  const workOrderResult: ResponseResult<WorkOrderType> = await GetWorkOrderById(
    {
      id: params.id,
    },
  );
  if (workOrderResult.statusCode == 404) {
    return notFound();
  }
  if (!workOrderResult.success) {
    throw new Error(workOrderResult.error ? workOrderResult.error[0] : "Hata ");
  }

  const groups = await GetWorkOrderGroupTypes({ group_name: undefined });
  if (!groups.success) {
    throw new Error("Work Order Groups get error");
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Üretim İş Emri Başlatma " />
      <IsEmriBaslatmaContainer
        workOrder={workOrderResult.data as WorkOrderType}
        workOrderGroups={(groups?.data as WorkOrderTeamGroupType[]) || []}
      />
      <IsEmirDetayLoglari id={Number(params.id)} />
    </DefaultLayout>
  );
}
