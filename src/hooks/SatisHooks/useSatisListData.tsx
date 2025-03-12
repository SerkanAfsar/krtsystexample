import { useCallback, useEffect, useState } from "react";

import { ResponseResult } from "@/types/responseTypes";
import { CustomDataListType } from "@/types/types";
import { GetAllSatisList } from "@/Services/Satis.Services";
import { SaleResponseType, SatisListesiHeaderType } from "@/types/Satis";
import { dolarFormat, formatTarih } from "@/utils";
import { FaPencil } from "react-icons/fa6";
import Link from "next/link";

export default function useSatisListData({
  customer_id,
  redirectUrl,
}: {
  customer_id?: number;
  redirectUrl: string;
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<SatisListesiHeaderType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const islemlerArea = useCallback(
    ({ id }: { id: number }) => {
      return (
        <div className="flex w-full items-center justify-center  gap-6">
          <Link href={`${redirectUrl}${id}`} title="Link">
            <FaPencil className="cursor-pointer" />
          </Link>
          {/* <FaTrash
            className="cursor-pointer"
            onClick={async () => {
              setShowConfirmDelete(true);
              itemRef.current = { id, productCode };
            }}
          /> */}
        </div>
      );
    },
    [redirectUrl],
  );

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
            const createdAtDate = formatTarih(item.created_at);
            const updatedAtDate = formatTarih(item.updated_at);
            return {
              satisId: (
                <div className="flex w-full items-center justify-center">
                  {Number(item.id)}
                </div>
              ),

              sonAlinanOdemeTarihi: (
                <div className="flex flex-col items-start justify-start leading-6">
                  <span>{updatedAtDate}</span>
                </div>
              ),
              kalan: dolarFormat(item.total_remaining_amount),
              musteri: item.customer?.name,
              odemeYontemi: Object.keys(item.payment_details)
                .map((item) => item.toLocaleUpperCase())
                .join(" , "),
              odenen: dolarFormat(item.total_paid_amount),
              satilanUrunler: item.products
                .map((product) => product.code)
                .join(" , "),
              toplamTutar: dolarFormat(item.total as number),
              satisTarihi: (
                <div className="flex flex-col items-start justify-start leading-6">
                  <span>{createdAtDate}</span>
                </div>
              ),
              islemler: islemlerArea({ id: item.id as number }),
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
