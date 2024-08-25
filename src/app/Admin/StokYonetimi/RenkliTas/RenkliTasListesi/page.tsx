"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import useGetProductData from "@/hooks/useGetProductData";
import { RenklitasListHeaders } from "@/types/RenkliTas";
import Link from "next/link";
import { useCallback } from "react";

export default function RenkliTasStokListesi() {
  const sertificateUrl = useCallback((item: any) => {
    if (item?.product_certificate?.sertifika == "GIA") {
      return (
        <Link
          className="underline"
          target="_blank"
          href={`https://www.gia.edu/report-check?reportno=${item?.product_certificate?.sertifikaNo}`}
        >
          {`GIA${item?.product_certificate?.sertifikaNo}`}
        </Link>
      );
    } else if (item?.product_certificate?.sertifika == "HRD") {
      return (
        <Link
          target="_blank"
          className="underline"
          href={`https://my.hrdantwerp.com/?record_number=${item?.product_certificate?.sertifikaNo}`}
        >
          {`HRD${item?.product_certificate?.sertifikaNo}`}
        </Link>
      );
    }
    return item?.product_certificate?.sertifika;
  }, []);

  const {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    setConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    item,
  } = useGetProductData(
    "ColoredStone",
    "/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/",
    sertificateUrl,
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
      <Breadcrumb pageName="Renkli Taş Stok Listesi" />
      <CustomDeleteModal
        code={item?.productCode}
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        modalTitle="Renkli Taşı Silmek İstediğinizden Emin misiniz?"
        modalDescription="Renkli Taş Kalıcı Olarak Silinecektir"
        setConfirmDelete={setConfirmDelete}
      />
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={RenklitasListHeaders}
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
