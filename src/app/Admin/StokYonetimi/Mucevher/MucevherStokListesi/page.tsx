"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MucevherListesiDataHeaders } from "@/types/Mucevher";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import useGetProductData from "@/hooks/useGetProductData";
import ModalTwo from "@/components/Modals/ModalTwo";

export default function MucevherStokListesi() {
  const {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    setConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    item,
  } = useGetProductData("Gem", "#", undefined);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Stok Listesi" />
      <ModalTwo
        code={item?.productCode}
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        modalTitle="Mücevheri Silmek İstediğinizden Emin misiniz?"
        modalDescription="Mücevher Kalıcı Olarak Silinecektir"
        setConfirmDelete={setConfirmDelete}
      />

      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={MucevherListesiDataHeaders}
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
