"use client";

import { useState, useCallback, useEffect } from "react";
import { IRenkliTasType } from "../../../types/formTypes";
import { GetProductDatatableService } from "@/Services/Product.Services";
import { ProductListType } from "../../../types/types";
import { ResponseResult } from "../../../types/responseTypes";
import { SeciliUrunType } from "@/components/IsEmirleri/UrunGruplariModul";

export default function useRenkliTasModalData({
  setSelectedValues,
  selectedValues,
}: {
  setSelectedValues: any;
  selectedValues: SeciliUrunType[];
}) {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<
    IRenkliTasType[] | string | null
  >(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const handleCheck = (
    e: React.FormEvent<HTMLInputElement>,
    properties: any,
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const { kesim, carat, berraklik, renk } = properties;
      const item: SeciliUrunType = {
        pk: target.name,
        kesim,
        carat,
        berraklik,
        renk,
        adet: "0",
      };
      setSelectedValues((prev: SeciliUrunType[]) => [...prev, item]);
    } else {
      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != target.name),
      );
    }
  };

  const handleChangeAdet = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(selectedValues);
  };

  const handleChangeKarat = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
  };

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
            berraklik: item?.properties?.berraklik,
            renk: item?.properties?.renk,
            kesim: item?.properties?.kesim,
            adet: (
              <input
                type="number"
                name={`adet_${item.pk}`}
                className="block w-20 border border-primary px-2 py-1"
                onChange={(e) => console.log(selectedValues)}
              />
            ),
            kullanilanKarat: item.menstrual_status == "Mixed" && (
              <input
                type="number"
                name={`carat_${item.pk}`}
                className="block w-20 border border-primary px-2 py-1"
                onChange={handleChangeKarat}
              />
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
