"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import Link from "next/link";
import { useCallback } from "react";

import useGetProductData from "@/hooks/useGetProductData";
import { PirlantaListHeaders } from "@/types/Pirlanta";

export default function PirlantaListesi() {
  const sertificateUrl = useCallback((item: any) => {
    if (item?.product_certificate?.sertifika == "GIA") {
      return (
        <Link
          target="_blank"
          href={`https://www.gia.edu/report-check?reportno=${item?.product_certificate?.sertifikaNo}`}
        >
          GIA
        </Link>
      );
    } else if (item?.product_certificate?.sertifika == "HRD") {
      return (
        <Link
          target="_blank"
          href={`https://my.hrdantwerp.com/?record_number=${item?.product_certificate?.sertifikaNo}`}
        >
          HRD
        </Link>
      );
    }
    return item?.product_certificate?.sertifika;
  }, []);

  const { activeData, activePage, totalPageCount, setActivePage } =
    useGetProductData(
      "Diamond",
      "/Admin/StokYonetimi/Pirlanta/PirlantaEkle/",
      sertificateUrl,
    );

  if (activeData == "Hata") {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Pırlanta Stok Listesi" />
        <div className="flex h-full w-full items-center justify-center">
          Hata.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pırlanta Stok Listesi" />
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={PirlantaListHeaders}
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
