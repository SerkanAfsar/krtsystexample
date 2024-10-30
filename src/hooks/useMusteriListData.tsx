import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { MusteriType } from "../types/types";

import { GetMusteriDatatableService } from "@/Services/Customer.Service";
import { DeleteMusteriApiService } from "@/ApiServices/Customer.ApiService";

export default function useMusteriListData() {
  const router = useRouter();
  const params = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<MusteriType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemRef = useRef<any | null>(null);

  const order_by = params.get("order_by");
  const sort = (params.get("sort") as "asc" | "desc") || undefined;

  const updateData = useCallback(() => {
    setActiveData([]);
    GetMusteriDatatableService({
      page: activePage,
      order_by: order_by,
      sort,
    }).then((resp: any) => {
      const { error } = resp;
      if (error) {
        setError(error[0] || "Hata");
        return;
      }

      const data = resp.data.results as MusteriType[];

      const dataOneResult: any = data.map((item) => {
        return {
          code: item.code,
          name: item.name,
          phone: item.phone,
          authorized_name: item.authorized_name,
          authorized_phone: item.authorized_phone,
          islemler: islemlerArea({
            id: item.id as number,
            productCode: item.name as string,
          }),
        };
      });
      setActiveData(dataOneResult);
      setTotalPageCount(
        Math.ceil(
          resp?.data?.count /
            Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
        ),
      );
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
            onClick={() =>
              router.push(`/Admin/Firmalar/Musteriler/MusteriEkle/${id}`)
            }
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
    [router],
  );

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  useEffect(() => {
    if (confirmDelete && itemRef && itemRef.current) {
      DeleteMusteriApiService({
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
