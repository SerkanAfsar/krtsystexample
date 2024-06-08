"use client";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSectionType } from "@/types/formTypes";
import SectionFormItem from "./SectionFormItem";
import { toast } from "react-toastify";
import { ResponseResult } from "@/types/responseTypes";
import { useRouter } from "next/navigation";

type CustomFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  sections?: FormSectionType[];
  formItemType: any;
  setData: any;
  setActiveStep?: any;
  data?: any;
  activeStep: number;
  stepCount: number;
  serviceFunction?: any | null;
  filteredData?: any | null;
  productCode?: string | null;
  redirectUrl?: string;
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
      serviceFunction,
      filteredData,
      productCode,
      redirectUrl,
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
      formState: { errors },
    } = useForm<typeof formItemType>({
      defaultValues: data,
    });
    const router = useRouter();

    React.useEffect(() => {
      const subscription = watch((value: typeof formItemType) => {
        setData(value);
      });
      return () => subscription.unsubscribe();
    }, [watch, setData]);

    const onSubmit: SubmitHandler<typeof formItemType> = async (values) => {
      setData((prev: typeof formItemType) => ({ ...prev, values }));
      setActiveStep((prev: number) => (prev < stepCount - 1 ? prev + 1 : prev));

      if (activeStep == stepCount - 1 && serviceFunction && filteredData) {
        const result: ResponseResult = await serviceFunction({
          data: filteredData,
        });

        if (result.result) {
          toast.success("Ekleme Başarılı", { position: "top-right" });
          if (redirectUrl) {
            return router.push(redirectUrl);
          }
        } else {
          Object.entries(result.payload).map(([key, value], index) => {
            setTimeout(() => {
              const res = value as string[];
              toast.error(
                `${key.toUpperCase()} ${res[0].toLocaleUpperCase()}`,
                { position: "top-right" },
              );
            }, 200 * index);
          });
          return;
        }
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
        {sections?.map((section, index) => (
          <SectionFormItem
            data={data}
            setValue={setValue}
            errors={errors}
            register={register}
            section={section}
            key={section.sectionTitle}
            setError={setError}
            productCode={productCode}
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
