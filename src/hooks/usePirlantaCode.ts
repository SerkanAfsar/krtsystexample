import {
  GetListMixedProductsCodeDiamondService,
  GetNextOrderForMixedDiamondService,
  GetNextOrderFromSingleDiamondService,
} from "@/Services/Product.Services";
import { SelectOptionsType } from "@/components/CustomUI/CustomForm";
import { ResponseResult } from "@/types/responseTypes";
import { GetNextOrderType } from "@/types/types";
import { generateDiamondCode } from "@/utils";
import { useState, useEffect } from "react";

export type PirlantaCodeItemType = {
  data_kesim?: string;
  data_boy?: string | number;
  data_menstrual_status?: string;
  data_fromsingleormixed?: string;
  data_frommixedItem?: string;
  pirlantaData_Boy?: string;
  pirlantaData_Kesim?: string;
  pirlandaData_Code?: string;
  pirlantaData_frommixedItem?: string;
  pirlantaData_fromsingleormixed?: string;
  isAdd: boolean;
};

export default function usePirlantaCode({
  item: {
    data_boy,
    data_frommixedItem,
    data_fromsingleormixed,
    data_kesim,
    data_menstrual_status,
    isAdd,
    pirlandaData_Code,
    pirlantaData_Boy,
    pirlantaData_Kesim,
    pirlantaData_frommixedItem,
    pirlantaData_fromsingleormixed,
  },
}: {
  item: PirlantaCodeItemType;
}) {
  const [diamondCode, setDiamondCode] = useState<string | null>(null);
  const [extraOptions, setExtraOptions] = useState<SelectOptionsType[] | null>(
    null,
  );

  const returnSameResult = (promiseFunc: Promise<any>, code: string) => {
    return promiseFunc
      .then((resp: ResponseResult<GetNextOrderType>) => {
        if (resp.success) {
          const data = resp.data as GetNextOrderType;
          setDiamondCode(`${code}-${data.next_order}`);
        } else {
          setDiamondCode(resp.error ? resp.error[0] : "Hata");
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
      (pirlantaData_Kesim && data_kesim != pirlantaData_Kesim) ||
      (pirlantaData_Boy && pirlantaData_Boy != data_boy) ||
      (pirlantaData_fromsingleormixed &&
        pirlantaData_fromsingleormixed != data_fromsingleormixed) ||
      (pirlantaData_frommixedItem &&
        pirlantaData_frommixedItem != data_frommixedItem);

    if (data_kesim && data_boy) {
      if (condition) {
        timeFunc = setTimeout(() => {
          const code = generateDiamondCode({
            kesimKodu: data_kesim,
            boyKodu: data_boy as string,
          });

          if (data_menstrual_status == "Sertifikasız") {
            returnSameResult(
              GetNextOrderForMixedDiamondService({ type: "Diamond", code }),
              code,
            );
          } else {
            if (data_fromsingleormixed == "From Single") {
              returnSameResult(
                GetNextOrderFromSingleDiamondService({
                  from_mixed: false,
                  code,
                  type: "Diamond",
                }),
                code,
              );
            } else {
              if (data_frommixedItem) {
                returnSameResult(
                  GetNextOrderFromSingleDiamondService({
                    from_mixed: true,
                    code: `${code}-${data_frommixedItem}`,
                    type: "Diamond",
                  }),
                  `${code}-${data_frommixedItem}`,
                );
              } else {
                setDiamondCode("");
              }
            }
          }
        }, 500);
      } else {
        setDiamondCode(pirlandaData_Code || null);
      }
    } else {
      setDiamondCode("");
    }
    return () => {
      clearTimeout(timeFunc);
    };
  }, [
    data_kesim,
    data_boy,
    data_menstrual_status,
    data_fromsingleormixed,
    data_frommixedItem,
    pirlantaData_Boy,
    pirlantaData_Kesim,
    pirlandaData_Code,
    pirlantaData_frommixedItem,
    pirlantaData_fromsingleormixed,
    isAdd,
  ]);

  useEffect(() => {
    if (data_fromsingleormixed == "From Mixed") {
      const code = generateDiamondCode({
        kesimKodu: data_kesim,
        boyKodu: data_boy as string,
      });
      GetListMixedProductsCodeDiamondService({ code, type: "Diamond" })
        .then((resp: ResponseResult<string[]>) => {
          if (resp.success) {
            const respData = resp.data as string[];
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
  }, [data_fromsingleormixed, data_kesim, data_boy]);

  return {
    diamondCode,
    extraOptions,
  };
}
