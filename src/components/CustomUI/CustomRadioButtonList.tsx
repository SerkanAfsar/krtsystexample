import { useState } from "react";
import { ElementType } from "../../types/inputTypes";
import { cn } from "@/utils";
import { UseFormSetValue } from "react-hook-form";
import React from "react";
import { ClassValue } from "clsx";

const CustomRadioButtonList = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    values: string[];
    name: string;
    item: ElementType;
    setValue: UseFormSetValue<any>;
    defaultValue: string;
    outerClass?: ClassValue;
  }
>(
  (
    { values, name, outerClass, defaultValue, item, setValue, ...props },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(
      defaultValue || values[0],
    );
    React.useEffect(() => {
      setValue(name || "not-set", selectedValue, {
        shouldValidate: true,
      });
    }, [selectedValue, setValue, name]);

    return (
      <div className={cn("w-full", outerClass && outerClass)}>
        {(item?.title || item?.isTopMargin) && (
          <label className="mb-3 block w-full text-sm font-medium text-black dark:text-white">
            {item.title}
          </label>
        )}
        <fieldset className={cn("mt-4 flex gap-4", item.mt && `mt-${item.mt}`)}>
          {values.map((value, index) => (
            <div key={index}>
              <label
                className="flex cursor-pointer select-none items-center"
                htmlFor={value}
                onChange={() => setSelectedValue(value)}
              >
                <input
                  type="radio"
                  className="sr-only"
                  id={value}
                  name={name}
                  value={value}
                  defaultChecked={selectedValue == value}
                  // onChange={() => setSelectedValue(value)}
                  {...props}
                  ref={ref}
                />
                <div
                  className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                    selectedValue == value && "border-primary"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                      selectedValue == value && "!bg-primary"
                    }`}
                  >
                    {" "}
                  </span>
                </div>
                {value}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    );
  },
);
CustomRadioButtonList.displayName = "CustomRadioButtonList";
export { CustomRadioButtonList };
