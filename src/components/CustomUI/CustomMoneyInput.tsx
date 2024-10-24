import CurrencyInput from "react-currency-input-field";
import * as React from "react";
import { ElementType } from "../../../types/inputTypes";
import { ClassValue } from "clsx";
import { UseFormGetValues } from "react-hook-form";
import { cn } from "@/utils";

type CustomMoneyInputTpe = React.ComponentPropsWithoutRef<
  typeof CurrencyInput
> & {
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

const CustomMoneyInput = React.forwardRef<
  React.ElementRef<typeof CurrencyInput>,
  CustomMoneyInputTpe
>(
  (
    {
      item,
      className,
      name,
      icon,
      outerClass,
      err,
      getValues,
      value,
      setFormValues,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn("w-full", outerClass && outerClass, className)}>
        {(item.title || item?.isTopMargin) && (
          <label
            htmlFor={name}
            className="mb-3 block text-sm font-medium text-black dark:text-white"
          >
            {item.title}
          </label>
        )}
        <div className="flex gap-1">
          <div className="relative flex-1">
            <CurrencyInput
              id={name}
              name={name}
              ref={ref}
              decimalsLimit={2}
              placeholder={item.placeholder ?? undefined}
              onValueChange={(value, name) => setFormValues(name, value)}
              value={value}
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
CustomMoneyInput.displayName = CurrencyInput.displayName;

export { CustomMoneyInput };
