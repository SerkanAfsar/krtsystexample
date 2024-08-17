import { GetWorkOrderLogsByWorkOrderId } from "@/Services/WorkOrder.Services";
import React from "react";
import { WorkOrderListType } from "../../../types/WorkOrder.types";
import { formatDate, formatToCurrency } from "@/utils";

export default async function IsEmirDetayLoglari({ id }: { id: number }) {
  const result = await GetWorkOrderLogsByWorkOrderId({ id });
  if (!result?.success) {
    return (
      <div className="mb-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke dark:border-strokedark">
          <div className="flex w-full items-center justify-between">
            <h3 className="flex items-center justify-center p-4 text-lg font-medium text-black dark:text-white">
              <span className="ml-auto"> Üretim Bilgileri</span>
              <b className="ml-auto mr-4"> </b>
            </h3>
            <b className="mr-4 text-black"></b>
          </div>
        </div>
        <hr />
        <div className="block w-full p-5 text-center">
          {result.error ? result.error[0] : "Hata"}
        </div>
      </div>
    );
  }
  const data = result.data as WorkOrderListType;

  const newData = data.logs?.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });

  return (
    <div className="mb-1 mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke dark:border-strokedark">
        <div className="flex w-full items-center justify-between p-4 text-lg font-medium text-black dark:text-white">
          <span> Üretim Bilgileri</span>
          <b>
            Toplam İşçilk :
            {`${formatToCurrency(Number(data?.total_labor_cost) || 0)} $`}
          </b>
        </div>
      </div>
      <hr />
      <div className="block w-full p-5">
        <div className="grid grid-cols-9 items-center gap-3  rounded-md border-[#e5e9ed] bg-[#f9fafb] p-3  font-medium text-black">
          <div className="text-center">Tarih</div>
          <div className="text-center">Çıkış Atölye</div>
          <div className="text-center">Teslim Eden</div>
          <div className="text-center">Giriş Atölye</div>
          <div className="text-center">Teslim Alan</div>
          <div className="text-center">İşçilik</div>
          <div className="text-center">Çıkış Gramı</div>
          <div className="text-center">Açıklama</div>
          <div className="text-center">İşçilik Maliyeti</div>
        </div>

        {newData?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-9 items-center gap-3 border-l-[1px] border-r-[1px] border-t-[1px] border-[#e5e9ed] p-3 font-medium  capitalize  text-black last:border-b-[1px]"
          >
            <div className="text-center">{formatDate(item.created_at)}</div>
            <div className="text-center">{item.from_group}</div>
            <div className="text-center">
              {item.from_person.split("@")[0].split("-")[0]}
            </div>
            <div className="text-center">{item.to_group}</div>
            <div className="text-center">
              {item.to_person.split("@")[0].split("-")[0]}
            </div>
            <div className="text-center">
              {`${formatToCurrency(item.cost || 0)} $`}
            </div>
            <div className="text-center">{`${item?.output_gram} gr`}</div>
            <div className="text-center">{item.description}</div>
            <div className="text-center">{`${formatToCurrency(item.cost || 0)} $`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
