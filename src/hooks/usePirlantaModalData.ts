"use client";

import { GetProductDatatableService } from "@/Services/Product.Services";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType } from "../../types/types";
import { useState, useCallback, useEffect } from "react";

export default function usePirlantaModalData() {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any | string | null>(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const updateData = useCallback(() => {
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Diamond",
    }).then((resp: ResponseResult<ProductListType>) => {
      const data = resp.data as ProductListType;
      if (resp.success) {
        const dataOneResult: any = data.results.map((item) => {
          return {
            carat: item?.properties?.carat,
            kesim: item?.properties?.kesim,
            renk: item?.properties?.renk,
            berraklik: item?.properties?.berraklik,
          };
        });
        setActiveData(dataOneResult);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setActiveData((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  return {
    activePage,
    setActivePage,
    activeData,
    totalPageCount,
  };
}
