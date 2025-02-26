"use client";
import { useState } from "react";
import IsEmriDuzenleContainer from "@/Containers/IsEmriDuzenleContainer";
import IsEmriBaslatmaContainer from "@/Containers/IsEmriBaslatmaContainer";

import {
    WorkOrderTeamGroupType,
    WorkOrderType,
  } from "../types/WorkOrder.types";

export default function IsEmriSelectContainer ({
  workOrderGroups,
  workOrderData,
  isAdmin,
  userId,
  page,
}:{
  userId: number;
  isAdmin: boolean;
  workOrderData: WorkOrderType;
  workOrderGroups: WorkOrderTeamGroupType[];
  page: string;
}) {
    const [selectedComponent, setSelectedComponent] = useState<"atolye" | "kasa">(
        page === "atolye" || page === "kasa" ? page : "atolye"
      );

  return (
    <div>
      {isAdmin && (
        <div className="mb-4 flex gap-4">
          <button
            className={`px-4 py-2 rounded-md ${selectedComponent === "kasa" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setSelectedComponent("kasa")}
          >
            Kasa
          </button>
          <button
            className={`px-4 py-2 rounded-md ${selectedComponent === "atolye" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setSelectedComponent("atolye")}
          >
            Atölye
          </button>
        </div>
      )}

      {selectedComponent === "kasa" ? (
        <IsEmriDuzenleContainer
          userId={userId}
          isAdmin={isAdmin}
          workOrderData={workOrderData}
          workOrderGroups={workOrderGroups}
        />
      ) : (
        <IsEmriBaslatmaContainer
          userId={userId}
          isAdmin={isAdmin}
          workOrderData={workOrderData}
          workOrderGroups={workOrderGroups}
        />
      )}
    </div>
  );
}
