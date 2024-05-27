"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondStep1Type, FormSectionType } from "@/types/formTypes";
import { useState } from "react";

const PirlantaEkle = () => {
  const diamondItem: AddDiamondStep1Type = {};

  const [data, setData] = useState<AddDiamondStep1Type>();
  const [activeStep, setActiveStep] = useState<number>(0);

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
