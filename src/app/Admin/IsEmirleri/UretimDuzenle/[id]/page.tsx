import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IsEmriDuzenleContainer from "@/Containers/IsEmriDuzenleContainer";
import { cookies } from "next/headers";
import {
  GetWorkOrderById,
  GetWorkOrderGroupTypes,
} from "@/Services/WorkOrder.Services";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import {
  WorkOrderTeamGroupType,
  WorkOrderType,
} from "../../../../../types/WorkOrder.types";

import { notFound } from "next/navigation";
import { ResponseResult } from "../../../../../types/responseTypes";
import { UserGroupsType } from "../../../../../types/types";
import { getLoggedUserId } from "@/actions/Auth.actions";

export default async function UretimDuzenle({ params }: { params: Params }) {
  const cookieStore = cookies();
  const userGroups: UserGroupsType[] = JSON.parse(
    cookieStore.get("user_groups")?.value || "",
  );

  const userId = await getLoggedUserId();
  const isAdmin = userGroups.some((a) => a.name == "Üretim Müdürü");

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
  const workOrderData = workOrderResult.data as WorkOrderType;

  const groups = await GetWorkOrderGroupTypes({ group_name: undefined });
  if (!groups.success) {
    throw new Error("Work Order Groups get error");
  }

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "İş Emirleri",
            url: "/Admin/IsEmirleri/UretimIsEmirleriListesi",
          },
        ]}
        pageName={`ID: ${workOrderData.id} İş Emri Bilgileri ${workOrderData.status === "Completed" ? " - (Tamamlanmış)" : ""}`}
      />
      <IsEmriDuzenleContainer
        userId={userId}
        isAdmin={isAdmin}
        workOrderData={workOrderData}
        workOrderGroups={(groups?.data as WorkOrderTeamGroupType[]) || []}
      />
    </DefaultLayout>
  );
}
