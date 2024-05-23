"use client";
import { cn } from "@/utils";
import { ClassValue } from "clsx";
import * as React from "react";
import { FieldError } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  outerClass?: ClassValue | null;
  err?: string | null;
};

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      onChange,
      onBlur,
      name,

      outerClass,
      title,
      placeholder,
      err,
      type = "text",
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn("w-full", outerClass && outerClass)}>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {title}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "w-full rounded border-[1.5px] border-stone-400 bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
            className,
            err && "border-red",
          )}
          {...rest}
        />
        {err && (
          <span className="mt-2 block w-full text-left text-red">{err}</span>
        )}
      </div>
    );
  },
);
CustomInput.displayName = "CustomInput";

export default CustomInput;
