import {
  GetListMixedProductsCodeDiamondService,
  GetNextOrderForMixedDiamondService,
  GetNextOrderFromSingleDiamondService,
} from "@/Services/Product.Services";
import { SelectOptionsType } from "@/components/CustomUI/CustomForm";
import { ResponseResult } from "../../types/responseTypes";
import { GetNextOrderType } from "../../types/types";
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
  data_carat?: number;
  isAdd: boolean;
};

export default function usePirlantaCode({
  item: {
    data_boy,
    data_frommixedItem,
    data_fromsingleormixed,
    data_kesim,
    data_menstrual_status,
    data_carat,
    isAdd,
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

    const condition = isAdd;

    // if (data_kesim && data_boy) {

    // } else {
    //   setDiamondCode("");
    // }

    if (condition) {
      timeFunc = setTimeout(() => {
        if (data_menstrual_status == "Sertifikasız") {
          if (data_boy && data_kesim) {
            const code = generateDiamondCode({
              kesimKodu: data_kesim,
              boyKodu: data_boy as string,
            });
            returnSameResult(
              GetNextOrderForMixedDiamondService({ type: "Diamond", code }),
              code,
            );
          } else {
            setDiamondCode(null);
          }
        } else {
          const code = generateDiamondCode({
            kesimKodu: data_kesim,
            caratValue: data_carat,
          });

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
      setDiamondCode(null);
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
    data_carat,
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
