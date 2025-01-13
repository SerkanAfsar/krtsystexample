"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";

import { ProductListType } from "../../types/types";
import { ResponseResult } from "../../types/responseTypes";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
import { formatToCurrency, hasDecimal } from "@/utils";
import { GetWorkOrderProductListModalService } from "@/Services/WorkOrder.Services";
import CustomModalInput from "@/components/CustomModalInput";

export default function useRenkliTasModalData({
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

  const inputAdetRefs = useRef<HTMLInputElement[]>([]);
  const inputKaratRefs = useRef<HTMLInputElement[]>([]);
  const spanMaliyetRefs = useRef<HTMLSpanElement[]>([]);

  const handleCheck = (
    e: React.FormEvent<HTMLInputElement>,
    properties: any,
    index: number,
  ) => {
    const target = e.target as HTMLInputElement;

    const {
      kesim,
      carat,
      berraklik,
      renkliTas,
      menstrual_status,
      renk,
      code,
      firstPrice,
      caratPrice
    } = properties;

    const item: SeciliUrunType = {
      pk: target.name,
      code,
      name: renkliTas,
      kesim,
      carat,
      berraklik,
      renk,
      adet: 1,
      type: renkliTas.toString().substring(0, 1),
      maliyet: `${formatToCurrency(firstPrice)} $`,
      firstPrice,
      menstrual_status,
      caratPrice,
    };

    if (target.checked) {
      inputAdetRefs.current[index].disabled =
        item?.menstrual_status == "Sertifikalı" ? true : false;
      inputAdetRefs.current[index].value = "1";

      if (inputKaratRefs.current[index]) {
        inputKaratRefs.current[index].disabled = false;
      }

      setSelectedValues((prev: SeciliUrunType[]) => [...prev, item]);
    } else {
      inputAdetRefs.current[index].value = "";
      inputAdetRefs.current[index].disabled = true;

      if (inputKaratRefs.current[index]) {
        inputKaratRefs.current[index].value = "";
        inputKaratRefs.current[index].disabled = true;
      }
      spanMaliyetRefs.current[index].textContent = "";

      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != target.name),
      );
    }
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetWorkOrderProductListModalService({
      type: "ColoredStone",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item, index) => {
          const selectedItem = selectedValues.find(
            (a) => (a.pk as string) == (item.pk as unknown),
          );

          const condition = selectedItem != null;
          const { adet, used_carat } = selectedItem || {};
          const firstMaliyet =
            item.menstrual_status == "Mixed"
            ? Number(String(item.product_cost?.pricePerCarat).replace(",", "."))
            : Number(item.total_cost);
          return {
            sec: (
              <div className="flex h-full w-full items-center justify-center">
                <input
                  className="h-4 w-4"
                  type="checkbox"
                  defaultChecked={condition}
                  name={item?.pk?.toString()}
                  onChange={(e) =>
                    handleCheck(
                      e,
                      {
                        ...item.properties,
                        code: item.code,
                        firstPrice: Number(firstMaliyet),
                        caratPrice: Number(firstMaliyet),
                      },
                      index,
                    )
                  }
                />
              </div>
            ),
            code: item.code,
            name: item?.properties?.renkliTas,
            carat: item?.properties?.carat,
            berraklik: item?.properties?.berraklik,
            renk: item?.properties?.renk,
            kesim: item?.properties?.kesim,
            adet: (
              <CustomModalInput
                name="adet"
                ref={(el) => {
                  if (el) {
                    inputAdetRefs.current[index] = el;
                  }
                }}
                item={item}
                inputAdetRefs={inputAdetRefs}
                indexNo={index}
                adetVal={adet as string}
                caratVal={used_carat as string}
                setSelectedValues={setSelectedValues}
                spanMaliyetRefs={spanMaliyetRefs}
                condition={condition}
              />
            ),
            kullanilanKarat: item.menstrual_status == "Mixed" && (
              <div className="flex items-center justify-start gap-1">
                <CustomModalInput
                  name="used_carat"
                  ref={(el) => {
                    if (el) {
                      inputKaratRefs.current[index] = el;
                    }
                  }}
                  item={item}
                  inputAdetRefs={inputAdetRefs}
                  indexNo={index}
                  adetVal={adet as string}
                  caratVal={used_carat as string}
                  setSelectedValues={setSelectedValues}
                  spanMaliyetRefs={spanMaliyetRefs}
                  condition={condition}
                />
                <span className="text-md font-bold">
                  &nbsp;/&nbsp;
                  {hasDecimal(Number(item?.properties?.remaining_carat))
                    ? Number(item?.properties?.remaining_carat).toFixed(2)
                    : item?.properties?.remaining_carat}
                </span>
              </div>
            ),
            maliyet: (
              <span
                aria-label={firstMaliyet.toString()}
                ref={(el) => {
                  if (el) {
                    spanMaliyetRefs.current[index] = el;
                  }
                }}
              >
                {item.menstrual_status != "Mixed"
                  ? `${formatToCurrency(firstMaliyet)} $`
                  : ""}
              </span>
            ),
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
