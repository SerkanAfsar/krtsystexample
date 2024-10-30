import { ElementType } from "../../types/inputTypes";
import React, { useState } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/utils";
import Image from "next/image";

type CustomFileSelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
  item: ElementType;
} & {
  err?: string | null;
  outerClass?: ClassValue | null;
  className?: ClassValue | null;
  setError?: any;
  addedImage: string | null;
};
const CustomFileSelect = React.forwardRef<
  HTMLInputElement,
  CustomFileSelectProps
>(
  (
    {
      item,
      className,
      onChange,
      onBlur,
      name,
      outerClass,
      err,
      setError,
      addedImage,
      ...rest
    },
    ref,
  ) => {
    const [image, setImage] = useState<string | null>(addedImage);

    return (
      <div className={cn(outerClass && outerClass, err && "border-red")}>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {item.title}
        </label>
        <input
          name={name}
          onChange={(e) => {
            const files: any = e.target.files;
            if (files && files.length > 0) {
              setImage(URL.createObjectURL(files[0]));
            }
            onChange && onChange(e);
          }}
          onBlur={onBlur}
          ref={ref}
          type="file"
          {...rest}
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        />

        {err && (
          <span className="mt-2 block w-full text-left text-sm text-red">
            {err}
          </span>
        )}
        {image && item.showPicture && (
          <div className="mt-4 block w-full">
            <Image
              src={image}
              alt="Serkan"
              width={300}
              className="border border-black"
              style={{ height: "auto", width: "100%" }}
              height={200}
            />
          </div>
        )}
        {item.pictureExtraText && (
          <div className="my-5 block w-full text-left text-base  font-bold text-black-2 dark:text-white">
            {item.pictureExtraText}
          </div>
        )}
      </div>
    );
  },
);
CustomFileSelect.displayName = "CustomFileSelect";
export default CustomFileSelect;
