"use client";
import { GetProductDatatableService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ISadeType } from "../../../../../../types/formTypes";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { ProductListType } from "../../../../../../types/types";
import { SadeModelTurleri } from "@/data/Sade.data";
import { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";

import { LightgalleryItem } from "react-lightgallery";
import { DeleteProductApiService } from "@/ApiServices/Products.ApiService";
import Image from "next/image";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useGetProductData from "@/hooks/useGetProductData";
import { SadeListHeaders } from "@/types/Sade";

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
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function SadeStokListesi() {
  const { activeData, activePage, totalPageCount, setActivePage } =
    useGetProductData(
      "Simple",
      "/Admin/StokYonetimi/Sade/SadeEkle/",
      undefined,
    );

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
          columns={SadeListHeaders}
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
