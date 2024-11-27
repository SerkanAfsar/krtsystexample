"use client";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import { GetProductDatatableService } from "@/Services/Product.Services";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType } from "../../types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { SadeListType } from "@/types/Sade";
import { RenkliTasListType } from "@/types/RenkliTas";
import { PirlantaListType } from "@/types/Pirlanta";
// import { LightgalleryItem } from "react-lightgallery";
import Image from "next/image";
import { SadeModelTurleri } from "@/data/Sade.data";
import { dolarFormat } from "@/utils";
import Link from "next/link";
import { formatDate } from "date-fns";
import { tr } from "date-fns/locale";

const InnerConvert = ({
  data,
  dataType,
  islemlerArea,
  sertifikaFunc,
}: {
  data: ProductListType;
  dataType: "Diamond" | "Simple" | "ColoredStone";
  islemlerArea: any;
  sertifikaFunc?: any;
}) => {
  switch (dataType) {
    case "ColoredStone": {
      return data.results.map((item) => {
        return {
          code: item.code,
          renkliTas: `${item?.properties?.renkliTas}`,
          carat: item?.properties?.carat,
          renk: item?.properties?.renk,
          sertifika: sertifikaFunc(item),
          kesim: item?.properties?.kesim,
          mensei: item?.properties?.mensei,
          treatment: item?.properties?.treatment,
          islemler: islemlerArea({
            id: item?.pk as number,
            productCode: item?.code,
          }),
        };
      }) as RenkliTasListType[];
    }
    case "Diamond": {
      return data.results.map((item) => {
        return {
          berraklik: item?.properties?.berraklik,
          carat: item?.properties?.carat,
          code: item?.code,
          fluorescence: item?.product_certificate?.fluorescence,
          cut: item?.properties?.kesim,
          max: item?.product_certificate?.max,
          min: item?.product_certificate?.min,
          polish: item?.product_certificate?.polish,
          proposion: item?.product_certificate?.propotion,
          sertifika: sertifikaFunc(item),
          sertifikaNo: sertifikaFunc(item),
          sertifikaTarihi: item.product_certificate?.sertifikaTarihi
            ? formatDate(
                item.product_certificate?.sertifikaTarihi as string,
                "dd MMMM yyyy",
                { locale: tr },
              )
            : null,
          renk: item?.properties?.renk,
          kesim: item?.properties?.kesim,
          symmetry: item?.product_certificate?.symmetry,
          paraportFiyatı: item?.product_cost?.rapaportPrice
            ? dolarFormat(Number(item?.product_cost?.rapaportPrice))
            : undefined,
          height: item?.product_certificate?.height,
          islemler: islemlerArea({
            id: item?.pk as number,
            productCode: item?.code,
          }),
          total_coast: item?.product_cost?.total_cost
            ? dolarFormat(Number(item?.product_cost?.total_cost))
            : undefined,
          ppc: item?.product_cost?.pricePerCarat
            ? dolarFormat(Number(item?.product_cost?.pricePerCarat))
            : undefined,
        };
      }) as PirlantaListType[];
    }
    case "Simple": {
      return data.results.map((item) => {
        return {
          resim: item.image ? (
            <Image
              src={item.image as string}
              width={40}
              height={40}
              style={{
                width: "60px",
                cursor: "pointer",
                height: "auto",
                maxHeight: "60px",
              }}
              alt={item.code as string}
            />
          ) : null,
          modelKodu: `${SadeModelTurleri.find((a) => a.titleVal == item?.properties?.modelTuru)?.extraValue}${item?.properties?.modelKodu}`,
          modelTuru: item?.properties?.modelTuru,
          code: item?.code,
          ayar: item?.properties?.ayar
            ? `${item?.properties?.ayar}K`
            : undefined,
          gram: item?.properties?.gram
            ? `${item?.properties?.gram} gr`
            : undefined,
          hasGrami: item?.properties?.hasGrami
            ? `${item?.properties?.hasGrami} gr`
            : undefined,
          iscilik: `${item?.properties?.iscilik} ${item?.properties?.cost_currency}`,
          islemler: islemlerArea({
            id: item?.pk as number,
            productCode: item?.code,
          }),
        };
      }) as SadeListType[];
    }
  }
};

export default function useGetProductData(
  type: "Diamond" | "Simple" | "ColoredStone",
  redirectUrl: string,
  sertifikaFunc?: any,
) {
  const router = useRouter();
  const params = useSearchParams();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemRef = useRef<any | null>(null);

  const order_by = params.get("order_by");
  const sort = (params.get("sort") as "asc" | "desc") || undefined;

  const updateData = useCallback(() => {
    setActiveData([]);
    GetProductDatatableService({
      order_by: order_by,
      page: activePage,
      sort,
      type,
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult = InnerConvert({
          data,
          dataType: type,
          islemlerArea,
          sertifikaFunc,
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
  }, [activePage, updateData]);

  const islemlerArea = useCallback(
    ({ id, productCode }: { id: number; productCode: string }) => {
      return (
        <div className="flex w-full items-center justify-center  gap-6">
          <Link href={`${redirectUrl}${id}`} title="Link">
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
