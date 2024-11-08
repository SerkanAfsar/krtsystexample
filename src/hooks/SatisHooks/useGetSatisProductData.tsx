"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResponseResult } from "../../types/responseTypes";
import { CustomDataListType } from "../../types/types";
import { GetSatisUrunDatatableService } from "@/Services/Satis.Services";
import { formatToCurrency, ProductTypesIntl } from "@/utils";

export default function useGetSatisProductData({
  append,
  remove,
  type = "Gem",
}: {
  append: any;
  remove: any;
  type?: any;
}) {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [error, setError] = useState<string | null>(null);

  const order_by = searchParams.get("order_by");
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const ResultObject = ({ item }: { item: any; index: number }) => {
    const isSelected = selectedIds.indexOf(Number(item.pk)) > -1;
    return {
      sec: (
        <button
          type="button"
          disabled={isSelected}
          className="flex w-[100px] items-center justify-center rounded-md bg-green-800 p-2 text-white disabled:bg-red"
          onClick={() => {
            if (selectedIds.indexOf(Number(item.pk)) == -1) {
              setSelectedIds((prev) => [...prev, Number(item.pk)]);
              append({
                product_id: Number(item.pk),
                used_carat: 0,
                total_cost: Number(item?.total_cost) || 0,
                type: ProductTypesIntl(item?.type),
                code: item?.code,
                sales_price: null,
              });
            }
          }}
        >
          {isSelected ? "Eklendi" : "Ekle"}
        </button>
      ),
      code: item?.code,
      type: ProductTypesIntl(item?.type),
      maliyet: item?.total_cost ? (
        <div className="w-full text-center">
          ${formatToCurrency(Number(item?.total_cost))}
        </div>
      ) : (
        ""
      ),
      total_cost: item?.total_cost
        ? `$${formatToCurrency(Number(item?.total_cost))}`
        : null,
    };
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetSatisUrunDatatableService({
      page: activePage,
      order_by: order_by,
      sort,
      type,
    }).then((resp: ResponseResult<any>) => {
      if (resp?.success) {
        const data = resp.data as CustomDataListType<any>;
        const dataResult: any[] = data?.results?.map(
          (item: any, index: number) => {
            return ResultObject({ item, index: index });
          },
        );

        setActiveData(dataResult);
        setTotalPageCount(
          Math.ceil(
            data?.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, [activePage, order_by, sort, selectedIds, type]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    error,
    setSelectedIds,
  };
}
