"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";

import { GetProductDatatableService } from "@/Services/Product.Services";
import { ProductListType, ProductType } from "../../../types/types";
import { ResponseResult } from "../../../types/responseTypes";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
import { formatToCurrency } from "@/utils";
import { GetWorkOrderProductListModalService } from "@/Services/WorkOrder.Services";

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

  const inputAdetRefs = useRef<HTMLInputElement[]>([]);
  const inputKaratRefs = useRef<HTMLInputElement[]>([]);
  const spanMaliyetRefs = useRef<HTMLSpanElement[]>([]);

  const handleCheck = (
    e: React.FormEvent<HTMLInputElement>,
    properties: any,
    index: number,
  ) => {
    const target = e.target as HTMLInputElement;

    const { kesim, carat, berraklik, renk, code, adet, maliyet } = properties;
    const item: SeciliUrunType = {
      pk: target.name,
      code,
      kesim,
      carat,
      berraklik,
      renk,
      adet,
      maliyet: `${formatToCurrency(maliyet)} $`,
      maliyetPrice: maliyet,
    };

    if (target.checked) {
      inputAdetRefs.current[index].disabled = false;
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

        spanMaliyetRefs.current[index].textContent =
          `${formatToCurrency(maliyet)} $`;
      }

      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != target.name),
      );
    }
  };

  const updateData = useCallback(() => {
    setActiveData(null);
    GetWorkOrderProductListModalService({
      type: "ColoredStone",
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item, index) => {
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
                      code: item.code,
                      maliyet: firstMaliyet,
                    },
                    index,
                  )
                }
              />
            ),
            code: item.code,
            carat: item?.properties?.carat,
            berraklik: item?.properties?.berraklik,
            renk: item?.properties?.renk,
            kesim: item?.properties?.kesim,
            adet: (
              <CustomHtmlValue
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
                <CustomHtmlValue
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
                  &nbsp;/&nbsp;{item?.properties?.remaining_carat}
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

export type CustomProps = React.HTMLAttributes<HTMLInputElement> & {
  setSelectedValues: any;
  item: ProductType;
  inputAdetRefs: any;
  spanMaliyetRefs: any;
  indexNo: number;
  val: string;
  name: string;
  condition: boolean;
};

const CustomHtmlValue = React.forwardRef<HTMLInputElement, CustomProps>(
  (
    {
      setSelectedValues,
      item,
      inputAdetRefs,
      spanMaliyetRefs,
      name,
      indexNo,
      val,
      condition,
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(val);

    useEffect(() => {
      setSelectedValues((prev: SeciliUrunType[]) => {
        const index = prev.findIndex((a) => a.pk == Number(item.pk));

        if (index > -1) {
          const spanRef = spanMaliyetRefs.current[indexNo];
          let maliyet = Number(spanRef.ariaLabel);
          if (name == "used_carat") {
            maliyet =
              value && item.menstrual_status == "Mixed"
                ? Number(maliyet * Number(value))
                : maliyet;
            spanRef.textContent = `${formatToCurrency(maliyet)} $`;
          }

          prev[index] = {
            ...prev[index],
            [name]: value,
            maliyet: `${formatToCurrency(maliyet)} $`,
            maliyetPrice: maliyet,
          };
        }
        return [...prev];
      });
    }, [value, item.pk, name, setSelectedValues, spanMaliyetRefs, indexNo]);
    return (
      <input
        type="number"
        name={`${name}_${item.pk}`}
        ref={ref}
        disabled={!condition}
        className="block w-20 border border-primary px-2 py-1"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        {...rest}
      />
    );
  },
);
CustomHtmlValue.displayName = "CustomHtmlValue";
