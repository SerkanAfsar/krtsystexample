"use client";

import { GetProductDatatableService } from "@/Services/Product.Services";
import { ResponseResult } from "../../../types/responseTypes";
import { ProductListType } from "../../../types/types";
import React, { useState, useCallback, useEffect } from "react";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";

export default function usePirlantaModalData({
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
      const { kesim, carat, berraklik, renk, adet } = properties;
      const item: SeciliUrunType = {
        pk: target.name,
        kesim,
        carat,
        berraklik,
        renk,
        adet,
      };
      setSelectedValues((prev: SeciliUrunType[]) => [...prev, item]);
    } else {
      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != target.name),
      );
    }
  };

  const updateData = useCallback(() => {
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Diamond",
    }).then((resp: ResponseResult<ProductListType>) => {
      const data = resp.data as ProductListType;
      if (resp.success) {
        const dataOneResult: any = data.results.map((item) => {
          const condition =
            selectedValues.findIndex(
              (a) => (a.pk as string) == (item.pk as unknown),
            ) > -1;
          return {
            sec: (
              <input
                type="checkbox"
                defaultChecked={condition}
                name={item?.pk?.toString()}
                onChange={(e) => handleCheck(e, item.properties as any)}
              />
            ),
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
