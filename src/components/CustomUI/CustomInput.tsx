"use client";
import { ElementType } from "../../../types/inputTypes";
import { cn } from "@/utils";
import { ClassValue } from "clsx";
import * as React from "react";
import { caratType } from "@/utils/Pirlanta.Utils";
import Link from "next/link";
import { UseFormGetValues } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  item: ElementType;
  err?: string | null;
  outerClass?: ClassValue | null;
  icon?: React.ReactNode;
  className?: ClassValue | null;
  showIcon?: boolean;
  getValues?: UseFormGetValues<any>;
  setFormValues?: any;
  value?: any;
};

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      item,
      className,
      showIcon = true,
      onChange,
      onBlur,
      name,
      icon,
      outerClass,
      err,
      getValues,
      setFormValues,
      ...rest
    },
    ref,
  ) => {
    const id = React.useId();

    const value: string = getValues && getValues(name as string);
    const [maxLenght, setMaxLenght] = React.useState<number | undefined>(
      undefined,
    );

    const { area } = getValues && getValues();

    React.useEffect(() => {
      if (item.type != "email" && setFormValues) {
        setFormValues(name as string, value?.toUpperCase());
      }
    }, [value]);

    React.useEffect(() => {
      if (item?.maxLenghtCondition && area) {
        if (area == item?.maxLenghtCondition?.property && setFormValues) {
          setFormValues(name as string, value?.substring(0, 11));
          setMaxLenght(item?.maxLenghtCondition?.property as number);
        } else {
          setMaxLenght(undefined);
        }
      }
    }, [item?.maxLenghtCondition, area]);

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
              onChange={(e) => {
                if (
                  !maxLenght ||
                  (maxLenght && e.target.value.length <= maxLenght)
                ) {
                  onChange && onChange(e);
                }
              }}
              onBlur={onBlur}
              className={cn(
                "h-full w-full rounded border-[1.5px] border-stone-400 bg-transparent px-5 py-3 pb-[14px] font-normal  text-black outline-none transition placeholder:capitalize focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                className,
                err && "border-red",
                item.rightIcon && "pr-[45px]",
              )}
              {...rest}
            />
            {item.rightIcon && (
              <div className="absolute right-0 top-0 flex h-full w-[40px] items-center justify-center rounded rounded-l-none bg-black text-white">
                {item.rightIcon}
              </div>
            )}
            {icon && icon}
            {item.isLinkedWithIcon && (
              <Link
                target="_blank"
                href={item.extraFunction ? item.extraFunction(getValues) : "#"}
                className="absolute right-0 top-0 flex h-full w-[40px] items-center justify-center rounded rounded-l-none bg-black text-white"
              >
                {item.rightIcon}
              </Link>
            )}
          </div>
          {item.simgeturu == "caratType" && value && showIcon && (
            <div className="flex h-full  items-center justify-center rounded-sm bg-primary px-2 py-3 text-white">
              {caratType(parseFloat(value))}
            </div>
          )}
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
CustomInput.displayName = "CustomInput";

export default CustomInput;
