"use client";
import { cn } from "@/utils";
import { ClassValue } from "clsx";
import * as React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type HtmlDivProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  checkBoxList: string[];
  setValue: UseFormSetValue<any>;
  outerClass: ClassValue;
  register: UseFormRegister<any>;
  name: string;
  value: string;
};

const CustomButtonGroups = React.forwardRef<HTMLDivElement, HtmlDivProps>(
  ({ checkBoxList, setValue, value, outerClass, name, ...rest }, ref) => {
    const [selected, setSelected] = React.useState<string>(value);

    React.useEffect(() => {
      setValue(name || "not-set", selected, {
        shouldValidate: true,
      });
    }, [selected, setValue, name]);

    return (
      <div className={cn("flex w-full flex-col ", outerClass)}>
        <label className="mb-3 block h-5 text-sm font-medium text-black dark:text-white">
          {rest.title && rest.title}
        </label>
        <div
          className={cn("relative flex w-full items-center rounded-lg")}
          ref={ref}
        >
          <div
            onClick={() => setSelected(checkBoxList[0])}
            className={cn(
              "inline-flex cursor-pointer rounded-l-lg border border-stone-400  px-2 py-1 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary sm:px-6 sm:py-3",
              selected == checkBoxList[0] &&
                "border-primary bg-primary text-white",
            )}
          >
            {checkBoxList[0].toLocaleUpperCase()}
          </div>
          {/* <div
          className={cn(
            "inline-flex cursor-pointer border-y border-stroke px-2 py-1 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:px-6 sm:py-3",
          )}
        >
          Profile
        </div> */}
          <div
            onClick={() => setSelected(checkBoxList[checkBoxList.length - 1])}
            className={cn(
              "inline-flex cursor-pointer rounded-r-lg border border-l-0 border-stone-400 px-2 py-1 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:px-6 sm:py-3",
              selected == checkBoxList[checkBoxList.length - 1] &&
                "border-primary bg-primary text-white",
            )}
          >
            {checkBoxList[checkBoxList.length - 1].toLocaleUpperCase()}
          </div>
        </div>
      </div>
    );
  },
);
CustomButtonGroups.displayName = "CustomButtonGroups";
export default CustomButtonGroups;
