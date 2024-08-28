import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import { GetGemProductDatatableService } from "@/Services/Product.Services";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { ResponseResult } from "../../types/responseTypes";
import { ProductType } from "../../types/types";
import { useRouter } from "next/navigation";
import { MucevherListType } from "@/types/Mucevher";
import Image from "next/image";

const InnerConvert = ({
  data,
  islemlerArea,
}: {
  data: ProductType[];
  islemlerArea: any;
}) => {
  return data.map((item) => {
    return {
      resim: item.image && (
        <Image
          src={item.image as string}
          width={60}
          height={50}
          alt={item.code as string}
        />
      ),
      mucevherKodu: item?.code,
      model: item?.properties?.model,
      sade: item?.properties?.simple,
      toplamKarat: item?.properties?.totalCarat,
      toplamTasAdet: item?.properties?.totalNumberOfStones,
      toplamIscilik: `${item?.properties?.totalLaborCost} $`,
      etiketFiyati: `${item?.properties?.priceTag} $`,
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
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any>(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const itemRef = useRef<any | null>(null);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetGemProductDatatableService().then(
      (resp: ResponseResult<ProductType>) => {
        if (resp?.success) {
          const data = resp.data as ProductType[];
          const dataOneResult = InnerConvert({
            data,
            islemlerArea,
          });
          setActiveData(dataOneResult);
          setTotalPageCount(
            Math.ceil(
              data.length /
                Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
            ),
          );
        } else {
          setActiveData((resp.error && resp.error[0]) || "Hata");
        }
      },
    );
  }, []);

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

  const islemlerArea = useCallback(
    ({ id, productCode }: { id: number; productCode: string }) => {
      return (
        <div className="flex items-center justify-start  gap-6">
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
  };
}
