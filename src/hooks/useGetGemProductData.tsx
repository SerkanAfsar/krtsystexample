"use client";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import { GetGemProductDatatableService } from "@/Services/Product.Services";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { ResponseResult } from "../types/responseTypes";
import { ProductListType } from "../types/types";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import { MucevherListType } from "@/types/Mucevher";

const InnerConvert = ({
  data,
  islemlerArea,
}: {
  data: ProductListType;
  islemlerArea: any;
}) => {
  return data.results.map((item) => {
    return {
      resim: item.image && (
        <Image
          src={item.image as string}
          width={60}
          height={50}
          alt={item.code as string}
        />
      ),
      code: item?.code,
      model: item?.properties?.model,
      sade: item?.properties?.simple,
      totalCarat: item?.properties?.totalCarat,
      totalNumberOfStones: item?.properties?.totalNumberOfStones,
      totalLaborCost: `${item?.properties?.totalLaborCost} $`,
      priceTag: `${item?.properties?.priceTag} $`,
      tedarikci: null,
      girisTarihi: item?.properties?.productionDate,
      ambar: null,
      islemler: islemlerArea({
        id: item?.pk as number,
        productCode: item?.code,
      }),
    };
  }) as MucevherListType[];
};

export default function useGemProductData(redirectUrl: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemRef = useRef<any | null>(null);

  const order_by = searchParams.get("order_by");
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const updateData = useCallback(() => {
    setActiveData([]);
    GetGemProductDatatableService({
      page: activePage,
      order_by: order_by,
      sort,
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult = InnerConvert({
          data,
          islemlerArea,
        });
        setActiveData(dataOneResult);
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

  const islemlerArea = useCallback(
    ({ id, productCode }: { id: number; productCode: string }) => {
      return (
        <div className="flex items-center justify-center  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={() => router.push(`${redirectUrl}${id}`)}
          />
          <FaTrash
            className="cursor-pointer"
            onClick={async () => {
              setShowConfirmDelete(true);
              itemRef.current = { id, productCode };
            }}
          />
        </div>
      );
    },
    [router, redirectUrl],
  );

  useEffect(() => {
    if (confirmDelete && itemRef && itemRef.current) {
      DeleteProductApiService({
        id: itemRef.current.id as number,
        callBack: updateData,
      });
      setConfirmDelete(false);
      setShowConfirmDelete(false);
      itemRef.current = null;
    } else {
      itemRef.current = null;
    }
  }, [confirmDelete, updateData]);

  return {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    confirmDelete,
    setConfirmDelete,
    setShowConfirmDelete,
    showConfirmDelete,
    item: itemRef.current,
    error,
  };
}
