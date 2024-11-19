"use client";
import { useEffect, useState } from "react";
import CustomInput from "../CustomUI/CustomInput";
import { CustomRadioButtonList } from "../CustomUI/CustomRadioButtonList";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";
import Image from "next/image";
import { ProductType } from "../../types/types";
import CustomSelect from "../CustomUI/CustomSelect";
import { MagazaCustomListType } from "@/utils/Magaza.Utils";
import { CustomMoneyInput } from "../CustomUI/CustomMoneyInput";
import CustomDatePicker2 from "../CustomUI/CustomDatePicker2";
import { TedarikciCustomListType } from "@/utils/Tedarikciler.Utils";
import CustomModalPage from "../CustomModals/CustomPageModal";
import TedarikciDetayContainer from "@/Containers/TedarikciDetayContainer";
import { useTedarikciModalData } from "@/store/useModalStore";

export default function MucevherDetaySectionOne({
  isEdit = false,
  register,
  errors,
  setValue,
  mainData,
  getValues,
  priceTag,
  labor_cost,
  purchase_price,
  unregister,
}: {
  isEdit?: boolean;
  setValue: UseFormSetValue<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  register: UseFormRegister<AddMucevherExternalType>;
  mainData?: ProductType;
  getValues?: any;
  priceTag?: any;
  labor_cost?: any;
  purchase_price?: any;
  unregister?: any;
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | undefined>(
    mainData?.image,
  );
  const { tedarikciModal, setTedarikciModalOpen } = useTedarikciModalData();

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
  }, [files, isEdit]);

  return (
    <>
      <CustomModalPage
        title="Yeni Tedarikçi Ekle"
        modalDataValue={tedarikciModal}
        setModalDataValue={setTedarikciModalOpen}
      >
        <TedarikciDetayContainer
          isRedirect={false}
          isAdd={true}
          tedarikciItemData={null}
        />
      </CustomModalPage>
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
            <div className="grid grid-cols-10 gap-2">
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
                className={"col-span-2"}
                value={mainData?.properties?.referenceNo}
                disabled={isEdit}
                err={errors.reference_no?.message}
              />
              <CustomInput
                item={{
                  name: "style_no",
                  required: false,
                  type: "text",
                  placeholder: "Style No",
                }}
                className={"col-span-2"}
                {...register("style_no", { required: "Style No Giriniz" })}
                value={mainData?.properties?.styleNo}
                err={errors.style_no?.message}
                disabled={isEdit}
              />
              <CustomMoneyInput
                item={{
                  name: "labor_cost",
                  required: false,
                  type: "money",
                  placeholder: "İşçilik",
                  rightIcon: "$",
                }}
                className={"col-span-2"}
                err={errors.labor_cost?.message}
                {...register("labor_cost", {
                  required: "İşçilik Giriniz",
                })}
                value={
                  isEdit
                    ? (mainData?.properties?.totalLaborCost as number)
                    : labor_cost
                }
                disabled={isEdit}
              />
              <CustomMoneyInput
                item={{
                  name: "purchase_price",
                  required: false,
                  type: "money",
                  placeholder: "Satın Alma Fiyatı",
                  rightIcon: "$",
                }}
                className={"col-span-2"}
                err={errors.purchase_price?.message}
                {...register("purchase_price", {
                  required: "Satın Alma Fiyatı Giriniz",
                })}
                value={
                  isEdit
                    ? (mainData?.properties?.purchasePrice as number)
                    : purchase_price
                }
                disabled={isEdit}
              />
              <CustomMoneyInput
                item={{
                  name: "price_tag",
                  required: false,
                  type: "money",
                  placeholder: "Etiket Fiyatı",
                  rightIcon: "$",
                  isConstant: true,
                }}
                className={"col-span-2"}
                value={
                  isEdit ? (mainData?.properties?.priceTag as number) : priceTag
                }
                disabled={true}
              />
              <CustomSelect
                item={{
                  name: "supplier_id",
                  required: true,
                  type: "select",
                  title: "Tedarikçi",
                  customOptions: TedarikciCustomListType,
                }}
                outerClass="col-start-1 col-end-4"
                disabled={isEdit}
                getValues={getValues}
                {...register("supplier_id", {
                  required: "Tedarikçi Seçiniz",
                  valueAsNumber: true,
                })}
                value={mainData?.supplier?.id as number}
                err={errors.supplier_id?.message}
              />

              <CustomSelect
                item={{
                  name: "store_id",
                  required: true,
                  type: "select",
                  title: "Mağaza",
                  customOptions: MagazaCustomListType,
                }}
                outerClass="col-start-4 col-end-7"
                disabled={isEdit}
                getValues={getValues}
                {...register("store_id", {
                  required: "Mağaza Seçiniz",
                  valueAsNumber: true,
                })}
                value={mainData?.store?.id as number}
                err={errors.store_id?.message}
              />

              <CustomDatePicker2
                item={{
                  name: "entry_date",
                  required: true,
                  type: "datepicker",
                  title: "Giriş Tarihi",
                }}
                setValue={setValue}
                // value={mainData?.properties?.productionDate}
                {...register("entry_date", {
                  required: "Giriş Tarihi Seçiniz",
                })}
                outerClass="col-span-2"
                err={errors.entry_date?.message}
                disabled={isEdit}
              />

              <CustomDatePicker2
                item={{
                  name: "sale_date",
                  required: true,
                  type: "datepicker",
                  title: "Çıkış Tarihi",
                }}
                {...register("sale_date", {
                  required: "Çıkış Tarihi Seçiniz",
                })}
                outerClass="col-span-2"
                // value={mainData?.properties?.saleDate}
                err={errors.sale_date?.message}
                disabled={isEdit}
                setValue={setValue}
              />

              <div className="col-start-1 col-end-11">
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
                    <span className="text-red">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-start-1 col-end-11">
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
                <button
                  className=" inline-block rounded-md bg-primary  px-4 py-3 text-white"
                  type="submit"
                >
                  Mücevher Ürünleri
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
