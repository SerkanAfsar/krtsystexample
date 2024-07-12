"use client";

import { useState, useCallback, useEffect } from "react";
import { IRenkliTasType } from "../../types/formTypes";
import { GetProductDatatableService } from "@/Services/Product.Services";
import { ProductListType } from "../../types/types";
import { ResponseResult } from "../../types/responseTypes";

export default function useRenkliTasModalData() {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<
    IRenkliTasType[] | string | null
  >(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "ColoredStone",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item) => {
          return {
            carat: item?.properties?.carat,
            berraklik: item?.properties?.berraklik,
            renk: item?.properties?.renk,
            kesim: item?.properties?.kesim,
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
  }, [activePage]);

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
