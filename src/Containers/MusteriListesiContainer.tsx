"use client";
import { Column } from "react-table";
import React from "react";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import useMusteriListData from "@/hooks/CustomDataHooks/useMusteriListData";

const columns: Column<{
  code: string;
  name: string;
  phone: string;
  authorized_name: string;
  authorized_phone: string;
  islem: string;
  islemler: React.ReactNode;
}>[] = [
  {
    Header: "Müşteri Kodu",
    accessor: "code",
  },
  {
    Header: "Müşteri Adı",
    accessor: "name",
  },

  {
    Header: "Müşteri Telefon",
    accessor: "phone",
  },
  {
    Header: "Yetkili",
    accessor: "authorized_name",
  },
  {
    Header: "Yetkili Telefon",
    accessor: "authorized_phone",
  },

  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function MusteriListesiContainer() {
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
  } = useMusteriListData();

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
            modalTitle="Kayıtlı Müşteriyi Silmek İstediğinizden Emin misiniz?"
            modalDescription="Müşteri Bilgileri Kalıcı Olarak Silinecektir."
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
