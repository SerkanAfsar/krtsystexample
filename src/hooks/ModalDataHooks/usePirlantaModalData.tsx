"use client";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType, ProductType } from "../../types/types";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
import { formatToCurrency, hasDecimal } from "@/utils";
import { GetWorkOrderProductListModalService } from "@/Services/WorkOrder.Services";
import CustomModalInput from "@/components/CustomModalInput";

export default function usePirlantaModalData({
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
      renk,
      firstPrice,
      code,
      menstrual_status,
    } = properties;
    const item: SeciliUrunType = {
      pk: target.name,
      code,
      kesim,
      carat,
      berraklik,
      renk,
      adet: 1,
      maliyet: `${formatToCurrency(firstPrice)} $`,
      firstPrice,
      menstrual_status,
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

  const ResultObject = ({
    item,
    index,
  }: {
    item: ProductType;
    index: number;
  }) => {
    const selectedItem = selectedValues.find(
      (a) => (a.pk as string) == (item.pk as unknown),
    );
    const condition = selectedItem != null;
    const { adet, used_carat } = selectedItem || {};

    const firstMaliyet =
      item.menstrual_status == "Mixed"
        ? Number(item.product_cost?.pricePerCarat)
        : Number(item.total_cost);

    return {
      sec: (
        <input
          type="checkbox"
          defaultChecked={condition}
          name={item?.pk?.toString()}
          onChange={(e) =>
            handleCheck(
              e,
              {
                ...item.properties,
                firstPrice: Number(firstMaliyet),
                code: item.code,
              },
              index,
            )
          }
        />
      ),
      code: item?.code,
      carat: item?.properties?.carat,
      kesim: item?.properties?.kesim,
      renk: item?.properties?.renk,
      berraklik: item?.properties?.berraklik,
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
          val={adet as string}
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
            val={used_carat as string}
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
          aria-label={firstMaliyet?.toFixed(2)}
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
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetWorkOrderProductListModalService({
      type: "Diamond",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataResult: any = data.results.map((item, index) => {
          return ResultObject({ item: item, index: index });
        });
        setActiveData(dataResult);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError(resp.error?.at(0) || "Hata");
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
    error,
  };
}
