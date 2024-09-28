"use client";
import { ResponseResult } from "../../../types/responseTypes";
import { ProductListType } from "../../../types/types";
import React, { useState, useCallback, useEffect } from "react";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
import { formatToCurrency } from "@/utils";
import { SadeAltinKarsiliklari } from "@/utils/Sade.Utils";

import { GetWorkOrderProductListModalService } from "@/Services/WorkOrder.Services";
import Image from "next/image";
export default function useSadeModalData({
  setSelectedValues,
  selectedValues,
}: {
  setSelectedValues: any;
  selectedValues: SeciliUrunType[];
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = (
    e: React.FormEvent<HTMLInputElement>,
    properties: any,
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const {
        code,
        altinRengi: renk,
        gram,
        hasGrami: has,
        modelTuru: model,
        ayar,
        img,
        firstPrice,
        image,
        modelTuru,
      } = properties;

      const item: SeciliUrunType = {
        pk: target.name,
        code,
        resim: img,
        renk,
        gram,
        has,
        model,
        maliyet: `${formatToCurrency(firstPrice)} $`,
        firstPrice,
        type: "Sade",
        modelTuru,
        ayar: SadeAltinKarsiliklari(ayar),
      };

      setSelectedValues((prev: SeciliUrunType[]) => [...prev, item]);
    } else {
      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != target.name),
      );
    }
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetWorkOrderProductListModalService({
      type: "Simple",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;

        const dataOneResult: any = data.results.map((item) => {
          const condition =
            selectedValues.findIndex(
              (a) => (a.pk as string) == (item.pk as unknown),
            ) > -1;

          const maliyet =
            Number(item?.properties?.hasGrami || 0) *
            Number(process.env.NEXT_PUBLIC_ALTIN_KURU);

          return {
            sec: (
              <input
                type="checkbox"
                defaultChecked={condition}
                name={item?.pk?.toString()}
                onChange={(e) =>
                  handleCheck(e, {
                    ...item.properties,
                    code: item.code,
                    firstPrice: maliyet,
                    img: item.image ?? null,
                  })
                }
              />
            ),
            resim: item.image ? (
              <Image
                src={item.image as string}
                alt={item.code as string}
                className="h-auto w-16"
                width={80}
                height={40}
              />
            ) : null,
            code: item.code,
            renk: item?.properties?.altinRengi,
            gram: item?.properties?.gram,
            has: item?.properties?.hasGrami,
            model: item?.properties?.modelTuru,
            maliyet: `${formatToCurrency(maliyet)} $`,
          };
        });
        setActiveData(dataOneResult);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError(resp.error?.at(0) || "Hata");
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
    error,
  };
}
