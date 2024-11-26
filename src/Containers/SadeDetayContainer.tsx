"use client";

import CustomForm from "@/components/CustomUI/CustomForm";
import useSadeCode from "@/hooks/CodeHooks/useSadeCode";
import { ISadeType } from "../types/formTypes";
import { ProductType } from "../types/types";
import { AddSadeSections } from "@/utils/MockData";
import { useCallback, useEffect, useState } from "react";
import {
  AddProductApiService,
  UpdateProductApiService,
} from "@/ApiServices/Products.ApiService";

export default function SadeDetayContainer({
  sadeItemData,
  isAdd,
  gramAltinKur,
}: {
  sadeItemData: (ISadeType & { code?: string | null }) | null;
  isAdd: boolean;
  gramAltinKur: number;
}) {
  const sadeItem: ISadeType = sadeItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);
  const [image, setImage] = useState<string | ArrayBuffer | undefined>();
  const [data, setData] = useState<ISadeType>(sadeItem);

  const { sadeCode } = useSadeCode({
    type: data.type,
    isAdd,
    sadeDataItemCode: sadeItemData?.code,
    sadeDataItemType: sadeItemData?.type,
  });

  useEffect(() => {
    setData((prev: any) => ({ ...prev, code: sadeCode, sadeKodu: sadeCode }));
  }, [sadeCode]);

  const getBase64 = (file: any): any => {
    if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function () {
        setImage(reader.result ?? undefined);
      };
      reader.onerror = function (error) {
        console.log("Base 64 Error: ", error);
        setImage(undefined);
      };
    }
  };

  const newData: ProductType = AddSadeSections.filter(
    (a) => a.groupNumber == 0,
  ).reduce(
    (acc, next) => {
      const elems = next.elements.reduce((acc2, next2) => {
        const name = next2.name as keyof ISadeType;
        if (data[name] && name != "resim") {
          return { ...acc2, [name]: data[name] };
        }
        return { ...acc2 };
      }, {});
      return { ...acc, [next.keyString]: elems };
    },
    {
      type: "Simple",
      cost_currency: data.cost_currency,
      code: sadeCode,
      total_cost: Number(Number(data.total_cost).toFixed(2)),
      image,
      menstrual_status: "Single",
      store_id: Number(data.store_id),
    },
  );

  const hasGramHesapla = useCallback((value: any) => {
    if (value.ayar && value.gram) {
      switch (value.ayar) {
        case "18": {
          const result = (750 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "750": {
          const result = (750 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "14": {
          const result = (585 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "585": {
          const result = (585 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "8": {
          const result = (333 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "22": {
          const result = (916 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "24": {
          const result = (999 / 1000) * parseFloat(value.gram);
          return result.toFixed(2);
        }
      }
    }
  }, []);

  const totalCoastHesapla = useCallback(
    ({ hasGrami, iscilik }: { hasGrami?: string; iscilik: number }) => {
      if (hasGrami && iscilik) {
        return Number(hasGrami) * gramAltinKur + iscilik;
      }
    },
    [gramAltinKur],
  );

  const updateData = useCallback(
    (value: any) => {
      const hasGrami = hasGramHesapla(value);

      return {
        hasGrami,
        total_cost: totalCoastHesapla({
          hasGrami,
          iscilik: value.iscilik,
        }),
      };
    },
    [hasGramHesapla, totalCoastHesapla],
  );

  useEffect(() => {
    if (data.resim) {
      getBase64(data.resim);
    }
  }, [data.resim]);

  return (
    <CustomForm
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddSadeSections.filter((a) => a.groupNumber == activeStep)}
      data={data}
      stepCount={1}
      productCode={sadeCode}
      isAdd={isAdd}
      resultCallBack={updateData}
      serviceFunction={isAdd ? AddProductApiService : UpdateProductApiService}
      filteredData={newData}
      redirectUrl="/Admin/StokYonetimi/Sade/SadeStokListesi"
    />
  );
}
