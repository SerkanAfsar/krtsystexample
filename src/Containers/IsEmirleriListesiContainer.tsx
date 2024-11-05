"use client";
import { Column } from "react-table";
import { WorkOrderType } from "../types/WorkOrder.types";
import React from "react";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import useGetWorkOrderListData from "@/hooks/WorkOrderHooks/useGetWorkOrderListData";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";

const columns: Column<
  WorkOrderType & {
    id: string;
    code: React.ReactNode;
    sertifika: string;
    cikis: string;
    giris: string;
    islem: string;
    islemler: React.ReactNode;
  }
>[] = [
  {
    Header: "İş Emri Kodu",
    accessor: "id",
  },
  {
    Header: "Mücevher Kodu",
    accessor: "code",
  },

  {
    Header: "Son İşlem",
    accessor: "islem",
  },
  {
    Header: "Son İşlem Tarihi",
    accessor: "last_process_date",
  },
  {
    Header: "Durum",
    accessor: "status",
  },
  {
    Header: "Maliyet",
    accessor: "totalProductColumn",
  },

  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function IsEmirleriListesiContainer() {
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
  } = useGetWorkOrderListData();

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
            modalTitle="Üretim İş Emrini İptal Etmek İstediğinizden Emin misiniz?"
            modalDescription="Kullanılan Sade,Pırlantalar ve Taşlar Stoklara Geri Gönderilecek"
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
