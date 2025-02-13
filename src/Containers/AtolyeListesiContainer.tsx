"use client";
import { Column } from "react-table";
import React from "react";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import {AtolyeListesi} from "@/data/Sade.data";
import useTedarikciListData from "@/hooks/CustomDataHooks/useTedarikciListData";

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
    Header: "Firma Kodu",
    accessor: "code",
  },
  {
    Header: "Firma Adı",
    accessor: "name",
  },

  {
    Header: "Firma Telefon",
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

export default function AtolyeListesiContainer() {
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
  } = useTedarikciListData();

  const transformedData = AtolyeListesi.map(item => ({
    code: item.extraValue, 
    name: item.titleVal, 
    phone: "", 
    authorized_name: item.valueVal,
    authorized_phone: "", 
  }));

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
            modalTitle="Kayıtlı Atolyeyi Silmek İstediğinizden Emin misiniz?"
            modalDescription="Atolyeyi Bilgileri Kalıcı Olarak Silinecektir."
            setConfirmDelete={setConfirmDelete}
          />
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={columns}
            data={transformedData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </>
      )}
    </>
  );
}
