import { formatTarih, formatToCurrency } from "@/utils";
import { useEffect, useState } from 'react';
import {
  WorkOrderListType,
  WorkOrderLogType,
} from "../../types/WorkOrder.types";
import { GetWorkOrderLogsByWorkOrderId } from "@/Services/WorkOrder.Services";

export default function IsEmirleriLoglari({
  id,
  workOrderLogs,
}: {
  id?: number;
  workOrderLogs?: WorkOrderLogType[];
}) {
  const [resultData, setResultData] = useState<WorkOrderListType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await GetWorkOrderLogsByWorkOrderId({ id });
        if (!result?.success) {
          setError(result.error ? result.error[0] : "Hata");
        } else {
          setResultData(result.data as WorkOrderListType);
        }
      } else {
        const totalLaborCost = workOrderLogs?.reduce((acc, next) => {
          return acc + Number(next.cost);
        }, 0) || 0;
        setResultData({
          total_labor_cost: totalLaborCost,
          logs: workOrderLogs || [],
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [id, workOrderLogs]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <>{error}</>;

  const newData = resultData?.logs?.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });

  return (
    <div className="mb-1 mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke dark:border-strokedark">
        <div className="flex w-full items-center justify-between p-4 text-lg font-medium text-black dark:text-white">
          <span> Üretim Bilgileri</span>
          <b>
            Toplam İşçilik :{" "}
            {`${formatToCurrency(Number(resultData?.total_labor_cost) || 0)} $`}
          </b>
        </div>
      </div>
      <hr />
      <div className="block w-full p-5">
        <div className="grid grid-cols-6 items-center gap-3  rounded-md border-[#e5e9ed] bg-[#f9fafb] p-3  font-medium text-black">
          <div className="text-center">Tarih</div>
          <div className="text-center">Atölye</div>
          <div className="text-center">İşçilik</div>
          <div className="text-center">Çıkış Gramı</div>
          <div className="text-center">Açıklama</div>
          <div className="text-center">İşçilik Maliyeti</div>
        </div>

        {newData?.map((item, index) => {
          const date  = formatTarih(item.created_at as string);
          return (
            <div
              key={index}
              className="grid grid-cols-6 items-center gap-3 border-l-[1px] border-r-[1px] border-t-[1px] border-[#e5e9ed] p-3 font-medium  capitalize  text-black last:border-b-[1px]"
            >
              <div className="flex flex-col items-center justify-center gap-1  text-center">
                <span>{date}</span>
              </div>
              <div className="text-center">
              {item.from_group ? item.from_group : "-"}
              </div>
              <div className="text-center">
                {`${formatToCurrency(item.cost || 0)} $`}
              </div>
              <div className="text-center">{`${item?.output_gram} gr`}</div>
              <div className="text-center">{item.description}</div>
              <div className="text-center">{`${formatToCurrency(item.cost || 0)} $`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
