import { CustomOptionType, ElementType } from "../../../types/inputTypes";
import CustomInput from "./CustomInput";
import CustomButtonGroups from "./CustomButtonGroups";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import CustomFileSelect from "./CustomFileSelect";

import { UseFormGetValues } from "react-hook-form";
import CustomTextArea from "./CustomTextArea";
import { CustomRadioButtonList } from "./CustomRadioButtonList";
import { CustomPhoneNumberText } from "./CustomPhoneNumberText";

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
  isAdd,
  getValues,
  ...rest
}: {
  item: ElementType;
  register: any;
  data: any;
  errors: any;
  setValue: any;
  setError: any;
  extraOptions?: CustomOptionType[] | null;
  isAdd: boolean;
  getValues: UseFormGetValues<any>;
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

  const isDisabled =
    (data &&
      item.relativeTo &&
      data[item.relativeTo] == item.disabledRelative) ||
    (item.relativeTo && !data[item.relativeTo]);
  item.disabled;

  const val = (data && data[item.name]) || item.value || null;

  const colSpan =
    item.spesificRelatedItem &&
    item.relativeTo &&
    item.spesificRelatedItem == data[item.relativeTo]
      ? "1"
      : item.span;

  const showIconRelativeTo =
    item.relativeTo &&
    item.showIconRelativeTo &&
    item.showIconRelativeTo == data[item.relativeTo];

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
          setFormValues={setValue}
          value={item.isCurrency ? formatter.format(val) : val}
          err={err}
          key={item.name}
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          showIcon={showIconRelativeTo}
          item={item}
          getValues={getValues}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
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
          key={item.name}
          title={item.title}
          checkBoxList={item.checkBoxList || ["DATA YOK"]}
          setValue={setValue}
          outerClass={cn(item.span ? `col-span-${item.span}` : `col-span-full`)}
          register={register}
          name={item.name}
          value={val}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
          {...rest}
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
          key={item.name}
          item={item}
          setValue={setValue}
          err={err}
          outerClass={cn(item.span && `col-span-${item.span.toString()}`)}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
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
          key={item.name}
          item={item}
          extraOptions={extraOptions}
          err={err}
          outerClass={cn(
            item.span && `col-span-${colSpan}`,
            item.moveToTop && "mt-[-110px]",
          )}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
          staticOptions={item.staticOptions}
          showIcon={showIconRelativeTo}
          {...rest}
        />
      );
    }
    case "file": {
      return (
        <CustomFileSelect
          {...register(item.name, {
            required:
              isAdd && !isDisabled && item.required
                ? item.requiredMessage
                : false,
          })}
          key={item.name}
          item={item}
          err={err}
          addedImage={data?.image}
          outerClass={cn(
            item.span && `col-span-${colSpan}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
          setError={setError}
          {...rest}
        />
      );
    }
    case "textarea": {
      return (
        <CustomTextArea
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
            ...item.extraValidations,
          })}
          value={val}
          err={err}
          key={item.name}
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          item={item}
          className="w-full"
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
          {...rest}
        />
      );
    }
    case "radiobuttonlist": {
      return (
        <CustomRadioButtonList
          defaultValue={val}
          values={item.checkBoxList as string[]}
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
            ...item.extraValidations,
          })}
          name={item.name}
          item={item}
          setValue={setValue}
          {...rest}
        />
      );
    }
    case "tel": {
      return (
        <CustomPhoneNumberText
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
            ...item.extraValidations,
          })}
          value={val}
          err={err}
          key={item.name}
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          setValue={setValue}
          item={item}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
          {...rest}
        />
      );
    }
  }
}
