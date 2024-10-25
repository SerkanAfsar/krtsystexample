"use client";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSectionType } from "../../../types/formTypes";
import SectionFormItem from "./SectionFormItem";

import { useParams, useRouter } from "next/navigation";
import { CustomOptionType } from "../../../types/inputTypes";

type CustomFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  sections?: FormSectionType[];
  setData: any;
  setActiveStep?: any;
  data?: any;
  activeStep: number;
  stepCount: number;
  serviceFunction?: any | null;
  filteredData?: any | null;
  productCode?: string | null;
  redirectUrl?: string;
  extraOptions?: CustomOptionType[] | null;
  isAdd: boolean;
  resultCallBack?: any;
  unRegisterCallback?: any;
  extraCallBack?: any;
};

const CustomForm = React.forwardRef<HTMLFormElement, CustomFormProps>(
  (
    {
      className,
      sections,
      activeStep,
      setActiveStep,
      setData,
      data,
      stepCount,
      serviceFunction,
      filteredData,
      productCode,
      redirectUrl,
      extraOptions,
      resultCallBack,
      isAdd,
      extraCallBack,
      ...rest
    },
    ref,
  ) => {
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      setError,
      getValues,
      unregister,
      formState: { errors, isSubmitting },
    } = useForm<any>({
      defaultValues: data,
    });
    const { id } = useParams();
    const router = useRouter();

    React.useEffect(() => {
      const subscription = watch((value: any) => {
        const returnResult = resultCallBack && resultCallBack(value);
        setData({ ...value, ...returnResult });
      });
      return () => subscription.unsubscribe();
    }, [watch, setData, resultCallBack]);

    const onSubmit: SubmitHandler<any> = async (values) => {
      setData((prev: any) => ({ ...prev, values }));
      setActiveStep((prev: number) => (prev < stepCount - 1 ? prev + 1 : prev));

      if (activeStep == stepCount - 1 && serviceFunction && filteredData) {
        await serviceFunction({
          id: id ?? null,
          data: filteredData,
          callBack: () => {
            extraCallBack && extraCallBack();
            if (redirectUrl) {
              return router.push(redirectUrl);
            } else {
              return router.refresh();
            }
          },
        });
      }
    };

    const setPrev = () => {
      setActiveStep((prev: number) => (prev != 0 ? prev - 1 : 0));
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        {...rest}
        ref={ref}
      >
        {sections?.map((section, index) => {
          const isUnvisible =
            section.visibleRelativeColumn &&
            data[section.visibleRelativeColumn] !=
              section.visibleRelativeToValue;
          if (isUnvisible) {
            delete filteredData[section.keyString];
            return null;
          }

          return (
            <SectionFormItem
              data={data}
              setValue={setValue}
              errors={errors}
              register={register}
              section={section}
              key={index}
              unregister={unregister}
              setError={setError}
              productCode={productCode}
              extraOptions={extraOptions}
              isAdd={isAdd}
              getValues={getValues}
            />
          );
        })}

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
            disabled={isSubmitting}
            type="submit"
            className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray hover:bg-opacity-90 md:w-auto"
          >
            {activeStep == stepCount - 1
              ? isSubmitting
                ? "Kaydediliyor..."
                : "Kaydet"
              : "İleri"}
          </button>
        </div>
      </form>
    );
  },
);
CustomForm.displayName = "CustomForm";
export default CustomForm;
