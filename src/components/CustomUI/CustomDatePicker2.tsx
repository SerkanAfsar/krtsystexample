import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ElementType } from "@/types/inputTypes";
import { cn } from "@/utils";
import { ClassValue } from "clsx";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { format } from "date-fns";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement> & {
    outerClass?: ClassValue | null;
    err?: string | null;
    setValue?: any;
    item: ElementType;
  },
  "onFocus" | "onChange"
>;

const CustomDatePicker2 = ({
  item,
  className,
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
    setValue &&
      setValue(name, item.format ? format(value as Date, item.format) : value);
  }, [value, name, setValue, item?.format]);

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

          err && "border-red",
        )}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        format={item?.format || null}
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
