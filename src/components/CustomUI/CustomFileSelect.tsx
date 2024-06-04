import { ElementType } from "@/types/inputTypes";
import React from "react";
import { ClassValue } from "clsx";
import { cn } from "@/utils";

type CustomFileSelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
  item: ElementType;
} & {
  err?: string | null;
  outerClass?: ClassValue | null;
  className?: ClassValue | null;
  setError: any;
};
const CustomFileSelect = React.forwardRef<
  HTMLInputElement,
  CustomFileSelectProps
>(
  (
    {
      item,
      title,
      className,
      onChange,
      onBlur,
      name,
      outerClass,
      err,
      setError,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn(outerClass && outerClass, err && "border-red")}>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {title}
        </label>
        <input
          name={name}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          onBlur={onBlur}
          ref={ref}
          type="file"
          {...rest}
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        />
        {err && (
          <span className="mt-2 block w-full text-left text-sm text-red">
            {err}
          </span>
        )}
      </div>
    );
  },
);
CustomFileSelect.displayName = "CustomFileSelect";
export default CustomFileSelect;
