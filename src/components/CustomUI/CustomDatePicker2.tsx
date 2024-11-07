import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ElementType } from "@/types/inputTypes";
import { cn } from "@/utils";
import { ClassValue } from "clsx";
import React, { useEffect, useState } from "react";
import DatePicker, { DatePickerProps } from "react-date-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement> & {
    outerClass?: ClassValue | null;
    err?: string | null;
    setValue?: any;
    item: ElementType;
  },
  "onFocus"
>;

const CustomDatePicker2 = ({
  item,
  className,
  onChange: deneme,
  onBlur,
  name,
  outerClass,
  err,
  value: val,
  setValue,
  ...rest
}: InputProps) => {
  const id = React.useId();

  const [value, onChange] = useState<Value>(
    val ? new Date(val?.toString()) : new Date(),
  );

  useEffect(() => {
    setValue && setValue(name, value);
  }, [value]);

  return (
    <div className={cn("w-full", outerClass && outerClass)}>
      {item.title && (
        <label
          htmlFor={id}
          className="mb-3 block text-sm font-medium text-black dark:text-white"
        >
          {item.title}
        </label>
      )}

      <DatePicker
        className={cn(
          className,
          "z-999 block h-[50px] w-full rounded-md text-black disabled:cursor-default",
          rest?.disabled && "bg-[#f5f7fd] ",
          err && "border-red",
        )}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        disabled={rest.disabled}
      />
      {err && (
        <span className="mt-2 block w-full text-left text-sm text-red">
          {err}
        </span>
      )}
    </div>
  );
};

export default CustomDatePicker2;
