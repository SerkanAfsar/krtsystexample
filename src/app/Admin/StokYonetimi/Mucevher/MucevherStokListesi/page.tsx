"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MucevherListesiDataHeaders } from "@/types/Mucevher";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import useGemProductData from "@/hooks/useGetGemProductData";

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
  } = useGemProductData("/Admin/StokYonetimi/Mucevher/MucevherEkle/");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Stok Listesi" />
      <CustomDeleteModal
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
