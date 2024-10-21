"use client";

import CustomForm from "@/components/CustomUI/CustomForm";

import { useState } from "react";
import { TedarikciType } from "../../types/types";
import { AddTedarikciSections } from "@/utils/MockData";
import {
  AddTedarikciApiService,
  UpdateTedarikciApiService,
} from "@/ApiServices/Suppliers.ApiService";

export default function TedarikciDetayContainer({
  tedarikciItemData,
  isAdd,
}: {
  tedarikciItemData: TedarikciType | null;
  isAdd: boolean;
}) {
  const tedarikciItem: Partial<TedarikciType> = tedarikciItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<Partial<TedarikciType>>(tedarikciItem);

  const newData: any = AddTedarikciSections.reduce((acc, next) => {
    const elems = next.elements.reduce((acc2, next2) => {
      const name = next2.name as keyof TedarikciType;
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

  const filteredData = Object.values(newData).reduce<Partial<TedarikciType>>(
    (acc: any, next: any) => {
      return { ...acc, ...next };
    },
    { type: "TestData" },
  );

  return (
    <CustomForm
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddTedarikciSections.filter((a) => a.groupNumber == activeStep)}
      data={data}
      stepCount={1}
      isAdd={isAdd}
      serviceFunction={
        isAdd ? AddTedarikciApiService : UpdateTedarikciApiService
      }
      filteredData={filteredData}
      redirectUrl="/Admin/Firmalar/Tedarikciler/TedarikciListesi"
    />
  );
}
