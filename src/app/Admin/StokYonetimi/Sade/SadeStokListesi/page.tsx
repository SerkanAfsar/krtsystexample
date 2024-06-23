"use client";
import {
  DeleteProductService,
  GetProductDatatableService,
} from "@/Services/Product.Services";
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
import { toast } from "react-toastify";

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
  {
    Header: "Düzenle",
    accessor: "duzenle",
  },
  {
    Header: "Sil",
    accessor: "sil",
  },
];

export default function SadeStokListesi() {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeData, setActiveData] = useState<ISadeType[] | string | null>(
    null,
  );
  const [totalPageCount, setTotalPageCount] = useState<number>(1);

  const updateData = useCallback(() => {
    setActiveData(null);
    GetProductDatatableService({
      order_by: null,
      page: activePage,
      type: "Simple",
    }).then((resp: ProductResponseType) => {
      if (resp.result) {
        const dataOneResult: any = resp.payload.results.map((item) => {
          return {
            resim: item.image ? (
              <Image
                src={item.image}
                alt="Atilla Karat"
                width={150}
                height={80}
              />
            ) : null,
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
            duzenle: duzenleButton(item),
            sil: silButton(item),
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
  }, []);

  const duzenleButton = useCallback((item: any) => {
    return (
      <Link
        className="btn rounded-md bg-yellow-600 p-3 text-white"
        href={`/Admin/StokYonetimi/Sade/SadeEkle/${item.pk}`}
      >
        Güncelle
      </Link>
    );
  }, []);

  const silButton = useCallback(
    async (item: any) => {
      const id = item.pk as Number;
      return (
        <div
          onClick={async () => {
            const result = await DeleteProductService({ id });
            if (result.result) {
              toast.success("Ürün Silindi", { position: "top-right" });
              updateData();
            } else {
              toast.error(result.message || "Hata", { position: "top-right" });
              return;
            }
          }}
          className="btn cursor-pointer rounded-md bg-danger p-3 text-center text-white"
        >
          Sil
        </div>
      );
    },
    [updateData],
  );

  useEffect(() => {
    updateData();
  }, [activePage, updateData]);

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
