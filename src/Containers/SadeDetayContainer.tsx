"use client";

import CustomForm from "@/components/CustomUI/CustomForm";
import useSadeCode from "@/hooks/CodeHooks/useSadeCode";
import { ISadeType } from "../types/formTypes";
import { ProductType } from "../types/types";
import { AddSadeSections } from "@/utils/MockData";
import { useCallback, useEffect, useState } from "react";
import { formatToCurrency } from "@/utils";
import {
  AddProductApiService,
  UpdateProductApiService,
} from "@/ApiServices/Products.ApiService";

export default function SadeDetayContainer({
  sadeItemData,
  isAdd,
  gramAltinKur,
  dolarKuru,
}: {
  sadeItemData: (ISadeType & { code?: string | null }) | null;
  isAdd: boolean;
  gramAltinKur: number;
  dolarKuru: number;
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

  useEffect(() => {
    AddSadeSections.forEach(section => {
      const milyemElement = section.elements.find(element => element.name === 'milyem');
      if (milyemElement) {
        if (data.ayar) {
          setData((prev: any) => ({ ...prev, milyem: null }));
          switch (data.ayar) {
            case "24":
              setData((prev: any) => ({ ...prev, milyem: "", hasGrami: "0.00" }));
              milyemElement.options = [
                { titleVal: "Milyem Seçiniz", valueVal: "" },
                { titleVal: "995", valueVal: "995",},
              ];
              break;
            case "22":
              setData((prev: any) => ({ ...prev, milyem: "", hasGrami: "0.00"}));
              milyemElement.options = [
                { titleVal: "Milyem Seçiniz", valueVal: "" },
                { titleVal: "916", valueVal: "916" },
              ];
              break;
            case "18":
              setData((prev: any) => ({ ...prev, milyem: "", hasGrami: "0.00" }));
              milyemElement.options = [
                { titleVal: "Milyem Seçiniz", valueVal: "" },
                { titleVal: "825", valueVal: "825" },
                { titleVal: "787.5", valueVal: "787.5"},
                { titleVal: "750", valueVal: "750" },
              ];
              break;
            case "14":
              setData((prev: any) => ({ ...prev, milyem: "", hasGrami: "0.00" }));
              milyemElement.options = [
                { titleVal: "Milyem Seçiniz", valueVal: "" },
                { titleVal: "585", valueVal: "585" },
                { titleVal: "615", valueVal: "615" },
                { titleVal: "645", valueVal: "645" },
              ];
              break;
            case "8":
              setData((prev: any) => ({ ...prev, milyem: "", hasGrami: "0.00"}));
              milyemElement.options = [
                { titleVal: "Milyem Seçiniz", valueVal: ""},
                { titleVal: "333", valueVal: "333" },
                { titleVal: "350", valueVal: "350" },
                { titleVal: "366", valueVal: "366" },
              ];
              break;
            default:
              milyemElement.options = []; 
          }
        }
       
      }
    });
  }, [data?.ayar]);


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
    if (value.milyem && value.gram) {
      const result = (Number(value.milyem) / 1000) * parseFloat(value.gram);
      return result.toFixed(2);
    }
  }, []);

  const totalCoastHesapla = useCallback(
    ({ hasGrami, iscilik, cost_currency }: { hasGrami?: string; iscilik: number; cost_currency? : string }) => {
      if (hasGrami && iscilik && cost_currency) {
        if(cost_currency === "USD"){
          return ((Number(hasGrami) * gramAltinKur) / dolarKuru)  + Number(iscilik); 
        } else{
          return ((Number(hasGrami) * gramAltinKur) / dolarKuru) + ((Number(iscilik) * gramAltinKur) / dolarKuru);
        }
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
          cost_currency: value.cost_currency
        }),
      };
    },
    [hasGramHesapla, totalCoastHesapla],
  );

  useEffect(() => {
    console.log()
    if (data.total_cost) {
      const totalCost = data.total_cost
      setData((prev: any) => ({ ...prev, totalCost: `${formatToCurrency(totalCost)} $`, }));
    }
  }, [data.milyem, data.gram, data.iscilik, data.cost_currency,]);

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
