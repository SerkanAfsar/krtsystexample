"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import useGetProductData from "@/hooks/CustomDataHooks/useGetProductData";
import { RenklitasListHeaders } from "@/types/RenkliTas";
import Link from "next/link";
import { useCallback, useState } from "react";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import CustomSearchModul from "@/components/CustomModals/CustomSearchModul"


export default function RenkliTasStokListesi() {
  const [extraParams, setExtraParams] = useState<any>();
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
    error,
    item,
  } = useGetProductData(
    "ColoredStone",
    "/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/",
    sertificateUrl,
    extraParams
  );

  const handleSearch = (params: any) => {
    setExtraParams(params);
  };

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

      {error ? (
        <CustomErrorAlert title="Hata" description={error} />
      ) : (
        <div>
          <CustomSearchModul onSearch={handleSearch} product={"coloredStone"}/>
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={RenklitasListHeaders}
            data={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </DefaultLayout>
  );
}
