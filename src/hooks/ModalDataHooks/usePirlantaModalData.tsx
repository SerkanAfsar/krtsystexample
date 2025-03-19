"use client";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType, ProductType } from "../../types/types";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";
import { formatToCurrency } from "@/utils";
import { GetWorkOrderProductListModalService } from "@/Services/WorkOrder.Services";
import CustomModalInput from "@/components/CustomModalInput";

export default function usePirlantaModalData({
  setSelectedValues,
  selectedValues,
  isDuzenleContainer,
  extraParams
}: {
  setSelectedValues: any;
  selectedValues: SeciliUrunType[];
  isDuzenleContainer: boolean;
  extraParams: any;
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
      caratPrice
    } = properties;
    const item: SeciliUrunType = {
      pk: target.name,
      code,
      kesim,
      carat,
      berraklik: properties.berraklik == "None"
        ? properties.berraklik
        : properties.berraklik2
        ? `${properties.berraklik}-${properties.berraklik2}`
        : properties.berraklik,
      renk: (properties.renk == "BLACK" || properties.renk.includes("FANCY"))
        ? properties.renk
        : properties.renk2
        ? `${properties.renk}-${properties.renk2}`
        : properties.renk,
      adet: 1,
      maliyet: `${formatToCurrency(firstPrice)} $`,
      firstPrice,
      menstrual_status,
      caratPrice,
      remaining_carat: properties.remaining_carat || undefined, 
    };

    if (target.checked) {

      if (isDuzenleContainer) {
        item.fiyat = item.maliyet; 
        item.nerede = "Pırlanta Kasa"; 
        item.status = "Rezervli"; 
      }
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
    const condition = selectedItem != null && 
        selectedItem?.status === "Rezervli"
    const { adet, used_carat } = selectedItem || {};
    const firstMaliyet =
      item.menstrual_status == "Mixed"
      ? Number(String(item.product_cost?.pricePerCarat).replace(",", ".")) * 1.1
      : Number(item.total_cost);

    const berraklik =
      item?.properties?.berraklik == "None"
        ? item?.properties?.berraklik
        : item?.properties?.berraklik2
        ? `${item?.properties?.berraklik}-${item?.properties?.berraklik2}`
        : item?.properties?.berraklik;
    
    const renk =
      item?.properties?.renk == "BLACK" || String(item?.properties?.renk).includes("FANCY")
        ? item?.properties?.renk
        : item?.properties?.renk2
        ? `${item?.properties?.renk}-${item?.properties?.renk2}`
        : item?.properties?.renk;
    
    return {
      sec: (
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="checkbox"
            defaultChecked={selectedItem != null }
            name={item?.pk?.toString()}
            className="h-4 w-4"
            onChange={(e) =>
              handleCheck(
                e,
                {
                  ...item.properties,
                  firstPrice: Number(firstMaliyet),
                  caratPrice: Number(String(item.product_cost?.pricePerCarat).replace(",", ".")),
                  code: item.code,
                },
                index,
              )
            }
          />
        </div>
      ),
      code: (
        <span className="text-blue-500 underline cursor-pointer">
          <a
            href={`/Admin/StokYonetimi/Pirlanta/PirlantaEkle/${item.pk}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item?.code}
          </a>
        </span>
      ),
      carat: item?.properties?.carat,
      kesim: item?.properties?.kesim,
      renk: renk,
      berraklik: berraklik,
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
            {Number(item?.properties?.remaining_carat).toFixed(2)}
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
    //model:null eklenecek
    GetWorkOrderProductListModalService({
      type: "Diamond",
      page: activePage,
      extraParams: extraParams
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
  }, [activePage, extraParams]);

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
