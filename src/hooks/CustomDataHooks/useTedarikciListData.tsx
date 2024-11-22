import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomDataListType, TedarikciType } from "@/types/types";
import { GetTedarikciDatatableService } from "@/Services/Supplier.Services";
import { DeleteTedarikciApiService } from "@/ApiServices/Suppliers.ApiService";
import { ResponseResult } from "@/types/responseTypes";
import Link from "next/link";

export default function useTedarikciListData() {
  const router = useRouter();
  const params = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<TedarikciType[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemRef = useRef<any | null>(null);

  const order_by = params.get("order_by");
  const sort = (params.get("sort") as "asc" | "desc") || undefined;

  const updateData = useCallback(() => {
    setActiveData([]);
    GetTedarikciDatatableService({
      page: activePage,
      order_by: order_by,
      sort,
    }).then((resp: ResponseResult<CustomDataListType<TedarikciType>>) => {
      if (resp.success) {
        const data = resp.data as CustomDataListType<TedarikciType>;

        const dataOneResult: any = data.results.map((item) => {
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
  }, [activePage, order_by, sort]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const islemlerArea = useCallback(
    ({ id, productCode }: { id: number; productCode: string }) => {
      return (
        <div className="flex items-center justify-center  gap-6">
          <Link
            href={`/Admin/Firmalar/Tedarikciler/TedarikciEkle/${id}`}
            title="Link"
          >
            <FaPencil className="cursor-pointer" />
          </Link>
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
      DeleteTedarikciApiService({
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
