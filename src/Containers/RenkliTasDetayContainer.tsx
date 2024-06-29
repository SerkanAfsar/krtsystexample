"use client";
import {
  AddProductService,
  UpdateProductService,
} from "@/Services/Product.Services";

import CustomForm from "@/components/CustomUI/CustomForm";
import { IRenkliTasType } from "@/types/formTypes";
import { AddRenkliTasSections } from "@/utils/MockData";
import { useState } from "react";

export default function RenkliTasDetayContainer({
  renkliTasItemData,
  isAdd,
}: {
  renkliTasItemData: (IRenkliTasType & { code?: string }) | null;
  isAdd: boolean;
}) {
  const sadeItem: IRenkliTasType = renkliTasItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);

  const [data, setData] = useState<IRenkliTasType>(sadeItem);

  const newData: IRenkliTasType = AddRenkliTasSections.filter(
    (a) => a.groupNumber == 0,
  ).reduce((acc, next) => {
    const elems = next.elements.reduce((acc2, next2) => {
      const name = next2.name as keyof IRenkliTasType;
      if (data[name]) {
        return { ...acc2, [name]: data[name] };
      }
      return { ...acc2 };
    }, {});
    return { ...acc, [next.keyString]: elems };
  }, {});

  return (
    <CustomForm
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddRenkliTasSections.filter((a) => a.groupNumber == activeStep)}
      data={data}
      stepCount={1}
      //   productCode={sadeCode}
      isAdd={isAdd}
      //   resultCallBack={updateData}
      //   serviceFunction={isAdd ? AddProductService : UpdateProductService}
      filteredData={newData}
      redirectUrl="/Admin/StokYonetimi/RenkliTas/RenkliTasListesi"
    />
  );
}
