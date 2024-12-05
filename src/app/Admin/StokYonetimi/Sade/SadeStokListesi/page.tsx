"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useGetProductData from "@/hooks/CustomDataHooks/useGetProductData";
import { SadeListHeaders } from "@/types/Sade";
import CustomDeleteModal from "@/components/CustomUI/CustomDeleteModal";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// const columns: Column<ISadeType>[] = [
//   {
//     Header: "Resim",
//     accessor: "resim",
//   },
//   {
//     Header: "Sade Kodu",
//     accessor: "code",
//   },
//   {
//     Header: "Model Kodu",
//     accessor: "modelKodu",
//   },
//   {
//     Header: "Model Türü",
//     accessor: "modelTuru",
//   },
//   {
//     Header: "Altın Ayarı",
//     accessor: "ayar",
//   },
//   {
//     Header: "Sade Gramı",
//     accessor: "gram",
//   },
//   {
//     Header: "Has Gramı",
//     accessor: "hasGrami",
//   },
//   {
//     Header: "İşçilik",
//     accessor: "iscilik",
//   },
//   {
//     Header: "İşlemler",
//     accessor: "islemler",
//   },
// ];

export default function SadeStokListesi() {
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
    isOpen,
    imgUrl,
    setIsOpen,
  } = useGetProductData(
    "Simple",
    "/Admin/StokYonetimi/Sade/SadeEkle/",
    undefined,
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Stok Listesi" />
      <CustomDeleteModal
        code={item?.productCode}
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        modalTitle="Sadeyi Silmek İstediğinizden Emin misiniz?"
        modalDescription="Sade Kalıcı Olarak Silinecektir"
        setConfirmDelete={setConfirmDelete}
      />

      {error ? (
        <CustomErrorAlert title="Hata" description={error} />
      ) : (
        <>
          {isOpen && (
            <Lightbox
              mainSrc={imgUrl as string}
              onCloseRequest={() => setIsOpen(false)}
            />
          )}
          <CustomDatatable
            setFirstCenter={true}
            totalPageCount={totalPageCount}
            columns={SadeListHeaders}
            data={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </>
      )}
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
