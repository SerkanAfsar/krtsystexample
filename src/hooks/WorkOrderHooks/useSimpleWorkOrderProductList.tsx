"use client";

import { useCallback, useEffect, useState } from "react";

import { GetSimpleWorkOrderProductList } from "@/Services/WorkOrder.Services";
import { useSearchParams } from "next/navigation";
import { ResponseResult } from "../../../types/responseTypes";
import { ProductListType, ProductType } from "../../../types/types";
import { formatToCurrency, ProductTypesIntl } from "@/utils";

export default function useSimpleWorkOrderProductList({
  work_order_id,
}: {
  work_order_id: number;
}) {
  const params = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const [error, setError] = useState<string | null>(null);

  const order_by = params.get("order_by");
  const sort = (params.get("sort") as "asc" | "desc") || undefined;

  type ProductResultType = {
    product: ProductType;
    quantity: number;
    used_carat: number;
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetSimpleWorkOrderProductList({
      work_order_id,
      order_by: order_by,
      page: activePage,
      sort,
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;

        const dataResult = data.results as ProductResultType[];

        const result = dataResult.map((item: ProductResultType) => {
          return {
            pk: item.product.pk,
            code: item.product.code,
            type_tr: ProductTypesIntl(item.product.type || "Diamond"),
            price: (
              <div className="w-full text-center font-bold text-[#000]">
                {formatToCurrency(Number(item.product.total_cost))} $
              </div>
            ),
            quantity: item.quantity,
            used_carat: item.used_carat,
          };
        });
        setActiveData(result);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError(resp?.error?.at(0) ?? "Hata");
      }
    });
  }, [activePage, order_by, sort, work_order_id]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    error,
  };
}
