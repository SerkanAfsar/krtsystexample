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
  GetListMixedProductsCodeDiamondService,
  GetNextOrderForMixedDiamondService,
  GetNextOrderFromSingleDiamondService,
} from "@/Services/Product.Services";

export type SelectOptionsType = {
  valueVal: string;
  titleVal: string;
  extraValue?: string;
};

const PirlantaEkle = () => {
  const diamondItem: AddDiamondStep1Type = {};
  const [diamondCode, setDiamondCode] = useState<string>("");

  const [data, setData] = useState<AddDiamondStep1Type>(
    setDefaultItemValues(diamondItem),
  );

  const [extraOptions, setExtraOptions] = useState<SelectOptionsType[] | null>(
    null,
  );
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (data?.iskonto && data?.carat) {
      const iskonto = parseFloat(data?.iskonto) || 0;
      const newResult = (2500 * (100 - iskonto)) / 100;
      const newToplamFiyat = newResult * data.carat;
      setData((prev) => ({
        ...prev,
        pricePerCarat: newResult.toString(),
        total_cost: newToplamFiyat,
      }));
    }
  }, [data?.iskonto, data?.carat]);

  const returnSameResult = (
    promiseFunc: Promise<ResponseResult>,
    code: string,
  ) => {
    return promiseFunc
      .then((resp: ResponseResult) => {
        if (resp.result) {
          const siraNo = resp.payload["next_order"] as number;
          setDiamondCode(`${code}-${siraNo}`);
        } else {
          setDiamondCode("Hata");
        }
      })
      .catch((err) => {
        setDiamondCode(err);
      });
  };

  useEffect(() => {
    let timeFunc: any;
    if (data.kesim && data.boy) {
      timeFunc = setTimeout(() => {
        const code = generateDiamondCode({
          kesimKodu: data.kesim,
          boyKodu: data.boy,
        });

        if (data.menstrual_status == "Sertifikasız") {
          returnSameResult(
            GetNextOrderForMixedDiamondService({ type: "Diamond", code }),
            code,
          );
        } else {
          if (data.fromsingleormixed == "From Single") {
            returnSameResult(
              GetNextOrderFromSingleDiamondService({ from_mixed: false, code }),
              code,
            );
          } else {
            if (data.frommixedItem) {
              returnSameResult(
                GetNextOrderFromSingleDiamondService({
                  from_mixed: true,
                  code: `${code}-${data.frommixedItem}`,
                }),
                `${code}-${data.frommixedItem}`,
              );
            } else {
              setDiamondCode("");
            }
          }
        }
      }, 500);
    } else {
      setDiamondCode("");
    }
    return () => {
      clearTimeout(timeFunc);
    };
  }, [
    data.kesim,
    data.boy,
    data.menstrual_status,
    data.fromsingleormixed,
    data.frommixedItem,
  ]);

  useEffect(() => {
    if (data.fromsingleormixed == "From Mixed") {
      const code = generateDiamondCode({
        kesimKodu: data.kesim,
        boyKodu: data.boy,
      });
      GetListMixedProductsCodeDiamondService({ code })
        .then((resp: ResponseResult) => {
          if (resp.result) {
            const respData = resp.payload as string[];
            const sekoData: SelectOptionsType[] = respData.map((item) => ({
              titleVal: item,
              valueVal: item,
            }));
            setExtraOptions(sekoData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setExtraOptions(null);
    }
  }, [data.fromsingleormixed, data.kesim, data.boy]);

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
        extraOptions={extraOptions}
        redirectUrl="/Admin/StokYonetimi/Pirlanta/PirlantaListesi"
      />
    </DefaultLayout>
  );
};

export default PirlantaEkle;
