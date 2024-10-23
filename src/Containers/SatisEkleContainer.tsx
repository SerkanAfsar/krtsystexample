"use client";
import { SatisItemType } from "@/app/Admin/Satislar/SatisEkle/page";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import { CustomSearchSelect } from "@/components/CustomUI/CustomSearchSelect";
import { useRouter } from "next/navigation";

import useGetSatisProductData from "@/hooks/SatisHooks/useGetSatisProductData";
import { useState } from "react";
import { SatisModalHeader } from "../../types/types";
import { AddSellinApiService } from "@/ApiServices/Sellings.ApiService";
import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import MusteriDetayContainer from "./MusteriDetayContainer";
import { useTedarikciModalData } from "@/store/useModalStore";

export type ProductSaleType = {
  products: SatisItemType[];
  customer_id: number;
};

export type CustomSearchSelectType = {
  value: number;
  label: string;
};

export default function SatisEkleContainer({
  customers,
}: {
  customers: CustomSearchSelectType[];
}) {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState<SatisItemType[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    number | undefined
  >(undefined);

  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useGetSatisProductData({
      selectedValues,
      setSelectedValues,
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setMusteriModalData, musteriModalData } = useTedarikciModalData();

  const resultData: ProductSaleType = {
    customer_id: selectedCustomerId as number,
    products: selectedValues,
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await AddSellinApiService({
      data: resultData,
      callBack: () => router.push("/Admin/Dashboard"),
    });
    setIsLoading(false);
  };

  return (
    <>
      <CustomSearchSelect
        placeholder="Müşteri Seçiniz"
        title="Müşteri Seçiniz"
        isClearable={true}
        customOptions={customers}
        noOptionsMessage={() => "Bulunamadı..."}
        onChange={(item: any) => {
          if (item?.value == 9999) {
            setMusteriModalData();
          }
          setSelectedCustomerId(item ? item.value : undefined);
        }}
        newItem={{ label: "Yeni Müşteri Ekle", value: 9999 }}
      />

      <div className="block w-full">
        <label className="mb-2 block w-full font-bold text-black">
          Ürünleri Seçiniz
        </label>
        {error ? (
          error
        ) : (
          <>
            <CustomModalPage
              title="Yeni Müşteri Ekle"
              modalDataValue={musteriModalData}
              setModalDataValue={setMusteriModalData}
            >
              <MusteriDetayContainer
                isRedirect={false}
                isAdd={true}
                musteriItemData={null}
              />
            </CustomModalPage>
            <CustomDatatable
              totalPageCount={totalPageCount}
              columns={SatisModalHeader}
              data={activeData}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </>
        )}
        <button
          type="button"
          disabled={isLoading}
          onClick={async () => await handleSubmit()}
          className="ml-auto mt-4 flex items-center justify-center rounded-md bg-primary px-4 py-3 text-white"
        >
          {isLoading ? "Satış Ekleniyor..." : "Satış Ekle"}
        </button>
      </div>
    </>
  );
}
