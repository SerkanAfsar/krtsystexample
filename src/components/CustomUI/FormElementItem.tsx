import { ElementType } from "@/types/inputTypes";
import CustomInput from "./CustomInput";
import CustomButtonGroups from "./CustomButtonGroups";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function FormElementItem({
  item,
  register,
  data,
  setValue,
  errors,
  ...rest
}: {
  item: ElementType;
  register: any;
  data: any;
  errors: any;
  setValue: any;
}) {
  const firstCondition =
    (data &&
      item.relativeTo &&
      item.visibleRelative &&
      data[item.relativeTo] !== item.visibleRelative) ||
    undefined;

  const secondCondition =
    data && item.relativeTo ? !data[item.relativeTo] : item.disabled;

  const isDisabled = firstCondition || secondCondition;

  const val = (data && data[item.name]) || null;

  if (firstCondition) {
    return null;
  }

  const colSpan =
    item.spesificRelatedItem &&
    item.relativeTo &&
    item.spesificRelatedItem == data[item.relativeTo]
      ? "1"
      : item.span;

  switch (item.type) {
    case "text":
    default: {
      return (
        <CustomInput
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
          })}
          value={item.isCurrency ? formatter.format(val) : val}
          title={item.title}
          placeholder={item.placeholder ?? undefined}
          err={errors[item.name]?.message?.toString() ?? null}
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
          )}
          rightIcon={item.rightIcon}
          disabled={isDisabled}
          simgeturu={item.simgeturu}
          {...rest}
        />
      );
    }
    case "customButtonGroup": {
      register(item.name, {
        required: item.required,
      });
      return (
        <CustomButtonGroups
          title={item.title}
          checkBoxList={item.checkBoxList || ["DATA YOK"]}
          setValue={setValue}
          outerClass={cn(item.span && `col-span-full`)}
          register={register}
          name={item.name}
          value={val}
          {...rest}
        />
      );
    }
    case "datepicker": {
      return (
        <CustomDatePicker
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
          })}
          title={item.title}
          err={errors[item.name]?.message?.toString() ?? null}
          outerClass={cn(item.span && `col-span-${item.span.toString()}`)}
          disabled={isDisabled}
          {...rest}
        />
      );
    }
    case "select": {
      return (
        <CustomSelect
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
          })}
          options={item.options ?? null}
          title={item.title ?? undefined}
          err={errors[item.name]?.message?.toString() ?? null}
          outerClass={cn(item.span && `col-span-${colSpan}`)}
          disabled={isDisabled}
          {...rest}
        />
      );
    }
  }
}
