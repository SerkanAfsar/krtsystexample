"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResponseResult } from "../../../types/responseTypes";
import { CustomDataListType } from "../../../types/types";
import { GetSatisUrunDatatableService } from "@/Services/Satis.Services";
import { cn, formatToCurrency, hasDecimal, ProductTypesIntl } from "@/utils";
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
  const inputPriceRefs = useRef<HTMLInputElement[]>([]);

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
      if (inputPriceRefs.current[index]) {
        inputPriceRefs.current[index].disabled = false;
      }
      setSelectedValues((prev: any[]) => [...prev, item]);
    } else {
      if (inputKaratRefs.current[index]) {
        inputKaratRefs.current[index].value = "";
        inputKaratRefs.current[index].disabled = true;
      }
      if (inputPriceRefs.current[index]) {
        inputPriceRefs.current[index].value = "";
        inputPriceRefs.current[index].disabled = true;
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
      type: ProductTypesIntl(item?.type),
      price: (
        <CustomSatisPriceInput
          condition={condition}
          product_id={item.pk as number}
          setSelectedValues={setSelectedValues}
          ref={(el) => {
            if (el) {
              inputPriceRefs.current[index] = el;
            }
          }}
          val={null}
        />
      ),

      totalCarat: item?.properties?.totalCarat || null,
      maliyet: item?.total_cost ? (
        <div className="w-full text-center">
          ${formatToCurrency(Number(item?.total_cost))}
        </div>
      ) : (
        ""
      ),
      total_cost: item?.total_cost
        ? `$${formatToCurrency(Number(item?.total_cost))}`
        : null,
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

const CustomSatisPriceInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    condition: boolean;
    setSelectedValues: any;
    val: number | null;
    product_id: number;
  }
>(
  (
    { className, condition, setSelectedValues, val, product_id, ...props },
    ref,
  ) => {
    const [value, setValue] = useState<number | null>(val);

    useEffect(() => {
      setSelectedValues((prev: SatisItemType[]) => {
        const indexNo = prev.findIndex((a) => a.product_id == product_id);
        if (indexNo > -1) {
          prev[indexNo].sales_price = Number(value);
        }
        return [...prev];
      });
    }, [value, setSelectedValues, product_id]);

    return (
      <div className="flex flex-col items-start justify-start gap-2">
        <input
          type="number"
          value={value?.toString()}
          className={cn("h-8 w-30 rounded-sm border bg-white/70 p-3")}
          {...props}
          ref={ref}
          disabled={!condition}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        {/* {isErr && <span className="text-red">Fiyat Giriniz...</span>} */}
      </div>
    );
  },
);

CustomSatisPriceInput.displayName = "CustomSatisPriceInput";
