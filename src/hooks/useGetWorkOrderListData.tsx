import { formatDate, formatToCurrency } from "@/utils";
import {
  ConvertWorkOrderStatus,
  WorkOrderStatusType,
} from "@/utils/WorkOrder.Utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { WorkOrderType } from "../../types/WorkOrder.types";
import { GetWorkOrdersList } from "@/Services/WorkOrder.Services";
import { useRouter } from "next/navigation";
import { DeleteWorkOrderApiService } from "@/ApiServices/WorkOrders.ApiService";

export default function useGetWorkOrderListData() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<WorkOrderType[] | string | null>(
    [],
  );
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const idRef = useRef<number | null>(null);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetWorkOrdersList({
      page: activePage,
    }).then((resp: any) => {
      const { error } = resp;
      if (error) {
        setActiveData(error);
      }
      const data = resp.results as WorkOrderType[];
      const dataOneResult: any = data.map((item) => {
        return {
          isEmriKodu: item.id,
          mucevherKodu: item?.product_temp_code ? (
            <span>{item?.product_temp_code}</span>
          ) : (
            <button
              disabled
              className="inline-flex rounded-full border border-[#DC3545] px-3 py-1 text-sm font-medium text-[#DC3545] hover:opacity-80"
            >
              Oluşmadı
            </button>
          ),
          islem: item?.exit,
          last_process_date: item.last_process_date ? (
            <div className="leading-6">
              {formatDate(item.last_process_date as string)}
            </div>
          ) : null,
          total_product_cost: `${formatToCurrency(
            Number(item.total_product_cost),
          )} $`,
          status: ConvertWorkOrderStatus(item.status as WorkOrderStatusType),
          islemler: islemlerArea({ id: item.id as number }),
        };
      });
      setActiveData(dataOneResult);
      setTotalPageCount(
        Math.ceil(
          resp?.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
        ),
      );
    });
  }, [activePage]);

  const islemlerArea = useCallback(
    ({ id }: { id: number }) => {
      return (
        <div className="flex items-center justify-start  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={() =>
              router.push(`/Admin/IsEmirleri/UretimBaslatma/${id}`)
            }
          />
          <FaTrash
            className="cursor-pointer"
            onClick={async () => {
              setShowConfirmDelete(true);
              idRef.current = id;
            }}
          />
        </div>
      );
    },
    [router],
  );

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  useEffect(() => {
    if (confirmDelete && idRef.current && idRef) {
      DeleteWorkOrderApiService({
        id: idRef.current,
        callBack: () => {
          updateData();
        },
      });
      setConfirmDelete(false);
      setShowConfirmDelete(false);
      idRef.current = null;
    } else {
      idRef.current = null;
    }
  }, [confirmDelete, updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    confirmDelete,
    setConfirmDelete,
    setShowConfirmDelete,
    showConfirmDelete,
  };
}
