"use client";
import {
  AddMagazaApiService,
  UpdateMagazaApiService,
} from "@/ApiServices/Magaza.ApiService";
import CustomForm from "@/components/CustomUI/CustomForm";
import { MagazaType } from "@/types/Magaza";
import { AddMagazaSections } from "@/utils/MockData";
import { useState } from "react";

export default function MagazaDetayContainer({
  magazaItemData,
  isAdd,
  isRedirect = true,
}: {
  magazaItemData: MagazaType | null;
  isAdd: boolean;
  isRedirect: boolean;
}) {
  const magazaItem: MagazaType = magazaItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<MagazaType>(magazaItem);

  const newData: any = AddMagazaSections.reduce((acc, next) => {
    const elems = next.elements.reduce((acc2, next2) => {
      const name = next2.name as keyof MagazaType;

      if (data[name]) {
        return {
          ...acc2,
          [name]: next2.type == "number" ? Number(data[name]) : data[name],
        };
      }
      return { ...acc2 };
    }, {});
    return { ...acc, [next.keyString]: elems };
  }, {});

  const filteredData = Object.values(newData).reduce<MagazaType>(
    (acc: any, next: any) => {
      return { ...acc, ...next };
    },
    Object.assign({}, null),
  );

  return (
    <CustomForm
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddMagazaSections.filter((a) => a.groupNumber == 0)}
      data={data}
      stepCount={1}
      isAdd={isAdd}
      serviceFunction={isAdd ? AddMagazaApiService : UpdateMagazaApiService}
      filteredData={filteredData}
      redirectUrl={isRedirect ? "/Admin/Magazalar/MagazaListesi" : undefined}
    />
  );
}
