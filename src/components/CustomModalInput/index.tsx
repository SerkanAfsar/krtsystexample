import { useEffect, useState } from "react";
import { SeciliUrunType } from "../IsEmirleri/UrunGruplariModul";
import React from "react";
import { CustomProps } from "../../../types/CustomUI.Types";
import { formatToCurrency } from "@/utils";

const CustomModalInput = React.forwardRef<HTMLInputElement, CustomProps>(
  (
    {
      setSelectedValues,
      item,
      spanMaliyetRefs,
      name,
      indexNo,
      val,
      condition,
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(val);

    useEffect(() => {
      setSelectedValues((prev: SeciliUrunType[]) => {
        const index = prev.findIndex((a) => a.pk == Number(item.pk));

        if (index > -1) {
          const spanRef = spanMaliyetRefs.current[indexNo];
          let maliyet = Number(spanRef.ariaLabel);

          if (name == "used_carat") {
            maliyet =
              value && item.menstrual_status == "Mixed"
                ? Number(maliyet * Number(value))
                : maliyet;

            spanRef.textContent = `${formatToCurrency(maliyet)} $`;
          }

          prev[index] = {
            ...prev[index],
            [name]: value,
            maliyet: `${formatToCurrency(maliyet)} $`,
            firstPrice: maliyet,
          };
        }
        return [...prev];
      });
    }, [
      value,
      indexNo,
      item.menstrual_status,
      item.pk,
      name,
      setSelectedValues,
      item.properties?.carat,
      spanMaliyetRefs,
    ]);
    return (
      <input
        type="number"
        name={`${name}_${item.pk}`}
        ref={ref}
        disabled={!condition}
        className="block w-20 border border-primary px-2 py-1"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        {...rest}
      />
    );
  },
);
CustomModalInput.displayName = "CustomModalInput";

export default CustomModalInput;
