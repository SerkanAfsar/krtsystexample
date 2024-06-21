"use client";
import { GetProductDatatableService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ISadeType } from "@/types/formTypes";
import { ProductResponseType } from "@/types/responseTypes";
import { SadeModelTurleri } from "@/utils/MockData";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";

interface Diamond {
  code?: string;
  kesim?: string;
  carat?: string;
  sertifika?: string;
  renk?: string;
  berraklik?: string;
  proposion?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  min?: string;
  max?: string;
  height?: string;
  sertifikaNo?: string;
  paraportFiyatı?: string;
  resim?: string;
}

const columns: Column<ISadeType>[] = [
  {
    Header: "Resim",
    accessor: "resim",
  },
  {
    Header: "Sade Kodu",
    accessor: "sadeKodu",
  },
  {
    Header: "Model Kodu",
    accessor: "modelKodu",
  },
  {
    Header: "Model Türü",
    accessor: "modelTuru",
  },
  {
    Header: "Altın Ayarı",
    accessor: "ayar",
  },
  {
    Header: "Sade Gramı",
    accessor: "gram",
  },
  {
    Header: "Has Gramı",
    accessor: "hasGrami",
  },
  {
    Header: "İşçilik",
    accessor: "iscilik",
  },
];

export default function SadeStokListesi() {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<ISadeType[] | string | null>(
    null,
  );
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const removeUrl = (url: string) => {
    console.log(url);
    if (url) {
      return url.replace("http://20.199.86.103/images/https%3A/", "https://");
    }
    return undefined;
  };

  useEffect(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Simple",
    }).then((resp: ProductResponseType) => {
      if (resp.result) {
        const dataOneResult: any = resp.payload.results.map((item) => {
          const imgUrl = removeUrl(item.image);
          return {
            resim: imgUrl ? (
              <Image src={imgUrl} alt="Atilla Karat" width={150} height={80} />
            ) : undefined,
            modelKodu: `${SadeModelTurleri.find((a) => a.titleVal == item.properties.modelTuru)?.extraValue}${item?.properties?.modelKodu}`,
            modelTuru: item?.properties?.modelTuru,
            sadeKodu: item?.code,
            ayar: item?.properties?.ayar
              ? `${item?.properties?.ayar}${item.properties.ayar.length == 2 ? `K` : ""}`
              : undefined,
            gram: item?.properties?.gram
              ? `${item?.properties?.gram} gr`
              : undefined,
            hasGrami: item?.properties?.hasGrami
              ? `${item?.properties?.hasGrami} gr`
              : undefined,
            iscilik: `${item?.properties?.iscilik} ${item?.properties?.cost_currency}`,
          };
        });
        setActiveData(dataOneResult);
        setTotalPageCount(
          Math.ceil(
            resp.payload.count /
              Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setActiveData(resp.message || "Hata");
      }
    });
  }, [activePage]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Stok Listesi" />
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={columns}
          dataOne={activeData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      ) : activeData == "Hata" ? (
        <div className="flex h-full w-full items-center justify-center">
          Hata.
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Yükleniyor...
        </div>
      )}
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
