import { GetSadeCodeByTypeService } from "@/Services/Product.Services";
import { ResponseResult } from "@/types/responseTypes";
import { useState, useEffect } from "react";
export default function useSadeCode({
  type,
  isAdd,
  sadeDataItemType,
  sadeDataItemCode,
}: {
  type: string | undefined;
  isAdd: boolean;
  sadeDataItemType: string | undefined;
  sadeDataItemCode: string | undefined;
}) {
  const [sadeCode, setSadeCode] = useState<string | null>(null);
  useEffect(() => {
    if (type) {
      if (isAdd || (sadeDataItemType && type != sadeDataItemType)) {
        GetSadeCodeByTypeService({ type: type == "Stok" ? "L" : "B" })
          .then((resp: ResponseResult) => {
            const siraNo = resp.payload["next_order"] as number;
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
