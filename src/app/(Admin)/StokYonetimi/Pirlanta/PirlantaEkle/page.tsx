"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondStep1Type } from "@/types/formTypes";
import { useEffect, useState } from "react";

const PirlantaEkle = () => {
  const diamondItem: AddDiamondStep1Type = {};

  const [data, setData] = useState<AddDiamondStep1Type>();
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    // güncel rapaport fiyatı * (100 - Iskonto) / 100
    if (data?.iskonto) {
      const iskonto = parseFloat(data?.iskonto) || 0;
      const newResult = ((4200 * (100 - iskonto)) / 100).toString();
      setData((prev) => ({ ...prev, pricePerCarat: newResult }));
    }
  }, [data?.iskonto]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pırlanta Ekle" />
      <CustomForm
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formItemType={diamondItem}
        section={AddStoneSections[activeStep]}
        data={data}
        stepCount={AddStoneSections.length}
      />
    </DefaultLayout>
  );
};

export default PirlantaEkle;
