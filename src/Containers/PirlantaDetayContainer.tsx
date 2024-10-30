"use client";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondType } from "../types/formTypes";
import { useCallback, useState } from "react";

import usePirlantaCode, {
  PirlantaCodeItemType,
} from "@/hooks/CodeHooks/usePirlantaCode";
import {
  AddProductApiService,
  UpdateProductApiService,
} from "@/ApiServices/Products.ApiService";
import CustomModalPage from "@/components/CustomModals/CustomPageModal";
import TedarikciDetayContainer from "./TedarikciDetayContainer";
import { useTedarikciModalData } from "@/store/useModalStore";

const PirlantaDetayContainer = ({
  pirlantaItemData,
  isAdd,
}: {
  pirlantaItemData: (AddDiamondType & { code?: string }) | null;
  isAdd: boolean;
}) => {
  const diamondItem: AddDiamondType = pirlantaItemData ?? {};
  const [data, setData] = useState<AddDiamondType>(diamondItem);
  const [activeStep, setActiveStep] = useState<number>(0);
  const { tedarikciModal, setTedarikciModalOpen } = useTedarikciModalData();

  const resultCallBack = useCallback(
    (value: any) => {
      const iskonto = value?.iskonto?.toString().replace(",", ".") || 0;

      const rapaportPrice =
        value.menstrual_status == "Sertifikalı" && value?.rapaportPrice
          ? Number(value?.rapaportPrice.toString().replace(",", "."))
          : 4700;

      const pricePerCarat = (rapaportPrice * (100 - iskonto)) / 100;
      const total_cost = pricePerCarat * Number(value?.carat);

      if (data.menstrual_status == "Sertifikalı") {
        return {
          pricePerCarat: Number(pricePerCarat.toFixed(2)),
          total_cost: Number(total_cost.toFixed(2)),
        };
      } else {
        return {
          pricePerCarat,
        };
      }
    },
    [data.menstrual_status],
  );

  const item: PirlantaCodeItemType = {
    data_boy: data.boy,
    data_frommixedItem: data.frommixedItem,
    data_fromsingleormixed: data.fromsingleormixed,
    data_kesim: data.kesim,
    data_menstrual_status: data.menstrual_status,
    isAdd: isAdd,
    data_carat: data.carat,
  };
  const { diamondCode, extraOptions } = usePirlantaCode({ item });

  const pruductCode = isAdd ? diamondCode : pirlantaItemData?.code;

  const newData: AddDiamondType = AddStoneSections.reduce(
    (acc, next) => {
      const totalElems = [...next.elements, ...(next.extraElements ?? [])];
      const elems = totalElems.reduce((acc2, next2) => {
        const name = next2.name as keyof AddDiamondType;
        if (data[name] && name != "sertifikaDosyasi") {
          return {
            ...acc2,
            [name]: next2.type == "number" ? Number(data[name]) : data[name],
          };
        }
        return { ...acc2 };
      }, {});
      return { ...acc, [next.keyString]: elems };
    },
    {
      menstrual_status:
        data.menstrual_status == "Sertifikalı" ? "Single" : "Mixed",
      total_cost: Number(data.total_cost?.toString().replace(",", ".")),
      type: "Diamond",
      buy_date: data.buy_date,
      code: pruductCode,
      supplier_id: Number(data.supplier_id),
    },
  );

  const sectionLenght: number =
    data.menstrual_status == "Sertifikalı"
      ? AddStoneSections.length - 1
      : AddStoneSections.length - 1;

  return (
    <>
      <CustomModalPage
        title="Yeni Tedarikçi Ekle"
        modalDataValue={tedarikciModal}
        setModalDataValue={setTedarikciModalOpen}
      >
        <TedarikciDetayContainer
          isRedirect={false}
          isAdd={true}
          tedarikciItemData={null}
        />
      </CustomModalPage>
      <CustomForm
        isAdd={isAdd}
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        sections={AddStoneSections.filter((a) => a.groupNumber == activeStep)}
        data={data}
        stepCount={sectionLenght}
        serviceFunction={isAdd ? AddProductApiService : UpdateProductApiService}
        filteredData={newData}
        productCode={pruductCode}
        extraOptions={extraOptions}
        resultCallBack={resultCallBack}
        redirectUrl="/Admin/StokYonetimi/Pirlanta/PirlantaListesi"
      />
    </>
  );
};

export default PirlantaDetayContainer;
