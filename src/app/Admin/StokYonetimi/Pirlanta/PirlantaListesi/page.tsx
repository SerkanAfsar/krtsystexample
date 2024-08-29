"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useCallback, useState } from "react";
import useGetProductData from "@/hooks/useGetProductData";
import { PirlantaListHeaders } from "@/types/Pirlanta";

import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";

export default function PirlantaListesi() {
  const [activePage, setActivePage] = useState<number>(1);
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

    totalPageCount,

    setConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    item,
  } = useGetProductData(
    "Diamond",
    "/Admin/StokYonetimi/Pirlanta/PirlantaEkle/",
    sertificateUrl,
    activePage,
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
      <CustomDeleteModal
        code={item?.productCode}
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        modalTitle="Pırlantayı Silmek İstediğinizden Emin misiniz?"
        modalDescription="Pırlanta Kalıcı Olarak Silinecektir"
        setConfirmDelete={setConfirmDelete}
      />
      {activeData ? (
        <>
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={PirlantaListHeaders}
            dataOne={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Yükleniyor...
        </div>
      )}
    </DefaultLayout>
  );
}
