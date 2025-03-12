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
    const isCertificateFile = item.title === "Sertifika Dosyası";
    
    return (
      <div className={cn(outerClass && outerClass, err && "border-red")}>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {item.title}
        </label>
          {isCertificateFile ? (
            <div className="relative">
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
              multiple={false}
              className="block h-12 w-full p-2 border border-gray-300 rounded-md"
            />
            </div>
          ) : (
            <div className="relative">
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
              accept="image/*"
              multiple={false}
              className="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
            />
            {image ? (
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
            ) : (
              <div
                id="FileUpload"
                className="relative block w-full appearance-none rounded-sm border border-dashed border-stone-400 bg-white px-4 py-4 !pt-24 dark:border-strokedark dark:bg-boxdark sm:py-14"
              >
                <div className="flex flex-col items-center justify-center space-y-3 mb-8">
                  <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_75_12841)">
                        <path
                          d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                          fill="#3C50E0"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_75_12841">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <p className="text-md block text-center">Resim Sürükle Ya da Seç</p>
                </div>
              </div>
            )}
          </div>
          )}
        {err && (
          <span className="mt-2 block w-full text-left text-sm text-red">
            {err}
          </span>
        )}
        {item.pictureExtraText && (
          <div className="my-5 block w-full text-left text-base font-bold text-black-2 dark:text-white">
            {item.pictureExtraText}
          </div>
        )}
      </div>
    ); 
  },
);
CustomFileSelect.displayName = "CustomFileSelect";
export default CustomFileSelect;
