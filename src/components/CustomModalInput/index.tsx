import { useEffect, useState } from "react";
import { SeciliUrunType } from "../IsEmirleri/UrunGruplariModul";
import React from "react";
import { CustomProps } from "../../types/CustomUI.Types";
import { formatToCurrency } from "@/utils";
import { toast } from "react-toastify";

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
                ? Number(maliyet * Number(caratValue))
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
        style={{
          height:"23px"
        }}
        onChange={(e) =>{
          if (name === "used_carat") {
            if (item?.properties?.remaining_carat && e.target.value > item?.properties?.remaining_carat) {
              toast.error(`Girdiğiniz karat miktarı ${Number(item.properties.remaining_carat).toFixed(2)} ile sınırlıdır!`, {
                position: "top-right",
              });
              e.target.value = String(Number(item.properties.remaining_carat).toFixed(2));
            }
            setCaratValue(e.target.value);
          } else if (name === "adet") {
            setAdetValue(e.target.value);
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
