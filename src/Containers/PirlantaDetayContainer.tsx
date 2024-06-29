"use client";
import CustomForm, {
  SelectOptionsType,
} from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondType } from "@/types/formTypes";
import { useCallback, useEffect, useState } from "react";
import { generateDiamondCode } from "@/utils";
import { AddProductType, ResponseResult } from "@/types/responseTypes";
import {
  AddProductService,
  GetListMixedProductsCodeDiamondService,
  GetNextOrderForMixedDiamondService,
  GetNextOrderFromSingleDiamondService,
  UpdateProductService,
} from "@/Services/Product.Services";
import usePirlantaCode, { PirlantaCodeItemType } from "@/hooks/usePirlantaCode";

const PirlantaDetayContainer = ({
  pirlantaItemData,
  isAdd,
}: {
  pirlantaItemData: (AddDiamondType & { code: string }) | null;
  isAdd: boolean;
}) => {
  const diamondItem: AddDiamondType = pirlantaItemData ?? {};
  const [data, setData] = useState<AddDiamondType>(diamondItem);
  const [activeStep, setActiveStep] = useState<number>(0);

  const resultCallBack = useCallback((value: any) => {
    const iskonto = value?.iskonto || 0;
    const newResult = (2500 * (100 - iskonto)) / 100;
    const newToplamFiyat = newResult * value?.carat;
    return {
      pricePerCarat: newResult,
      total_cost: newToplamFiyat,
    };
  }, []);

  const item: PirlantaCodeItemType = {
    data_boy: data.boy,
    data_frommixedItem: data.frommixedItem,
    data_fromsingleormixed: data.fromsingleormixed,
    data_kesim: data.kesim,
    data_menstrual_status: data.menstrual_status,
    isAdd: isAdd,
    pirlandaData_Code: pirlantaItemData?.code,
    pirlantaData_Boy: pirlantaItemData?.boy,
    pirlantaData_frommixedItem: pirlantaItemData?.fromsingleormixed,
    pirlantaData_fromsingleormixed: pirlantaItemData?.fromsingleormixed,
    pirlantaData_Kesim: pirlantaItemData?.kesim,
  };
  const { diamondCode, extraOptions } = usePirlantaCode({ item });

  const newData: AddProductType = AddStoneSections.reduce(
    (acc, next) => {
      const totalElems = [...next.elements, ...(next.extraElements ?? [])];
      const elems = totalElems.reduce((acc2, next2) => {
        const name = next2.name as keyof AddDiamondType;
        if (data[name]) {
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
      total_cost: data.total_cost,
      type: "Diamond",
      buy_date: data.buy_date,
      code: diamondCode,
    },
  );

  return (
    <CustomForm
      isAdd={isAdd}
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddStoneSections.filter((a) => a.groupNumber == activeStep)}
      data={data}
      stepCount={2}
      serviceFunction={isAdd ? AddProductService : UpdateProductService}
      filteredData={newData}
      productCode={diamondCode}
      extraOptions={extraOptions}
      resultCallBack={resultCallBack}
      redirectUrl="/Admin/StokYonetimi/Pirlanta/PirlantaListesi"
    />
  );
};

export default PirlantaDetayContainer;
