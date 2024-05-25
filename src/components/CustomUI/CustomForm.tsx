"use client";
import { ElementType } from "@/types/inputTypes";
import * as React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { cn } from "@/utils";
import { useForm, SubmitHandler } from "react-hook-form";

type CustomFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  elements: ElementType[];
  colsLenght?: number | null;
  IFormInput: any;
};

const CustomForm = React.forwardRef<HTMLFormElement, CustomFormProps>(
  ({ className, elements, IFormInput, colsLenght, ...rest }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<typeof IFormInput>();

    const onSubmit: SubmitHandler<typeof IFormInput> = (data) =>
      console.log(data);

    return (
      <div className="p-6.5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "grid grid-cols-none gap-6",
            colsLenght ? `md:grid-cols-${colsLenght}` : "sm::grid-cols-2",
            className,
          )}
          {...rest}
          ref={ref}
        >
          {elements.map((item, index) => {
            switch (item.type) {
              case "text":
              default: {
                return (
                  <CustomInput
                    {...register(item.name, {
                      required: item.required ? item.requiredMessage : false,
                    })}
                    title={item.title}
                    placeholder={item.placeholder ?? undefined}
                    key={index}
                    err={errors[item.name]?.message?.toString() ?? null}
                  />
                );
              }
              case "select": {
                return (
                  <CustomSelect
                    {...register(item.name, {
                      required: item.required ? item.requiredMessage : false,
                    })}
                    options={item.options ?? null}
                    title={item.title}
                    key={index}
                    err={errors[item.name]?.message?.toString() ?? null}
                  />
                );
              }
            }
          })}
          <div className="flex w-full items-end justify-end md:col-start-2 md:col-end-3">
            <button
              type="submit"
              className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray hover:bg-opacity-90 md:w-1/3"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    );
  },
);
CustomForm.displayName = "CustomForm";
export default CustomForm;
