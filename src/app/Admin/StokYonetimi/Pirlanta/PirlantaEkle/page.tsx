"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondStep1Type } from "@/types/formTypes";
import { useEffect, useState } from "react";
import { setDefaultItemValues } from "@/utils";

const PirlantaEkle = () => {
  const diamondItem: AddDiamondStep1Type = {};

  const [data, setData] = useState<AddDiamondStep1Type>(
    setDefaultItemValues(diamondItem),
  );
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (data?.iskonto && data?.karat) {
      const iskonto = parseFloat(data?.iskonto) || 0;
      const newResult = ((4200 * (100 - iskonto)) / 100).toString();
      const newToplamFiyat = (
        parseFloat(newResult) * parseFloat(data.karat)
      ).toString();
      setData((prev) => ({
        ...prev,
        pricePerCarat: newResult,
        toplamFiyat: newToplamFiyat,
      }));
    }
  }, [data?.iskonto, data?.karat]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pırlanta Ekle" />
      <CustomForm
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formItemType={diamondItem}
        sections={AddStoneSections.filter((a) => a.groupNumber == activeStep)}
        data={data}
        stepCount={2}
      />
    </DefaultLayout>
  );
};

export default PirlantaEkle;
