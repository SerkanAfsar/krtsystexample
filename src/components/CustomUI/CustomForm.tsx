"use client";
import { ElementType } from "@/types/inputTypes";
import * as React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSectionType } from "@/types/formTypes";
import CustomDatePicker from "./CustomDatePicker";

type CustomFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  section?: FormSectionType;
  formItemType: any;
  setData: any;
  setActiveStep?: any;
  data?: any;
  activeStep: number;
  stepCount: number;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const CustomForm = React.forwardRef<HTMLFormElement, CustomFormProps>(
  (
    {
      className,
      section,
      activeStep,
      setActiveStep,
      setData,
      formItemType,
      data,
      stepCount,
      ...rest
    },
    ref,
  ) => {
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm<typeof formItemType>({
      defaultValues: data,
    });

    // const [items, setItems] = React.useState<typeof formItemType>(null);

    React.useEffect(() => {
      const subscription = watch((value: typeof formItemType) => {
        setData(value);
      });
      return () => subscription.unsubscribe();
    }, [watch]);

    const retunItem: any = ({
      title,
      placeholder,
      options,
      type,
      required,
      name,
      disabled,
      relativeTo,
      ...rest
    }: ElementType) => {
      const isDisabled = data && relativeTo ? !data[relativeTo] : disabled;
      const val = (data && data[name]) || null;
      switch (type) {
        case "text":
        default: {
          return (
            <CustomInput
              {...register(name, {
                required:
                  !isDisabled && required ? rest.requiredMessage : false,
              })}
              value={rest.isCurrency ? formatter.format(val) : val}
              title={title}
              placeholder={placeholder ?? undefined}
              err={errors[name]?.message?.toString() ?? null}
              outerClass={cn(rest?.span && `col-span-${rest.span.toString()}`)}
              disabled={isDisabled}
              {...rest}
            />
          );
        }
        case "datepicker": {
          return (
            <CustomDatePicker
              {...register(name, {
                required:
                  !isDisabled && required ? rest.requiredMessage : false,
              })}
              title={title}
              err={errors[name]?.message?.toString() ?? null}
              outerClass={cn(rest.span && `col-span-${rest.span.toString()}`)}
              disabled={isDisabled}
              {...rest}
            />
          );
        }
        case "select": {
          return (
            <CustomSelect
              {...register(name, {
                required:
                  !isDisabled && required ? rest.requiredMessage : false,
              })}
              options={options ?? null}
              title={title}
              err={errors[name]?.message?.toString() ?? null}
              outerClass={cn(rest.span && `col-span-${rest.span.toString()}`)}
              disabled={isDisabled}
              {...rest}
            />
          );
        }
      }
    };

    const onSubmit: SubmitHandler<typeof formItemType> = (values) => {
      setData((prev: typeof formItemType) => ({ ...prev, values }));
      setActiveStep((prev: number) => (prev < stepCount - 1 ? prev + 1 : prev));
    };

    const setPrev = () => {
      setActiveStep((prev: number) => (prev != 0 ? prev - 1 : 0));
    };

    const setNext = () => {
      setActiveStep((prev: number) => (prev != stepCount ? prev + 1 : prev));
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        {...rest}
        ref={ref}
      >
        <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke pb-4  dark:border-strokedark">
            <h3 className="p-4 text-lg font-medium text-black dark:text-white">
              {section?.sectionTitle}
            </h3>
            <hr />

            <div
              className={cn(
                `grid grid-cols-4 gap-6 p-4`,
                section?.colsLenght
                  ? `grid-cols-${section.colsLenght.toString()}`
                  : "grid-cols-3",
              )}
            >
              {section?.elements.map((item, index) => (
                <React.Fragment key={item.name}>
                  {retunItem(item)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full items-end justify-end">
          {activeStep > 0 && (
            <button
              type="button"
              onClick={() => setPrev()}
              className="mr-5 flex w-full justify-center rounded  bg-red p-3 font-medium text-gray hover:bg-opacity-90 md:w-auto"
            >
              Geri
            </button>
          )}
          <button
            type="submit"
            className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray hover:bg-opacity-90 md:w-auto"
          >
            {activeStep == stepCount - 1 ? "Kaydet" : "İleri"}
          </button>
        </div>
      </form>
    );
  },
);
CustomForm.displayName = "CustomForm";
export default CustomForm;
