"use client";
import { Column } from "react-table";
import { WorkOrderType } from "../../types/WorkOrder.types";
import React from "react";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import useGetWorkOrderListData from "@/hooks/useGetWorkOrderListData";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";

const columns: Column<
  WorkOrderType & {
    isEmriKodu: string;
    mucevherKodu: React.ReactNode;
    sertifika: string;
    cikis: string;
    giris: string;
    islem: string;
    islemler: React.ReactNode;
  }
>[] = [
  {
    Header: "İş Emri Kodu",
    accessor: "isEmriKodu",
  },
  {
    Header: "Mücevher Kodu",
    accessor: "mucevherKodu",
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
    Header: "Maliyet",
    accessor: "total_product_cost",
  },
  {
    Header: "Durum",
    accessor: "status",
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
    item,
  } = useGetWorkOrderListData();

  if (typeof activeData == "string") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {activeData}
      </div>
    );
  }

  return (
    <>
      {activeData ? (
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
    </>
  );
}
