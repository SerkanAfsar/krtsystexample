import { CustomOptionType, ElementType } from "../../types/inputTypes";
import CustomInput from "./CustomInput";
import CustomButtonGroups from "./CustomButtonGroups";
// import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import CustomFileSelect from "./CustomFileSelect";

import { UseFormGetValues } from "react-hook-form";
import CustomTextArea from "./CustomTextArea";
import { CustomRadioButtonList } from "./CustomRadioButtonList";
import { CustomPhoneNumberText } from "./CustomPhoneNumberText";
import { CustomMoneyInput } from "./CustomMoneyInput";
import CustomDatePicker2 from "./CustomDatePicker2";

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
  unregister,
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
  unregister?: any;
  getValues: UseFormGetValues<any>;
}) {
  const firstCondition =
    (data &&
      item.relativeTo &&
      item.visibleRelative &&
      data[item.relativeTo] !== item.visibleRelative) ||
    undefined;

  if (firstCondition) {
    const values = getValues && getValues();
    if (values[item.name]) {
      unregister && unregister(item.name);
    }
    return null;
  }

  const isDisabled =
    (data &&
      item.relativeTo &&
      item.disabledRelative &&
      data[item.relativeTo] == item.disabledRelative) ||
    (item.relativeTo && !data[item.relativeTo]) ||
    item.disabled;

  const val = (data && data[item.name]) || item.value || null;

  const title =
    (item.titleRelativeField &&
      data[item.titleRelativeField] == item.titleRelativeValue &&
      item.secondTitle) ||
    item.title;

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
    case "money": {
      return (
        <CustomMoneyInput
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
            ...item.extraValidations,
          })}
          setFormValues={setValue}
          err={err}
          key={item.name}
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
          value={val}
          showIcon={showIconRelativeTo}
          item={item}
          getValues={getValues}
          disabled={isDisabled}
          {...rest}
        />
      );
    }
    case "text":
    default: {
      return (
        <CustomInput
          {...register(item.name, {
            valueAsNumber: item.type == "number",
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
            item.moveToTop && "mt-[-115px]",
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
          itemLanguageList={item.itemLanguageList}
          setValue={setValue}
          outerClass={cn(item.span ? `col-span-${item.span}` : `col-span-full`)}
          register={register}
          name={item.name}
          isFull={item.isFull}
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
        <CustomDatePicker2
          {...register(item.name, {
            required:
              !isDisabled && item.required ? item.requiredMessage : false,
          })}
          key={item.name}
          item={item}
          setValue={setValue}
          err={err}
          value={val}
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
            item.moveToTop && "mt-[-115px]",
          )}
          getValues={getValues}
          disabled={(!isAdd && item.isCodeRelated) || isDisabled}
          staticOptions={item.staticOptions}
          showIcon={showIconRelativeTo}
          setValue={setValue}
          title={title}
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
          outerClass={cn(
            item?.span && `col-span-${item.span.toString()}`,
            item.colStart && `col-start-${item.colStart}`,
            item.colEnd && `col-end-${item.colEnd}`,
            item.rowSpan && `row-span-${item.rowSpan}`,
          )}
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
