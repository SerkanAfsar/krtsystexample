"use client";
import { useEffect, useState } from "react";
import CustomDatePicker from "../CustomUI/CustomDatePicker";
import CustomInput from "../CustomUI/CustomInput";

import { CustomRadioButtonList } from "../CustomUI/CustomRadioButtonList";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";
import Image from "next/image";
import { ProductType } from "../../../types/types";

export default function MucevherDetaySectionOne({
  isEdit = false,
  register,
  errors,
  setValue,
  mainData,
}: {
  isEdit?: boolean;
  setValue: UseFormSetValue<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  register: UseFormRegister<AddMucevherExternalType>;
  mainData?: ProductType;
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | undefined>(
    mainData?.image,
  );

  const getBase64 = (file: any): any => {
    if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function () {
        setImage(reader.result ?? undefined);
        setValue("image", (reader.result as string) ?? null);
      };
      reader.onerror = function (error) {
        console.log("Base 64 Error: ", error);
        setImage(undefined);
      };
    }
  };

  useEffect(() => {
    if (files || isEdit) {
      getBase64(files);
    } else {
      setImage(undefined);
    }
  }, [files]);

  return (
    <div className="mb-1 rounded-sm   bg-white   dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-1 mt-8">
          <div className="mb-5 bg-gray">
            <label
              htmlFor="taskImg"
              className="block p-1 text-center font-bold text-black dark:text-white"
            >
              {isEdit ? "Resim" : "Resim Ekle"}
            </label>
            <div>
              {!image ? (
                <div
                  id="FileUpload"
                  className="relative block w-full appearance-none rounded-sm border border-dashed border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:py-14"
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    className="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
                    onChange={(event) =>
                      setFiles(event.target.files as FileList)
                    }
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
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
                    <p className="text-md block text-center">
                      Resim Sürükle Ya da Seç
                    </p>
                  </div>
                </div>
              ) : (
                <Image
                  src={image as string}
                  alt="deneme"
                  width={300}
                  height={200}
                  className="h-auto w-full"
                />
              )}

              {files !== null && (
                <div className="mt-4.5 border border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark">
                  <div className="flex items-center justify-between">
                    <span>{files[0]?.name}</span>

                    <button onClick={() => setFiles(null)}>
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-2">
          <b>Mücevher</b>
          <div className="mb-3 grid grid-cols-5 gap-2 bg-gray p-2 text-sm font-bold text-black">
            <div>Referans No</div>
            <div>Style No</div>
            <div>İşçilik</div>
            <div>Satın Alma Fiyatı</div>
            <div>Etiket Fiyatı</div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div>
              <CustomInput
                item={{
                  name: "reference_no",
                  required: false,
                  type: "text",
                  placeholder: "Referans No",
                }}
                {...register("reference_no", {
                  required: "Referans No Giriniz",
                })}
                value={mainData?.properties?.referenceNo}
                disabled={isEdit}
                err={errors.reference_no?.message}
              />
            </div>
            <div>
              <CustomInput
                item={{
                  name: "style_no",
                  required: false,
                  type: "text",
                  placeholder: "Style No",
                }}
                {...register("style_no", { required: "Style No Giriniz" })}
                value={mainData?.properties?.styleNo}
                err={errors.style_no?.message}
                disabled={isEdit}
              />
            </div>
            <div>
              <CustomInput
                item={{
                  name: "labor_cost",
                  required: false,
                  type: "number",
                  placeholder: "İşçilik",
                  rightIcon: "$",
                }}
                err={errors.labor_cost?.message}
                {...register("labor_cost", {
                  required: "İşçilik Giriniz",
                  valueAsNumber: true,
                })}
                value={mainData?.properties?.styleNo}
                disabled={isEdit}
              />
            </div>
            <div>
              <CustomInput
                item={{
                  name: "purchase_price",
                  required: false,
                  type: "number",
                  placeholder: "Satın Alma Fiyatı",
                  rightIcon: "$",
                }}
                err={errors.purchase_price?.message}
                {...register("purchase_price", {
                  required: "Satın Alma Fiyatı Giriniz",
                  valueAsNumber: true,
                })}
                value={mainData?.properties?.purchase_price}
                disabled={isEdit}
              />
            </div>
            <div>
              <CustomInput
                item={{
                  name: "price_tag",
                  required: false,
                  type: "text",
                  placeholder: "Etiket Fiyatı",
                  rightIcon: "$",
                }}
                {...register("price_tag", {
                  required: "Etiket Fiyatı Giriniz",
                  valueAsNumber: true,
                })}
                value={mainData?.properties?.price_tag}
                err={errors.price_tag?.message}
                disabled={true}
              />
            </div>
            <div className="col-start-4 col-end-5">
              <CustomDatePicker
                item={{
                  name: "entry_date",
                  required: true,
                  type: "datepicker",
                  title: "Giriş Tarihi",
                }}
                value={mainData?.properties?.productionDate}
                {...register("entry_date", {
                  required: "Giriş Tarihi Seçiniz",
                })}
                err={errors.entry_date?.message}
                disabled={isEdit}
              />
            </div>
            <div className="col-start-5 col-end-6">
              <CustomDatePicker
                item={{
                  name: "sale_date",
                  required: true,
                  type: "datepicker",
                  title: "Çıkış Tarihi",
                }}
                {...register("sale_date", {
                  required: "Çıkış Tarihi Seçiniz",
                })}
                value={mainData?.properties?.saleDate}
                err={errors.sale_date?.message}
                disabled={isEdit}
                setValue={null}
              />
            </div>
            <div className="col-start-1 col-end-6">
              <div className="flex w-full flex-col items-start gap-2">
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Açıklama
                </label>
                <textarea
                  rows={3}
                  {...register("description", {
                    required: "Açıklama Alanı Giriniz",
                  })}
                  value={mainData?.properties?.description}
                  disabled={isEdit}
                  placeholder="Açıklama..."
                  className="w-full rounded-lg border-[1.5px]  border-stone-400 bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.description && (
                  <span className="text-red">{errors.description.message}</span>
                )}
              </div>
            </div>
            <div className="col-start-1 col-end-6">
              <CustomRadioButtonList
                defaultValue="Kadın"
                name="cinsiyet"
                values={["Kadın", "Erkek"]}
                item={{
                  name: "deneme",
                  required: true,
                  type: "text",
                }}
                setValue={setValue}
              />
            </div>
          </div>
          {!isEdit && (
            <div className="w-full text-right">
              <button className="bg-primary px-8 py-2 text-white" type="submit">
                İleri
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
