import { GetSadeCodeByTypeService } from "@/Services/Product.Services";

import { useState, useEffect } from "react";
import { ResponseResult } from "../../../types/responseTypes";
import { NextOrderType } from "../../../types/inputTypes";
export default function useSadeCode({
  type,
  isAdd,
  sadeDataItemType,
  sadeDataItemCode,
}: {
  type?: string | null;
  isAdd: boolean;
  sadeDataItemType?: string | null;
  sadeDataItemCode?: string | null;
}) {
  const [sadeCode, setSadeCode] = useState<string | null>(null);
  useEffect(() => {
    if (type) {
      if (isAdd || (sadeDataItemType && type != sadeDataItemType)) {
        GetSadeCodeByTypeService({ type: type == "Stok" ? "L" : "B" })
          .then((resp: ResponseResult<NextOrderType>) => {
            const data = resp.data as NextOrderType;
            const siraNo = data.next_order;
            const newCode =
              type == "Stok"
                ? `L${siraNo.toString()}`
                : `B${siraNo.toString()}`;
            setSadeCode(newCode);
          })
          .catch((err) => {
            setSadeCode(err.message);
          });
      } else {
        setSadeCode(sadeDataItemCode || null);
      }
    } else {
      setSadeCode(null);
    }
  }, [type, isAdd, sadeDataItemType, sadeDataItemCode]);

  return { sadeCode };
}
