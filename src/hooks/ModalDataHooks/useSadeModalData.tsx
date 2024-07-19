"use client";

import { GetProductDatatableService } from "@/Services/Product.Services";
import { ResponseResult } from "../../../types/responseTypes";
import { ProductListType } from "../../../types/types";
import React, { useState, useCallback, useEffect } from "react";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
export default function useSadeModalData({
  setSelectedValues,
  selectedValues,
}: {
  setSelectedValues: any;
  selectedValues: SeciliUrunType[];
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any | string | null>(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const handleCheck = (
    e: React.FormEvent<HTMLInputElement>,
    properties: any,
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const { maden, renk, gram, has, model } = properties;
      const item: SeciliUrunType = {
        pk: target.name,
        maden,
        renk,
        gram,
        has,
        model,
      };
      setSelectedValues((prev: SeciliUrunType[]) => [...prev, item]);
    } else {
      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != target.name),
      );
    }
  };

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Simple",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item) => {
          const condition =
            selectedValues.findIndex(
              (a) => (a.pk as string) == (item.pk as unknown),
            ) > -1;

          console.log(item);
          return {
            sec: (
              <input
                type="checkbox"
                defaultChecked={condition}
                name={item?.pk?.toString()}
                onChange={(e) => handleCheck(e, item.properties as any)}
              />
            ),
            maden: item?.properties?.maden,
            renk: item?.properties?.altinRengi,
            gram: item?.properties?.gram,
            has: item?.properties?.hasGrami,
            model: item?.properties?.modelTuru,
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
