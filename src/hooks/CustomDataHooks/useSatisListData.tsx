import { useCallback, useEffect, useState } from "react";

import { ResponseResult } from "@/types/responseTypes";
import { CustomDataListType } from "@/types/types";
import { GetAllSatisList } from "@/Services/Satis.Services";
import { SaleResponseType, SatisListesiHeaderType } from "@/types/Satis";
import { dolarFormat, formatDate, formatToCurrency } from "@/utils";

export default function useSatisListData({
  customer_id,
}: {
  customer_id?: number;
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<SatisListesiHeaderType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const updateData = useCallback(() => {
    setActiveData([]);
    GetAllSatisList({
      page: activePage,
      customer_id,
    }).then((resp: ResponseResult<CustomDataListType<SaleResponseType>>) => {
      if (resp.success) {
        const data = resp.data as CustomDataListType<SaleResponseType>;
        const dataOneResult: SatisListesiHeaderType[] = data.results.map(
          (item: SaleResponseType) => {
            const date = formatDate(item.created_at);
            return {
              kalan: dolarFormat(item.total_remaining_amount),
              musteri: item.customer?.name,
              odemeYontemi: Object.keys(item.payment_details)
                .map((item) => item.toLocaleUpperCase())
                .join(" , "),
              odenen: dolarFormat(item.total_paid_amount),
              satilanUrunler: null,
              toplamTutar: dolarFormat(item.total as number),
              satisTarihi: (
                <div className="flex flex-col items-start justify-start leading-6">
                  <span>{date.primary}</span>
                  <span>{date.secondary}</span>
                </div>
              ),
            };
          },
        );
        setActiveData(dataOneResult);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        if (resp.statusCode == 404) {
          setActivePage(totalPageCount > 1 ? totalPageCount - 1 : 1);
        } else {
          setError(resp?.error?.at(0) ?? "Hata");
        }
      }
    });
  }, [activePage, customer_id, totalPageCount]);

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    error,
  };
}
