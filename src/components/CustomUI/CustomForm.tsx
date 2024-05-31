"use client";
import { ElementType } from "@/types/inputTypes";
import * as React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSectionType } from "@/types/formTypes";
import CustomDatePicker from "./CustomDatePicker";
import CustomButtonGroups from "./CustomButtonGroups";
import SectionFormItem from "./SectionFormItem";

type CustomFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  sections?: FormSectionType[];
  formItemType: any;
  setData: any;
  setActiveStep?: any;
  data?: any;
  activeStep: number;
  stepCount: number;
};

const CustomForm = React.forwardRef<HTMLFormElement, CustomFormProps>(
  (
    {
      className,
      sections,
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
      setValue,
      formState: { errors },
    } = useForm<typeof formItemType>({
      defaultValues: data,
    });

    React.useEffect(() => {
      const subscription = watch((value: typeof formItemType) => {
        setData(value);
      });
      return () => subscription.unsubscribe();
    }, [watch, setData]);

    const onSubmit: SubmitHandler<typeof formItemType> = (values) => {
      setData((prev: typeof formItemType) => ({ ...prev, values }));
      setActiveStep((prev: number) => (prev < stepCount - 1 ? prev + 1 : prev));
    };

    const setPrev = () => {
      setActiveStep((prev: number) => (prev != 0 ? prev - 1 : 0));
    };

    // const setNext = () => {
    //   setActiveStep((prev: number) => (prev != stepCount ? prev + 1 : prev));
    // };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        {...rest}
        ref={ref}
      >
        {sections?.map((section, index) => (
          <SectionFormItem
            data={data}
            setValue={setValue}
            errors={errors}
            register={register}
            section={section}
            key={section.sectionTitle}
          />
        ))}

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
