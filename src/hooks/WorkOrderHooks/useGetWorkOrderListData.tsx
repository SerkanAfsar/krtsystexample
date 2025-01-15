import { dolarFormat, formatDate } from "@/utils";
import {
  ConvertWorkOrderStatus,
  WorkOrderStatusType,
} from "@/utils/WorkOrder.Utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { WorkOrderType } from "../../types/WorkOrder.types";
import { GetWorkOrdersList } from "@/Services/WorkOrder.Services";
import { useRouter, useSearchParams } from "next/navigation";
import { DeleteWorkOrderApiService } from "@/ApiServices/WorkOrders.ApiService";
import CustomToolTip from "@/components/CustomUI/CustomTooltip";
import { useUserStore } from "@/store/useUserStore";

export default function useGetWorkOrderListData() {
  const router = useRouter();
  const params = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<WorkOrderType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemRef = useRef<any | null>(null);

  const order_by = params.get("order_by");
  const sort = (params.get("sort") as "asc" | "desc") || undefined;

  const updateData = useCallback(() => {
    setActiveData([]);
    GetWorkOrdersList({
      page: activePage,
      order_by: order_by,
      sort,
    }).then((resp: any) => {
      const { error } = resp;
      if (error) {
        setError(error[0] || "Hata");
        return;
      }
      const data = resp.results as WorkOrderType[];
      const dataOneResult: any = data.map((item) => {
        const sonIslemTarihi = formatDate(item.last_process_date as string);
        return {
          id: item.id,
          code: item?.product_temp_code ? (
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
            <div className="flex flex-col items-start justify-start gap-2">
              <span>{sonIslemTarihi.primary}</span>
              <span>{sonIslemTarihi.secondary}</span>
            </div>
          ) : null,

          totalProductColumn: (
            <CustomToolTip text={dolarFormat(item.total_cost as number)}>
              <div className="flex flex-col  items-center justify-center gap-1">
                <b>Maliyet</b>
                <div>
                  Malzeme :{" "}
                  {/* {stringToMoney(item.total_product_cost.toString() || "")} $
                   */}
                  {dolarFormat(Number(item.total_product_cost))}
                </div>
                <div>
                  {/* İşçilik : {stringToMoney(item.labor_cost?.toString() || "")} $ */}
                  İşçilik: {dolarFormat(Number(item.labor_cost))}
                </div>
              </div>
            </CustomToolTip>
          ),
          status: ConvertWorkOrderStatus(item.status as WorkOrderStatusType),
          islemler: islemlerArea({
            id: item.id as number,
            productCode: item.product_temp_code as string,
          }),
        };
      });
      setActiveData(dataOneResult);
      setTotalPageCount(
        Math.ceil(
          resp?.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
        ),
      );
    });
  }, [activePage, order_by, sort]);

  const { user } = useUserStore();

  useEffect(() => {
    updateData();
  }, [updateData]);

  const islemlerArea = useCallback(
    ({ id, productCode }: { id: number; productCode: string }) => {
      return (
        <div className="flex items-center justify-center  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={() =>
              router.push(`/Admin/IsEmirleri/UretimBaslatma/${id}`)
            }
          />
          <FaPencil
            className="cursor-pointer"
            onClick={() =>
              router.push(`/Admin/IsEmirleri/UretimDuzenle/${id}`)
            }
          />
          {user?.groups.some((a) => a.name == "Üretim Müdürü") && (
            <FaTrash
              className="cursor-pointer"
              onClick={async () => {
                setShowConfirmDelete(true);
                itemRef.current = { id, productCode };
              }}
            />
          )}
        </div>
      );
    },
    [router, user],
  );

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  useEffect(() => {
    if (confirmDelete && itemRef && itemRef.current) {
      DeleteWorkOrderApiService({
        id: itemRef.current.id as number,
        callBack: updateData,
      });
      setConfirmDelete(false);
      setShowConfirmDelete(false);
      itemRef.current = null;
    } else {
      itemRef.current = null;
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
    item: itemRef.current,
    error,
  };
}
