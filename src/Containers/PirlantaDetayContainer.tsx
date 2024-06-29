"use client";
import CustomForm, {
  SelectOptionsType,
} from "@/components/CustomUI/CustomForm";
import { AddStoneSections } from "@/utils/MockData";
import { AddDiamondType } from "@/types/formTypes";
import { useCallback, useEffect, useState } from "react";
import { generateDiamondCode } from "@/utils";
import { AddProductType, ResponseResult } from "@/types/responseTypes";
import {
  AddProductService,
  GetListMixedProductsCodeDiamondService,
  GetNextOrderForMixedDiamondService,
  GetNextOrderFromSingleDiamondService,
  UpdateProductService,
} from "@/Services/Product.Services";

const PirlantaDetayContainer = ({
  pirlantaItemData,
  isAdd,
}: {
  pirlantaItemData: (AddDiamondType & { code: string }) | null;
  isAdd: boolean;
}) => {
  const diamondItem: AddDiamondType = pirlantaItemData ?? {};
  const [data, setData] = useState<AddDiamondType>(diamondItem);
  const [diamondCode, setDiamondCode] = useState<string | null>(null);
  const [extraOptions, setExtraOptions] = useState<SelectOptionsType[] | null>(
    null,
  );
  const [activeStep, setActiveStep] = useState<number>(0);

  const resultCallBack = useCallback((value: any) => {
    const iskonto = value?.iskonto || 0;
    const newResult = (2500 * (100 - iskonto)) / 100;
    const newToplamFiyat = newResult * value?.carat;
    return {
      pricePerCarat: newResult,
      total_cost: newToplamFiyat,
    };
  }, []);

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

    const condition =
      isAdd ||
      (pirlantaItemData?.kesim && data.kesim != pirlantaItemData.kesim) ||
      (pirlantaItemData?.boy && pirlantaItemData.boy != data.boy) ||
      (pirlantaItemData?.fromsingleormixed &&
        pirlantaItemData.fromsingleormixed != data.fromsingleormixed) ||
      (pirlantaItemData?.frommixedItem &&
        pirlantaItemData.frommixedItem != data.frommixedItem);

    if (data.kesim && data.boy) {
      if (condition) {
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
                GetNextOrderFromSingleDiamondService({
                  from_mixed: false,
                  code,
                }),
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
        setDiamondCode(pirlantaItemData?.code || null);
      }
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
    pirlantaItemData?.boy,
    pirlantaItemData?.kesim,
    pirlantaItemData?.code,
    pirlantaItemData?.frommixedItem,
    pirlantaItemData?.fromsingleormixed,
    isAdd,
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
      const totalElems = [...next.elements, ...(next.extraElements ?? [])];
      const elems = totalElems.reduce((acc2, next2) => {
        const name = next2.name as keyof AddDiamondType;
        if (data[name]) {
          return {
            ...acc2,
            [name]: next2.type == "number" ? Number(data[name]) : data[name],
          };
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
    <CustomForm
      isAdd={isAdd}
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddStoneSections.filter((a) => a.groupNumber == activeStep)}
      data={data}
      stepCount={2}
      serviceFunction={isAdd ? AddProductService : UpdateProductService}
      filteredData={newData}
      productCode={diamondCode}
      extraOptions={extraOptions}
      resultCallBack={resultCallBack}
      redirectUrl="/Admin/StokYonetimi/Pirlanta/PirlantaListesi"
    />
  );
};

export default PirlantaDetayContainer;
