"use client";
import { ResponseResult } from "../../../types/responseTypes";
import { ProductListType } from "../../../types/types";
import React, { useState, useCallback, useEffect } from "react";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
import {
  formatToCurrency,
  SadeAltinKarsiliklari,
  SadeModelTurleriData,
} from "@/utils";
import { GetWorkOrderProductListModalService } from "@/Services/WorkOrder.Services";
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
        maliyet,
        modelTuru,
      } = properties;

      const item: SeciliUrunType = {
        pk: target.name,
        code,
        renk,
        gram,
        has,
        model,
        maliyet: `${formatToCurrency(maliyet)} $`,
        type: "Sade",
        modelTuru:
          SadeModelTurleriData.find(
            (a) => a.titleVal == modelTuru,
          )?.extraValue?.substring(0, 1) || "Not Exists",
        ayar: SadeAltinKarsiliklari(ayar),
        maliyetPrice: maliyet,
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
                    maliyet,
                  })
                }
              />
            ),
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
