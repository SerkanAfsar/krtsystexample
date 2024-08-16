"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useGetProductData from "@/hooks/useGetProductData";
import { RenklitasListHeaders } from "@/types/RenkliTas";

export default function RenkliTasStokListesi() {
  const { activeData, activePage, totalPageCount, setActivePage } =
    useGetProductData(
      "ColoredStone",
      "/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/",
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
      <Breadcrumb pageName="Renkli Taş Stok Listesi" />
      {activeData ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={RenklitasListHeaders}
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
