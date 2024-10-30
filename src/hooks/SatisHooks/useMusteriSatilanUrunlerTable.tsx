"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResponseResult } from "../../types/responseTypes";
import { CustomerPurchatedProducts } from "../../types/types";
import { formatToCurrency } from "@/utils";
import { GetCustomerPursahedList } from "@/Services/Customer.Service";

import Image from "next/image";

export default function useMusteriSatilanUrunlerTable({
  customerId,
}: {
  customerId: number;
}) {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const order_by = searchParams.get("order_by");
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const ResultObject = ({ item }: { item: any; index: number }): any => {
    const totalCarat =
      item?.product?.properties?.totalCarat ||
      item?.product?.properties?.remaining_carat;

    return {
      image: item?.product?.image ? (
        <Image
          src={item.product.image}
          alt="Deneme"
          width={60}
          height={50}
          style={{ height: "auto" }}
        />
      ) : null,
      code: item?.product?.code,
      saleDate: null,
      product_cost: item?.product?.product_cost
        ? `${formatToCurrency(Number(item.product?.product_cost))}`
        : null,
      quantity: null,
      remaining_count: totalCarat,
      sales_price: item?.sales_price ? (
        <div className="w-full text-center">
          ${`${formatToCurrency(Number(item?.sales_price))}`}
        </div>
      ) : null,
    };
  };

  const updateData = useCallback(() => {
    setActiveData([]);
    GetCustomerPursahedList({
      page: activePage,
      order_by: order_by,
      sort,
      customerId,
    }).then((resp: ResponseResult<any>) => {
      if (resp?.success) {
        const data = resp.data.results as CustomerPurchatedProducts[];
        const dataResult: any[] =
          data[0]?.purchased_products?.map((item: any, index: number) => {
            return ResultObject({ item, index: index });
          }) || [];
        setActiveData(dataResult);
        setTotalPageCount(
          Math.ceil(
            data[0]?.purchased_products?.length ||
              0 / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setError((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, [activePage, order_by, sort, customerId]);

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
