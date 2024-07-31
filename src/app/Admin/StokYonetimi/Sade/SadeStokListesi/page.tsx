"use client";
import {
  DeleteProductService,
  GetProductDatatableService,
} from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ISadeType } from "../../../../../../types/formTypes";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { ProductListType, ProductType } from "../../../../../../types/types";
import { SadeModelTurleri } from "@/utils/MockData";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { toast } from "react-toastify";
import { LightgalleryItem } from "react-lightgallery";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";

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
    }).then((resp: ResponseResult<ProductListType>) => {
      if (resp?.success) {
        const data = resp.data as ProductListType;
        const dataOneResult: any = data.results.map((item) => {
          return {
            resim: (
              <LightgalleryItem key={item.pk} src={item.image as string}>
                <img
                  src={item.image as string}
                  style={{ width: "auto", cursor: "pointer", height: "40px" }}
                  alt={item.code as string}
                />
              </LightgalleryItem>
            ),
            modelKodu: `${SadeModelTurleri.find((a) => a.titleVal == item?.properties?.modelTuru)?.extraValue}${item?.properties?.modelKodu}`,
            modelTuru: item?.properties?.modelTuru,
            sadeKodu: item?.code,
            ayar: item?.properties?.ayar
              ? `${item?.properties?.ayar}${item.properties?.ayar?.toString().length == 2 ? `K` : ""}`
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
            data.count / Number(process.env.NEXT_PUBLIC_DATATABLE_ITEM_COUNT),
          ),
        );
      } else {
        setActiveData((resp.error && resp.error[0]) || "Hata");
      }
    });
  }, [activePage]);

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
      const id = item.pk as number;
      return (
        <div
          onClick={async () => {
            await DeleteProductApiService({ id, callBack: updateData });
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

  if (activeData == "Hata") {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Sade Stok Listesi" />
        <div className="flex h-full w-full items-center justify-center">
          Hata.
        </div>
      </DefaultLayout>
    );
  }

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
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Yükleniyor...
        </div>
      )}
    </DefaultLayout>
  );
}
