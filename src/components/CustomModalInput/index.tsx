import { useEffect, useState } from "react";
import { SeciliUrunType } from "../IsEmirleri/UrunGruplariModul";
import React from "react";
import { CustomProps } from "../../types/CustomUI.Types";
import { formatToCurrency } from "@/utils";


const CustomModalInput = React.forwardRef<HTMLInputElement, CustomProps>(
  (
    {
      setSelectedValues,
      item,
      spanMaliyetRefs,
      name,
      indexNo,
      adetVal,
      caratVal,
      condition,
      ...rest
    },
    ref,
  ) => {
    const [adetValue, setAdetValue] = useState<string>(adetVal);
    const [caratValue, setCaratValue] = useState<string>(caratVal);
    
    useEffect(() => {
      setSelectedValues((prev: SeciliUrunType[]) => {
        const index = prev.findIndex((a) => a.pk == Number(item.pk));
        if (index > -1) {
          const spanRef = spanMaliyetRefs.current[indexNo];
          let maliyet = Number(spanRef.ariaLabel);
          let caratMaliyet = Number(spanRef.ariaLabel);
          if (name == "used_carat") {
            maliyet =
            caratValue && item.menstrual_status == "Mixed"
                ? Number(maliyet * Number(caratValue)* Number(prev[index].adet))
                : maliyet;

            spanRef.textContent = `${formatToCurrency(maliyet)} $`;
          }

          if (name == "adet") {
            maliyet =
            adetValue && item.menstrual_status == "Mixed"
                ? Number(maliyet * Number(adetValue)* Number(prev[index].used_carat))
                : maliyet;

            spanRef.textContent = `${formatToCurrency(maliyet)} $`;
          }
          prev[index] = {
            ...prev[index],
            [name]: name === "used_carat" ? caratValue : adetValue,
            maliyet: `${formatToCurrency(maliyet)} $`,
            firstPrice: maliyet,
            caratPrice: caratMaliyet
          };
        }
        return [...prev];
      });
    }, [
      adetValue,
      caratValue,
    ]);
    return (
      <input
        type="number"
        name={`${name}_${item.pk}`}
        ref={ref}
        disabled={!condition}
        className="block w-20 border border-primary px-2 py-1"
        onChange={(e) =>{
          const newValue = e.target.value;
          if (name === "used_carat") {
            setCaratValue(newValue);
          } else if (name === "adet") {
            setAdetValue(newValue);
          }
        }}
        value={name === "used_carat" ? caratValue : adetValue} 
        {...rest}
      />
    );
  },
);
CustomModalInput.displayName = "CustomModalInput";

export default CustomModalInput;
