"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SatisModalHeader } from "../../../../../types/types";
import useGetSatisProductData from "@/hooks/SatisHooks/useGetSatisProductData";
import { useState } from "react";

export type SatisItemType = {
  product_id: number;
  used_carat: number;
};
const SatisEklePage = () => {
  const [selectedValues, setSelectedValues] = useState<SatisItemType[]>([]);
  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useGetSatisProductData({
      selectedValues,
      setSelectedValues,
    });

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Satış Listesi",
            url: "/Admin/Satislar/SatisListesi",
          },
        ]}
        pageName="Yeni Satış Ekle "
      />
      {error ? (
        error
      ) : (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={SatisModalHeader}
          data={activeData}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </DefaultLayout>
  );
};

export default SatisEklePage;

export const dynamic = "force-dynamic";
