"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondStep1Type } from "@/types/formTypes";
import { useEffect, useState } from "react";
import { generateDiamondCode, setDefaultItemValues } from "@/utils";
import { AddProductType, ResponseResult } from "@/types/responseTypes";
import {
  AddProductService,
  DiamondQueueByCodeService,
} from "@/Services/Product.Services";

const PirlantaEkle = () => {
  const diamondItem: AddDiamondStep1Type = {};
  const [diamondCode, setDiamondCode] = useState<string>("");

  const [data, setData] = useState<AddDiamondStep1Type>(
    setDefaultItemValues(diamondItem),
  );

  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (data?.iskonto && data?.carat) {
      const iskonto = parseFloat(data?.iskonto) || 0;
      const newResult = (4200 * (100 - iskonto)) / 100;
      const newToplamFiyat = newResult * data.carat;
      setData((prev) => ({
        ...prev,
        pricePerCarat: newResult.toString(),
        total_cost: newToplamFiyat,
      }));
    }
  }, [data?.iskonto, data?.carat]);

  useEffect(() => {
    if (data.kesim && data.carat) {
      const timeFunc = setTimeout(() => {
        const code = generateDiamondCode({
          kesimKodu: data.kesim,
          caratKodu: data.carat,
        });
        DiamondQueueByCodeService({ data: { code, type: "Diamond" } })
          .then((res: ResponseResult) => {
            if (res.result) {
              const siraNo = res.payload["next_order"] as number;
              setDiamondCode(`${code}-${siraNo.toString().padStart(3, "0")}`);
            } else {
              const errs = Object.entries(res.payload).map(
                ([key, value], index) => {
                  const arr = value as string[];
                  return `${key} - ${arr[0]}`;
                },
              );
              setDiamondCode(errs[0]);
            }
          })
          .catch((err) => {
            setDiamondCode(err.message);
          });
      }, 500);
      return () => {
        clearTimeout(timeFunc);
      };
    } else {
      setDiamondCode("");
    }
  }, [data.kesim, data.carat]);

  const newData: AddProductType = AddStoneSections.reduce(
    (acc, next) => {
      const elems = next.elements.reduce((acc2, next2) => {
        const name = next2.name as keyof AddDiamondStep1Type;
        if (data[name]) {
          return { ...acc2, [next2.name]: data[name] };
        }
        return { ...acc2 };
      }, {});
      return { ...acc, [next.keyString]: elems };
    },
    {
      menstrual_status:
        data.menstrual_status == "Sertifikalı" ? "Single" : "Mixed",
      total_cost: data.total_cost,
      type: "Diamond",
      buy_date: data.buy_date,
      code: diamondCode,
    },
  );

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
        serviceFunction={AddProductService}
        filteredData={newData}
        productCode={diamondCode}
      />
    </DefaultLayout>
  );
};

export default PirlantaEkle;
