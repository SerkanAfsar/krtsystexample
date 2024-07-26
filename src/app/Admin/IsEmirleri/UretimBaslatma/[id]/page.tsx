import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IsEmriBaslatmaContainer from "@/Containers/IsEmriBaslatmaContainer";
import { GetWorkOrderGroupTypes } from "@/Services/WorkOrder.Services";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { WorkOrderTeamGroupType } from "../../../../../../types/WorkOrder.types";
import IsEmirDetayLoglari from "@/components/IsEmirleri/IsEmirDetayLoglari";
import { notFound } from "next/navigation";

export default async function UretimBaslatma({ params }: { params: Params }) {
  if (!params?.id || isNaN(params?.id)) {
    return notFound();
  }
  const groups = await GetWorkOrderGroupTypes({ group_name: undefined });
  if (!groups.success) {
    throw new Error("Work Order Groups get error");
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Üretim İş Emri Başlatma " />
      <IsEmriBaslatmaContainer
        workOrderGroups={(groups?.data as WorkOrderTeamGroupType[]) || []}
      />
      <IsEmirDetayLoglari id={Number(params.id)} />
    </DefaultLayout>
  );
}
