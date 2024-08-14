"use client";
import { Column } from "react-table";
import { WorkOrderType } from "../../types/WorkOrder.types";
import { useCallback, useEffect, useState } from "react";
import { GetWorkOrdersList } from "@/Services/WorkOrder.Services";
import { formatToCurrency } from "@/utils";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import { useRouter } from "next/navigation";
import { DeleteWorkOrderApiService } from "@/ApiServices/WorkOrders.ApiService";
import { FaPencil, FaTrash } from "react-icons/fa6";

const columns: Column<
  WorkOrderType & {
    isEmriKodu: string;
    mucevherKodu: string;
    sertifika: string;
    cikis: string;
    giris: string;
    islem: string;
    islemler: React.ReactNode;
  }
>[] = [
  {
    Header: "İş Emri Kodu",
    accessor: "isEmriKodu",
  },
  {
    Header: "Mücevher Kodu",
    accessor: "mucevherKodu",
  },

  {
    Header: "Son İşlem",
    accessor: "islem",
  },
  {
    Header: "Son İşlem Tarihi",
    accessor: "last_process_date",
  },
  {
    Header: "Maliyet",
    accessor: "total_product_cost",
  },
  {
    Header: "Durum",
    accessor: "status",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function IsEmirleriListesiContainer() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<WorkOrderType[] | string | null>(
    [],
  );
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

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
          mucevherKodu: item?.product_temp_code || "Oluşmadı",
          islem: item?.exit,
          last_process_date: new Date(
            item.last_process_date || null,
          ).toLocaleDateString(),
          total_product_cost: `${formatToCurrency(
            Number(item.total_product_cost),
          )} $`,
          status: item.status,

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
              await DeleteWorkOrderApiService({
                id,
                callBack: () => {
                  updateData();
                },
              });
            }}
          />
        </div>
      );
    },
    [router, updateData],
  );

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  if (typeof activeData == "string") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {activeData}
      </div>
    );
  }

  return (
    <>
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={columns}
          dataOne={activeData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Yükleniyor...
        </div>
      )}
    </>
  );
}
