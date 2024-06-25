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
import { useCallback, useEffect, useState } from "react";

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
  const [image, setImage] = useState<string | ArrayBuffer | undefined>();
  const [data, setData] = useState<ISadeType>(sadeItem);

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

  const newData: ISadeType = AddSadeSections.filter(
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
      total_cost: Number(data.total_cost),
      image,
    },
  );

  const hasGramHesapla = useCallback((value: any) => {
    if (value.ayar && value.gram) {
      switch (value.ayar) {
        case "18":
        case "750": {
          const result = (18 / 24) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "14":
        case "585": {
          const result = (14 / 24) * parseFloat(value.gram);
          return result.toFixed(2);
        }
        case "8": {
          const result = (8 / 24) * parseFloat(value.gram);
          return result.toFixed(2);
        }
      }
    }
  }, []);

  const totalCoastHesapla = useCallback(
    ({ hasGrami, iscilik }: { hasGrami?: string; iscilik: number }) => {
      if (hasGrami && iscilik) {
        const totalCost =
          Number(hasGrami) * Number(process.env.NEXT_PUBLIC_HAS_KURU) +
          Number(iscilik);

        return totalCost.toFixed(2);
      }
    },
    [],
  );

  const updateData = useCallback(
    (value: any) => {
      const hasGrami = hasGramHesapla(value);
      return {
        hasGrami,
        total_cost: totalCoastHesapla({ hasGrami, iscilik: value.iscilik }),
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
      serviceFunction={isAdd ? AddProductService : UpdateProductService}
      filteredData={newData}
      redirectUrl="/Admin/StokYonetimi/Sade/SadeStokListesi"
    />
  );
}
