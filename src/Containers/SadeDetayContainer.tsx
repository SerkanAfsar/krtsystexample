"use client";
import {
  AddProductService,
  GetSadeCodeByTypeService,
  UpdateProductService,
} from "@/Services/Product.Services";

import CustomForm from "@/components/CustomUI/CustomForm";

import { ISadeType } from "@/types/formTypes";
import { ResponseResult } from "@/types/responseTypes";
import { AddSadeSections } from "@/utils/MockData";
import { useEffect, useState } from "react";

export default function SadeDetayContainer({
  sadeItemData,
  isAdd,
}: {
  sadeItemData: (ISadeType & { code?: string }) | null;
  isAdd: boolean;
}) {
  const sadeItem: ISadeType = sadeItemData ?? {};
  const [sadeCode, setSadeCode] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [data, setData] = useState<ISadeType>(sadeItem);
  const [hasGram, setHasgram] = useState<string | undefined>(undefined);
  const [total_cost, setTotalCost] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data.type) {
      if (isAdd || (sadeItemData?.type && data.type != sadeItemData?.type)) {
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
        setSadeCode(sadeItemData?.code || null);
        setData((prev: ISadeType) => ({
          ...prev,
          sadeKodu: sadeItemData?.code,
        }));
      }
    } else {
      setSadeCode(null);
    }
  }, [data.type, isAdd, sadeItemData?.type, sadeItemData?.code]);

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
    if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function () {
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        setImage(null);
      };
    }
  };

  const newData: ISadeType = AddSadeSections.filter(
    (a) => a.groupNumber == 0,
  ).reduce(
    (acc, next) => {
      const elems = next.elements.reduce((acc2, next2) => {
        const name = next2.name as keyof ISadeType;
        if (name == "hasGrami") {
          return { ...acc2, [name]: hasGram };
        } else {
          if (data[name] && name != "resim") {
            return { ...acc2, [name]: data[name] };
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
      total_cost,
      image,
    },
  );

  useEffect(() => {
    if (data.hasGrami && data.iscilik) {
      const totalCost =
        Number(data.hasGrami) * Number(process.env.NEXT_PUBLIC_HAS_KURU) +
        Number(data.iscilik);
      setTotalCost(Number(totalCost.toFixed(2)));
    }
  }, [data.hasGrami, data.iscilik]);

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
      serviceFunction={isAdd ? AddProductService : UpdateProductService}
      filteredData={newData}
      redirectUrl="/Admin/StokYonetimi/Sade/SadeStokListesi"
    />
  );
}
