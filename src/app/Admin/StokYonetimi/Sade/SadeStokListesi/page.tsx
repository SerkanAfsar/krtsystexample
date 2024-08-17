"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ISadeType } from "../../../../../../types/formTypes";
import { Column } from "react-table";
import useGetProductData from "@/hooks/useGetProductData";
import { SadeListHeaders } from "@/types/Sade";
import ModalTwo from "@/components/Modals/ModalTwo";

const columns: Column<ISadeType>[] = [
  {
    Header: "Resim",
    accessor: "resim",
  },
  {
    Header: "Sade Kodu",
    accessor: "sadeKodu",
  },
  {
    Header: "Model Kodu",
    accessor: "modelKodu",
  },
  {
    Header: "Model Türü",
    accessor: "modelTuru",
  },
  {
    Header: "Altın Ayarı",
    accessor: "ayar",
  },
  {
    Header: "Sade Gramı",
    accessor: "gram",
  },
  {
    Header: "Has Gramı",
    accessor: "hasGrami",
  },
  {
    Header: "İşçilik",
    accessor: "iscilik",
  },
  {
    Header: "İşlemler",
    accessor: "islemler",
  },
];

export default function SadeStokListesi() {
  const {
    activeData,
    activePage,
    totalPageCount,
    setActivePage,
    setConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
  } = useGetProductData(
    "Simple",
    "/Admin/StokYonetimi/Sade/SadeEkle/",
    undefined,
  );

  if (activeData == "Hata") {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Sade Stok Listesi" />
        <div className="flex h-full w-full items-center justify-center">
          Hata.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Stok Listesi" />
      <ModalTwo
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        modalTitle="Üretim İş Emrini İptal Etmek İstediğinizden Emin misiniz?"
        modalDescription="Kullanılan Sade,Pırlantalar ve Taşlar Stoklara Geri Gönderilecek"
        setConfirmDelete={setConfirmDelete}
      />
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={SadeListHeaders}
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
