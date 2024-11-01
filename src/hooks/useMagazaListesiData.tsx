import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { GetMagazaDatatableService } from "@/Services/Magaza.Services";
import { MagazaType } from "@/types/Magaza";
import { DeleteMagazaApiService } from "@/ApiServices/Magaza.ApiService";

export default function useMagazaListesiData() {
  const router = useRouter();
  const params = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<MagazaType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemRef = useRef<any | null>(null);

  const order_by = params.get("order_by");
  const sort = (params.get("sort") as "asc" | "desc") || undefined;

  const updateData = useCallback(() => {
    setActiveData([]);
    GetMagazaDatatableService({
      page: activePage,
      order_by: order_by,
      sort,
    }).then((resp: any) => {
      const { error } = resp;
      if (error) {
        setError(error[0] || "Hata");
        return;
      }
      const data = resp.data.results as MagazaType[];
      const dataOneResult: any = data.map((item) => {
        return {
          name: item.name,
          phone: item.phone,
          address: item.address,
          islemler: islemlerArea({
            id: item.id as number,
            name: item.name as string,
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
    ({ id, name }: { id: number; name: string }) => {
      return (
        <div className="flex items-center justify-center  gap-6">
          <FaPencil
            className="cursor-pointer"
            onClick={() => router.push(`/Admin/Magazalar/MagazaEkle/${id}`)}
          />
          <FaTrash
            className="cursor-pointer"
            onClick={async () => {
              setShowConfirmDelete(true);
              itemRef.current = { id, name };
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
      DeleteMagazaApiService({
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
