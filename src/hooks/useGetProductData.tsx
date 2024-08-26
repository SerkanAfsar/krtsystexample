import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import { GetProductDatatableService } from "@/Services/Product.Services";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { ResponseResult } from "../../types/responseTypes";
import { ProductListType } from "../../types/types";
import { useRouter } from "next/navigation";
import { MucevherListType } from "@/types/Mucevher";
import { SadeListType } from "@/types/Sade";
import { RenkliTasListType } from "@/types/RenkliTas";
import { PirlantaListType } from "@/types/Pirlanta";
import { LightgalleryItem } from "react-lightgallery";
import Image from "next/image";
import { SadeModelTurleri } from "@/data/Sade.data";

const InnerConvert = ({
  data,
  dataType,
  islemlerArea,
  sertifikaFunc,
}: {
  data: ProductListType;
  dataType: "Diamond" | "Simple" | "Gem" | "ColoredStone";
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
          kesim: item?.properties?.kesim,
          max: item?.product_certificate?.max,
          min: item?.product_certificate?.min,
          polish: item?.product_certificate?.polish,
          proposion: item?.product_certificate?.propotion,
          sertifika: sertifikaFunc(item),
          sertifikaNo: item?.product_certificate?.sertifikaNo,
          renk: item?.properties?.renk,
          symmetry: item?.product_certificate?.symmetry,
          paraportFiyatı: undefined,
          height: item?.product_certificate?.height,
          islemler: islemlerArea({
            id: item?.pk as number,
            productCode: item?.code,
          }),
        };
      }) as PirlantaListType[];
    }
    case "Simple": {
      return data.results.map((item) => {
        return {
          resim: (
            <LightgalleryItem key={item.pk} src={item.image as string}>
              <Image
                src={item.image as string}
                width={40}
                height={40}
                style={{ width: "auto", cursor: "pointer", height: "40px" }}
                alt={item.code as string}
              />
            </LightgalleryItem>
          ),
          modelKodu: `${SadeModelTurleri.find((a) => a.titleVal == item?.properties?.modelTuru)?.extraValue}${item?.properties?.modelKodu}`,
          modelTuru: item?.properties?.modelTuru,
          sadeKodu: item?.code,
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
    case "Gem": {
      return data.results.map((item) => {
        return {
          resim: item?.image,
          mucevherKodu: item?.code,
          model: null,
          sade: null,
          toplamKarat: null,
          toplamTasAdet: null,
          toplamIscilik: null,
          etiketFiyati: null,
          tedarikci: null,
          girisTarihi: null,
          ambar: null,
          islemler: islemlerArea({
            id: item?.pk as number,
            productCode: item?.code,
          }),
        };
      }) as MucevherListType[];
    }
  }
};

export default function useGetProductData(
  type: "Diamond" | "Simple" | "ColoredStone",
  redirectUrl: string,
  sertifikaFunc?: any,
) {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<any>(null);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const itemRef = useRef<any | null>(null);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
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
        setActiveData((resp.error && resp.error[0]) || "Hata");
      }
    });
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
