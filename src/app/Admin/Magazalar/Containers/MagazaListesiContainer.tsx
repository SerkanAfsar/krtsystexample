"use client";
import { Column } from "react-table";
import React from "react";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";

import useMagazaListesiData from "@/hooks/useMagazaListesiData";

const columns: Column<{
  name: string;
  phone: string;
  address: string;

  islemler: React.ReactNode;
}>[] = [
  {
    Header: "Mağaza Adı",
    accessor: "name",
  },
  {
    Header: "Müşteri Telefonu",
    accessor: "phone",
  },

  {
    Header: "Müşteri Adresi",
    accessor: "address",
  },

  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function MagazaListesiContainer() {
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
  } = useMagazaListesiData();

  return (
    <>
      {error ? (
        <CustomErrorAlert title="Hata" description={error} />
      ) : (
        <>
          <CustomDeleteModal
            code={item?.productCode}
            showConfirmDelete={showConfirmDelete}
            setShowConfirmDelete={setShowConfirmDelete}
            modalTitle="Kayıtlı Mağazayı Silmek İstediğinizden Emin misiniz?"
            modalDescription="Mağaza Bilgileri Kalıcı Olarak Silinecektir."
            setConfirmDelete={setConfirmDelete}
          />
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={columns}
            data={activeData}
            activePage={activePage}
            isFirstLarge={false}
            setActivePage={setActivePage}
          />
        </>
      )}
    </>
  );
}
