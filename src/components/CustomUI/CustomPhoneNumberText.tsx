"use client";
import { cn } from "@/utils";

import * as React from "react";

import { ElementType } from "../../../types/inputTypes";
import { ClassValue } from "clsx";
import { UseFormSetValue } from "react-hook-form";

type CustomPhonePropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  item: ElementType;
  err?: string | null;
  outerClass?: ClassValue | null;
  setValue?: UseFormSetValue<any>;
  value: string;
};

const CustomPhoneNumberText = React.forwardRef<
  HTMLInputElement,
  CustomPhonePropsType
>(
  (
    {
      className,
      item,
      onChange,
      setValue,
      outerClass,
      onBlur,
      name,
      err,
      value,
      ...props
    },
    ref,
  ) => {
    const [val, setVal] = React.useState<string>(value);
    const id = React.useId();

    React.useEffect(() => {
      if (setValue) {
        setValue(name || "not-set", val, {
          shouldValidate: false,
        });
      }
    }, [val, setValue, name]);

    return (
      <div className={cn("w-full", outerClass && outerClass, className)}>
        {(item.title || item?.isTopMargin) && (
          <label
            htmlFor={id}
            className="mb-3 block text-sm font-medium text-black dark:text-white"
          >
            {item.title}
          </label>
        )}
        <div className="flex gap-1">
          <div className="relative flex-1">
            <input
              id={id}
              ref={ref}
              type={item.type}
              placeholder={item.placeholder ?? undefined}
              name={name}
              value={val}
              onBlur={onBlur}
              onChange={(e) => {
                if (e.target.value.length <= 14) {
                  setVal(autoFormatPhoneNumber(e.target.value));
                }
                return false;
              }}
              {...props}
              className={cn(
                "h-full w-full rounded border-[1.5px] border-stone-400 bg-transparent px-5 py-3 pb-[14px] font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                className,
                err && "border-red",
              )}
            />
          </div>
        </div>
        {err && (
          <span className="mt-2 block w-full text-left text-sm text-red">
            {err}
          </span>
        )}
      </div>
    );
  },
);
CustomPhoneNumberText.displayName = "CustomPhoneNumberText";

export { CustomPhoneNumberText };

function autoFormatPhoneNumber(value: string) {
  try {
    let phoneNumberString = value;
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{0,3})?(\d{0,3})?(\d{0,4})?/);
    if (match) {
      if (match[1][0] == "0") {
        return;
      }
      return [
        match[1] ? "(" : "",
        match[1],
        match[2] ? ") " : "",
        match[2],
        match[3] ? "-" : "",
        match[3],
      ].join("");
    }
    return "";
  } catch (err) {
    return "";
  }
}
