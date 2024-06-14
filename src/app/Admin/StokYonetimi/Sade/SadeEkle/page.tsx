"use client";
import {
  AddProductService,
  GetSadeCodeByTypeService,
} from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomForm from "@/components/CustomUI/CustomForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ISadeType } from "@/types/formTypes";
import { AddProductType, ResponseResult } from "@/types/responseTypes";
import { setDefaultItemValues } from "@/utils";
import { AddSadeSections } from "@/utils/MockData";
import { useEffect, useState } from "react";

const ProFormLayout = () => {
  const sadeItem: ISadeType = {};
  const [sadeCode, setSadeCode] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [data, setData] = useState<ISadeType>(setDefaultItemValues(sadeItem));
  const [hasGram, setHasgram] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data.type) {
      GetSadeCodeByTypeService({ type: data.type == "Stok" ? "L" : "B" })
        .then((resp: ResponseResult) => {
          const siraNo = resp.payload["next_order"] as number;
          const newCode =
            data.type == "Stok"
              ? `L${siraNo.toString()}`
              : `B${siraNo.toString()}`;
          setSadeCode(newCode);
          setData((prev) => ({ ...prev, sadeKodu: newCode }));
        })
        .catch((err) => {
          setSadeCode(err.message);
        });
    } else {
      setSadeCode(null);
    }
  }, [data.type]);

  useEffect(() => {
    if (data.ayar && data.gram) {
      let newVal: number;
      switch (data.ayar) {
        case "18":
        case "750": {
          newVal = (18 / 24) * parseFloat(data.gram);
          setData((prev) => ({ ...prev, hasGrami: newVal.toFixed(2) }));
          setHasgram(newVal.toFixed(2));
          break;
        }
        case "14":
        case "585": {
          newVal = (14 / 24) * parseFloat(data.gram);
          setData((prev) => ({ ...prev, hasGrami: newVal.toFixed(2) }));
          setHasgram(newVal.toFixed(2));
          break;
        }

        case "8": {
          newVal = (8 / 24) * parseFloat(data.gram);
          setData((prev) => ({ ...prev, hasGrami: newVal.toFixed(2) }));
          setHasgram(newVal.toFixed(2));
          break;
        }
      }
    }
  }, [data.ayar, data.gram]);

  const getBase64 = (file: any): any => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      setImage(null);
    };
  };

  const newData: ISadeType = AddSadeSections.filter(
    (a) => a.groupNumber == 0,
  ).reduce(
    (acc, next) => {
      const elems = next.elements.reduce((acc2, next2) => {
        const name = next2.name as keyof ISadeType;
        if (name == "hasGrami") {
          return { ...acc2, [next2.name]: hasGram };
        } else {
          if (data[name] && name != "resim") {
            return { ...acc2, [next2.name]: data[name] };
          }
        }

        return { ...acc2 };
      }, {});
      return { ...acc, [next.keyString]: elems };
    },
    {
      type: "Simple",
      cost_currency: data.cost_currency,
      code: sadeCode,
      image,
    },
  );

  useEffect(() => {
    if (data.resim) {
      getBase64(data.resim);
    }
  }, [data.resim]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Ekle" />
      <CustomForm
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formItemType={sadeItem}
        sections={AddSadeSections.filter((a) => a.groupNumber == activeStep)}
        data={data}
        stepCount={1}
        productCode={sadeCode}
        serviceFunction={AddProductService}
        filteredData={newData}
        redirectUrl="/Admin/StokYonetimi/Sade/SadeStokListesi"
      />
    </DefaultLayout>
  );
};

export default ProFormLayout;
