"use client";

import CustomForm from "@/components/CustomUI/CustomForm";

import { useState } from "react";
import { MusteriType } from "../../types/types";
import { AddMusteriSections } from "@/utils/MockData";
// import {
//   AddTedarikciApiService,
//   UpdateTedarikciApiService,
// } from "@/ApiServices/Suppliers.ApiService";

export default function MusteriDetayContainer({
  musteriItemData,
  isAdd,
}: {
  musteriItemData: MusteriType | null;
  isAdd: boolean;
}) {
  const tedarikciItem: Partial<MusteriType> = musteriItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<Partial<MusteriType>>(tedarikciItem);

  const newData: any = AddMusteriSections.reduce((acc, next) => {
    const elems = next.elements.reduce((acc2, next2) => {
      const name = next2.name as keyof MusteriType;
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

  //   const filteredData = Object.values(newData).reduce<Partial<TedarikciType>>(
  //     (acc: any, next: any) => {
  //       if (next["area"] == "Yurtiçi") {
  //         next["area"] = "Domestic";
  //       } else if (next["area"] == "Yurtdışı") {
  //         next["area"] = "Foreign";
  //       }
  //       return { ...acc, ...next };
  //     },
  //     { type: "TestData" },
  //   );

  return (
    <CustomForm
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddMusteriSections.filter((a) => a.groupNumber == activeStep)}
      data={{ ...data, area: data.area == "Domestic" ? "Yurtiçi" : "Yurtdışı" }}
      stepCount={1}
      isAdd={isAdd}
      // serviceFunction={
      //   isAdd ? AddTedarikciApiService : UpdateTedarikciApiService
      // }
      //   filteredData={filteredData}
      redirectUrl="/Admin/Firmalar/Tedarikciler/TedarikciListesi"
    />
  );
}
