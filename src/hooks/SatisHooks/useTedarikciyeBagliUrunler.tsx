"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResponseResult } from "../../types/responseTypes";
import { CustomDataListType, ProductType } from "../../types/types";
import { formatToCurrency } from "@/utils";

import Image from "next/image";
import { GetTedarikciPursahedList } from "@/Services/Supplier.Services";
import { SupplierProductHeaderType } from "@/types/Tedarikci";
import { formatTarih } from "@/utils";

export default function useTedarikciyeBagliUrunlerTable({
  tedarikciId,
}: {
  tedarikciId: number;
}) {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<SupplierProductHeaderType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const order_by = searchParams.get("order_by");
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const ResultObject = ({
    item,
  }: {
    item: ProductType;
    index: number;
  }): SupplierProductHeaderType => {
    const totalCarat =
      item?.properties?.totalCarat || item?.properties?.remaining_carat;

    const alisTarihi = formatTarih(item.buy_date as string);

    return {
      image: item?.image ? (
        <Image
          src={item.image as string}
          alt="Deneme"
          width={60}
          height={50}
          style={{ height: "auto" }}
        />
      ) : null,
      code: item?.code,
      buy_date: item.buy_date
        ? `${alisTarihi}`
        : "",
      product_cost: item?.product_cost
        ? `${formatToCurrency(Number(item.product_cost))}`
        : null,

      remaining_count: (totalCarat as number) ?? null,
      sales_price: item.total_cost ? (
        <div className="w-full text-center">
          ${`${formatToCurrency(Number(item?.total_cost))}`}
        </div>
      ) : null,
    };
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetTedarikciPursahedList({
      page: activePage,
      order_by: order_by,
      sort,
      supplier_id: tedarikciId,
    }).then((resp: ResponseResult<any>) => {
      if (resp?.success) {
        const responseResult = resp.data as CustomDataListType<ProductType>;

        const dataResult: SupplierProductHeaderType[] =
          responseResult.results.map((item: ProductType, index: number) => {
            return ResultObject({ item, index: index });
          }) || [];

        setActiveData(dataResult);
        setTotalPageCount(
          Math.ceil(
            responseResult.count /
              Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, [activePage, order_by, sort, tedarikciId]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    error,
  };
}
