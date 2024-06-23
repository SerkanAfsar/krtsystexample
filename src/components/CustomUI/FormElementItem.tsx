import { ElementType } from "@/types/inputTypes";
import CustomInput from "./CustomInput";
import CustomButtonGroups from "./CustomButtonGroups";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import CustomFileSelect from "./CustomFileSelect";
import { SelectOptionsType } from "./CustomForm";

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
  setError,
  extraOptions,
}: {
  item: ElementType;
  register: any;
  data: any;
  errors: any;
  setValue: any;
  setError: any;
  extraOptions?: SelectOptionsType[] | null;
}) {
  const firstCondition =
    (data &&
      item.relativeTo &&
      item.visibleRelative &&
      data[item.relativeTo] !== item.visibleRelative) ||
    undefined;

  if (firstCondition) {
    return null;
  }

  const secondCondition =
    data && item.relativeTo ? !data[item.relativeTo] : item.disabled;

  const isDisabled = firstCondition || secondCondition;

  const val = (data && data[item.name]) || item.value || null;

  const colSpan =
    item.spesificRelatedItem &&
    item.relativeTo &&
    item.spesificRelatedItem == data[item.relativeTo]
      ? "1"
      : item.span;

  const err = errors[item.name]?.message?.toString() ?? null;

  switch (item.type) {
    case "text":
    default: {
      return (
        <CustomInput
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
            ...item.extraValidations,
          })}
          value={item.isCurrency ? formatter.format(val) : val}
          err={err}
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          item={item}
          disabled={isDisabled}
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
          outerClass={cn(item.span ? `col-span-${item.span}` : `col-span-full`)}
          register={register}
          name={item.name}
          value={val}
        />
      );
    }
    case "datepicker": {
      register(item.name, {
        required: item.required,
      });
      return (
        <CustomDatePicker
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
          })}
          item={item}
          setValue={setValue}
          err={err}
          outerClass={cn(item.span && `col-span-${item.span.toString()}`)}
          disabled={isDisabled}
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
          item={item}
          extraOptions={extraOptions}
          err={err}
          outerClass={cn(item.span && `col-span-${colSpan}`)}
          disabled={isDisabled}
        />
      );
    }
    case "file": {
      return (
        <CustomFileSelect
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
          })}
          item={item}
          err={err}
          outerClass={cn(
            item.span && `col-span-${colSpan}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          disabled={isDisabled}
          setError={setError}
        />
      );
    }
  }
}
