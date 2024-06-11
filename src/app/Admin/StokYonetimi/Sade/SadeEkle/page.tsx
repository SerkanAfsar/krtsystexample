"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomForm from "@/components/CustomUI/CustomForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ISadeType } from "@/types/formTypes";
import { setDefaultItemValues } from "@/utils";
import { AddSadeSections } from "@/utils/MockData";
import { useState } from "react";

const ProFormLayout = () => {
  const sadeItem: ISadeType = {};

  const [sadeCode, setSadeCode] = useState<string>("");

  const [data, setData] = useState<ISadeType>(setDefaultItemValues(sadeItem));
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Ekle" />

      <CustomForm
        setData={setData}
        activeStep={0}
        setActiveStep={0}
        formItemType={sadeItem}
        sections={AddSadeSections.filter((a) => a.groupNumber == 0)}
        data={data}
        stepCount={2}
        // serviceFunction={AddProductService}
        // filteredData={newData}
        // productCode={diamondCode}
        redirectUrl="/Admin/StokYonetimi/Pirlanta/PirlantaListesi"
      />
    </DefaultLayout>
  );
};

export default ProFormLayout;
