"use client";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import { GetGemProductDatatableService } from "@/Services/Product.Services";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType, ProductType } from "../../types/types";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import { MucevherListType } from "@/types/Mucevher";
import { dolarFormat } from "@/utils";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";

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
  const [selectedItemsforPrint, setSelectedItemsForPrint] = useState<
    ProductType[]
  >([]);

  const InnerConvert = ({
    data,
    islemlerArea,
  }: {
    data: ProductListType;
    islemlerArea: any;
  }) => {
    return data.results.map((item) => {
      const condition = selectedItemsforPrint.some((a) => a.pk == item.pk);

      return {
        checkBox: (
          <input
            type="checkbox"
            onChange={(e) => handleCheck(e, item)}
            defaultChecked={condition}
            name={item?.pk?.toString()}
          />
        ),
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
        totalLaborCost: dolarFormat(item?.properties?.totalLaborCost as number),
        priceTag: dolarFormat(item?.properties?.priceTag as number),
        tedarikci: null,
        girisTarihi: item?.properties?.productionDate,
        ambar: item?.store?.name || null,
        islemler: islemlerArea({
          id: item?.pk as number,
          productCode: item?.code,
        }),
      };
    }) as MucevherListType[];
  };

  const order_by = searchParams.get("order_by");
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const handleCheck = (
    e: React.FormEvent<HTMLInputElement>,
    item: ProductType,
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      setSelectedItemsForPrint((prev: ProductType[]) => [...prev, item]);
    } else {
      setSelectedItemsForPrint((prev: ProductType[]) =>
        prev.filter((a) => a.pk != item.pk),
      );
    }
  };

  const { user } = useUserStore();

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
        if (resp.statusCode == 404) {
          setActivePage(totalPageCount > 1 ? totalPageCount - 1 : 1);
        } else {
          setError(resp?.error?.at(0) ?? "Hata");
        }
      }
    });
  }, [activePage, order_by, sort, totalPageCount]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const islemlerArea = useCallback(
    ({ id, productCode }: { id: number; productCode: string }) => {
      return (
        <div className="flex items-center justify-center  gap-6">
          <Link href={`${redirectUrl}${id}`} title="Link">
            <FaPencil className="cursor-pointer" />
          </Link>
          {user?.groups.some((a) => a.name == "Üretim Müdürü") && (
            <FaTrash
              className="cursor-pointer"
              onClick={async () => {
                setShowConfirmDelete(true);
                itemRef.current = { id, productCode };
              }}
            />
          )}
        </div>
      );
    },
    [router, redirectUrl, user],
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
    selectedItemsforPrint,
  };
}
