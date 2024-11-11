"use client";

import { useTedarikciModalData } from "@/store/useModalStore";
import { CustomOptionType, ElementType } from "../../types/inputTypes";
import { cn } from "@/utils";
import { selectKesimValue } from "@/utils/Pirlanta.Utils";
import { ClassValue } from "clsx";
import React, { useEffect, useId, useState } from "react";

type SelectElementProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  err?: string | null;
  outerClass?: ClassValue | null;
  extraOptions?: CustomOptionType[];
  staticOptions?: any;
  showIcon?: boolean;
  item: ElementType;
  title?: string;
  getValues?: any;
  firstOptionText?: string;
  setValue?: any;
  value?: any;
};

const CustomSelect = React.forwardRef<HTMLSelectElement, SelectElementProps>(
  (
    {
      item,
      className,
      err,
      onChange: selectChange,
      name,
      extraOptions,
      outerClass,
      staticOptions,
      showIcon = true,
      getValues,
      title,
      firstOptionText,
      setValue,
      value,
      ...rest
    },
    ref,
  ) => {
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(value);
    const [customOptionValues, setCustomOptionValues] = useState<
      CustomOptionType[]
    >([]);
    const [disabledIndex, setDisabledIndex] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { tedarikciModal, setTedarikciModalOpen } = useTedarikciModalData();
    const values = getValues && getValues();

    const options = item.isExtra
      ? extraOptions
      : customOptionValues.length > 0
        ? customOptionValues
        : item.options;
    const id = useId();

    const selectedExtraValue = selectKesimValue({
      selectedValue,
      options,
    });

    useEffect(() => {
      if (item?.customOptions) {
        const process = async () => {
          setIsLoaded(false);
          const result = await item.customOptions();
          setCustomOptionValues(result);

          setSelectedValue((name && values[name]) || value);
          setIsLoaded(true);
        };

        process();
      }
    }, [item?.customOptions, tedarikciModal, getValues, name]);

    useEffect(() => {
      if (selectedValue === "9999") {
        setTedarikciModalOpen();
      }
    }, [selectedValue, setTedarikciModalOpen]);

    useEffect(() => {
      if (item.firstRelated && values[item?.firstRelated]) {
        const indexNo = options?.findIndex(
          (a) => a.titleVal == values[item.firstRelated],
        );

        setDisabledIndex(indexNo as number);
      }
    }, [selectedValue, item.firstRelated, options, values]);

    return (
      <div className={cn("w-full", outerClass && outerClass)}>
        {(title || item.title || item?.isTopMargin) && (
          <label
            htmlFor={id}
            className={cn(
              "mb-3 block h-5 text-sm font-medium text-black dark:text-white",
            )}
          >
            {title || item.title}
          </label>
        )}
        {item?.customOptions && !isLoaded ? (
          <div>Yükleniyor...</div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-1">
              <div className="relative z-20 flex-1 bg-white dark:bg-form-input">
                <select
                  id={id}
                  ref={ref}
                  name={name}
                  value={selectedValue}
                  onChange={(e) => {
                    setSelectedValue(e.target.value);
                    selectChange && selectChange(e);
                  }}
                  className={cn(
                    "relative z-20 w-full appearance-none rounded border border-stone-400 bg-transparent px-6 py-3 uppercase outline-none transition placeholder:text-sm focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input",
                    rest.disabled && "bg-[#f5f7fd]",
                    isOptionSelected && "text-black dark:text-white",
                    err && "border-red",
                  )}
                  {...rest}
                >
                  <option
                    value=""
                    selected
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    {firstOptionText
                      ? `${firstOptionText}`
                      : `${item.title} Seçiniz`}
                  </option>
                  {staticOptions
                    ? staticOptions()
                    : options?.map((item2, index) => {
                        return (
                          <option
                            key={index}
                            value={item2.valueVal}
                            disabled={
                              !!disabledIndex &&
                              disabledIndex != 0 &&
                              index < disabledIndex
                            }
                            className="disabled:bg-slate-400 disabled:text-boxdark  dark:text-bodydark"
                          >
                            {item2.titleVal}
                          </option>
                        );
                      })}
                  {item.isTedarikci && (
                    <option
                      value={"9999"}
                      className="text-body dark:text-bodydark"
                    >
                      Yeni Tedarikçi Ekle
                    </option>
                  )}
                </select>

                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>

              {options &&
                options[0]?.extraValue &&
                selectedExtraValue &&
                showIcon && (
                  <div className="flex h-full  items-center justify-center rounded-sm bg-primary px-2 py-3 text-white">
                    {selectedExtraValue}
                  </div>
                )}
            </div>
            {err && (
              <span className="mt-2 block w-full text-left text-sm text-red">
                {err}
              </span>
            )}
          </>
        )}
      </div>
    );
  },
);
CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
