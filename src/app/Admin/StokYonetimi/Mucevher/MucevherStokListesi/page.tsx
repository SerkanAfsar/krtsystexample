"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import useGemProductData from "@/hooks/useGetGemProductData";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import { MucevherListesiDataHeaders } from "@/types/Mucevher";

export default function MucevherStokListesi() {
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

      {error ? (
        <CustomErrorAlert title="Hata" description={error} />
      ) : (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={MucevherListesiDataHeaders}
          data={activeData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </DefaultLayout>
  );
}
