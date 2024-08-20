import {
  GetListMixedProductsCodeDiamondService,
  GetNextOrderForMixedDiamondService,
  GetNextOrderFromSingleDiamondService,
} from "@/Services/Product.Services";

import { ResponseResult } from "../../../types/responseTypes";
import { GetNextOrderType } from "../../../types/types";
import { useState, useEffect } from "react";
import { CustomOptionType } from "../../../types/inputTypes";

export default function useRenkliTasCode({
  dataRenkliTasCode,
  itemRenkliTasCode,
  data_menstrual_status,
  data_fromsingleormixed,
  data_frommixedItem,
  item_fromsingleormixed,
  item_frommixedItem,
  productCode,
  isAdd,
}: {
  dataRenkliTasCode?: string;
  isAdd: boolean;
  data_menstrual_status?: string;
  itemRenkliTasCode?: string | null;
  data_frommixedItem?: string | null;
  data_fromsingleormixed?: string | null;
  item_fromsingleormixed?: string | null;
  item_frommixedItem?: string | null;
  productCode?: string | null;
}) {
  const [renkliTasCode, setRenkliTasCode] = useState<string | null>(null);
  const [extraOptions, setExtraOptions] = useState<CustomOptionType[] | null>(
    null,
  );

  const returnSameResult = (promiseFunc: Promise<any>, code: string) => {
    return promiseFunc
      .then((resp: ResponseResult<GetNextOrderType>) => {
        if (resp?.success) {
          const data = resp.data as GetNextOrderType;
          setRenkliTasCode(`${code}-${data.next_order}`);
        } else {
          setRenkliTasCode(resp.error ? resp.error[0] : "Hata");
        }
      })
      .catch((err) => {
        setRenkliTasCode(err);
      });
  };

  useEffect(() => {
    let timeFunc: any;
    const condition = isAdd;

    if (dataRenkliTasCode) {
      if (condition) {
        timeFunc = setTimeout(() => {
          if (data_menstrual_status == "Sertifikasız") {
            returnSameResult(
              GetNextOrderForMixedDiamondService({
                type: "ColoredStone",
                code: dataRenkliTasCode as string,
              }),
              dataRenkliTasCode as string,
            );
          } else {
            if (data_fromsingleormixed == "From Single") {
              returnSameResult(
                GetNextOrderFromSingleDiamondService({
                  from_mixed: false,
                  code: dataRenkliTasCode as string,
                  type: "ColoredStone",
                }),
                dataRenkliTasCode as string,
              );
            } else {
              if (data_frommixedItem) {
                returnSameResult(
                  GetNextOrderFromSingleDiamondService({
                    from_mixed: true,
                    code: `${dataRenkliTasCode}-${data_frommixedItem}`,
                    type: "ColoredStone",
                  }),
                  `${dataRenkliTasCode}-${data_frommixedItem}`,
                );
              } else {
                setRenkliTasCode("");
              }
            }
          }
        }, 500);
      } else {
        setRenkliTasCode(productCode || null);
      }
    } else {
      setRenkliTasCode("");
    }
    return () => {
      clearTimeout(timeFunc);
    };
  }, [
    data_menstrual_status,
    data_fromsingleormixed,
    data_frommixedItem,
    dataRenkliTasCode,
    itemRenkliTasCode,
    item_fromsingleormixed,
    item_frommixedItem,
    productCode,
    isAdd,
  ]);

  useEffect(() => {
    if (data_fromsingleormixed == "From Mixed") {
      GetListMixedProductsCodeDiamondService({
        code: dataRenkliTasCode as string,
        type: "ColoredStone",
      })
        .then((resp: ResponseResult<string[]>) => {
          if (resp?.success) {
            const respData = resp.data as string[];
            const sekoData: CustomOptionType[] = respData.map((item) => ({
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
  }, [data_fromsingleormixed, dataRenkliTasCode]);

  return {
    renkliTasCode,
    extraOptions,
  };
}
