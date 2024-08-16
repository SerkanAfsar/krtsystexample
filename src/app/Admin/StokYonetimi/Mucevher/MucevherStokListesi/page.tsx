"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { MucevherListesiDataHeaders } from "@/types/Mucevher";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import useGetProductData from "@/hooks/useGetProductData";

export default function MucevherStokListesi() {
  const { activeData, activePage, totalPageCount, setActivePage } =
    useGetProductData("Gem", "#", undefined);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Stok Listesi" />

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
