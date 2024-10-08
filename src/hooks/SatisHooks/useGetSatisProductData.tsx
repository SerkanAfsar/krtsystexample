"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResponseResult } from "../../../types/responseTypes";
import { CustomDataListType } from "../../../types/types";
import { GetSatisUrunDatatableService } from "@/Services/Satis.Services";
import { cn, formatToCurrency, hasDecimal } from "@/utils";
import { SatisItemType } from "@/app/Admin/Satislar/SatisEkle/page";

export default function useGetSatisProductData({
  setSelectedValues,
  selectedValues,
}: {
  setSelectedValues: any;
  selectedValues: SatisItemType[] | null;
}) {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputKaratRefs = useRef<HTMLInputElement[]>([]);

  const handleCheck = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    const item: any = {
      product_id: Number(target.name),
      used_carat: 0,
    };

    if (target.checked) {
      if (inputKaratRefs.current[index]) {
        inputKaratRefs.current[index].disabled = false;
      }
      setSelectedValues((prev: any[]) => [...prev, item]);
    } else {
      if (inputKaratRefs.current[index]) {
        inputKaratRefs.current[index].value = "";
        inputKaratRefs.current[index].disabled = true;
      }

      setSelectedValues((prev: any[]) =>
        prev.filter((a) => a.product_id != target.name),
      );
    }
  };

  const order_by = searchParams.get("order_by");
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const ResultObject = ({ item, index }: { item: any; index: number }) => {
    const selectedItem = selectedValues?.find(
      (a) => (a.product_id as number) == (item.pk as unknown),
    );

    const condition = selectedItem != null;
    const { used_carat } = selectedItem || {};

    const totalCarat =
      item?.properties?.totalCarat || item?.properties?.remaining_carat;

    return {
      sec: (
        <input
          type="checkbox"
          defaultChecked={condition}
          name={item?.pk?.toString()}
          onChange={(e) => handleCheck(e, index)}
        />
      ),
      code: item?.code,
      type: item?.type,
      totalCarat: item?.properties?.totalCarat || null,
      maliyet: item?.total_cost ? (
        <div className="w-full text-center">
          ${formatToCurrency(Number(item?.total_cost))}
        </div>
      ) : (
        ""
      ),
      total_cost: item?.total_cost,
      kullanilanKarat: item?.menstrual_status == "Mixed" && (
        <CustomSatisInput
          condition={condition}
          product_id={item.pk as number}
          setSelectedValues={setSelectedValues}
          totalCarat={totalCarat}
          ref={(el) => {
            if (el) {
              inputKaratRefs.current[index] = el;
            }
          }}
          val={String(used_carat)}
        />
      ),
    };
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetSatisUrunDatatableService({
      page: activePage,
      order_by: order_by,
      sort,
    }).then((resp: ResponseResult<any>) => {
      if (resp?.success) {
        const data = resp.data as CustomDataListType<any>;

        const dataResult: any[] = data.results.map(
          (item: any, index: number) => {
            return ResultObject({ item, index: index });
          },
        );
        setActiveData(dataResult);
        setTotalPageCount(
          Math.ceil(
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, [activePage, order_by, sort]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    confirmDelete,
    setConfirmDelete,
    setShowConfirmDelete,
    showConfirmDelete,
    error,
  };
}

const CustomSatisInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    condition: boolean;
    totalCarat: number;
    setSelectedValues: any;
    val: string;
    product_id: number;
  }
>(
  (
    {
      className,
      val,
      product_id,
      condition,
      setSelectedValues,
      totalCarat,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(val);

    useEffect(() => {
      setSelectedValues((prev: SatisItemType[]) => {
        const indexNo = prev.findIndex((a) => a.product_id == product_id);
        if (indexNo > -1) {
          prev[indexNo].used_carat = Number(value);
        }
        return [...prev];
      });
    }, [value, setSelectedValues, product_id]);

    return (
      <div className="flex items-center justify-start gap-1">
        <input
          ref={ref}
          type="number"
          {...props}
          className={cn(
            "flex max-w-20 items-center justify-center rounded-md border px-3 py-2 text-center",
            className,
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!condition}
        />
        <span className="text-md font-bold">
          &nbsp;/&nbsp;
          {hasDecimal(Number(totalCarat))
            ? Number(totalCarat).toFixed(2)
            : totalCarat}
        </span>
      </div>
    );
  },
);

CustomSatisInput.displayName = "CustomSatisInput";
