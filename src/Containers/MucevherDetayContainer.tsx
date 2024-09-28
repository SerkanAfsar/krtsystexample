"use client";
import MucevherSadeSection from "@/components/Mucevher/SadeMucevher/MucevherSadeSection";
import { ProductType } from "../../types/types";
import React from "react";
import MucevherPirlantaSection from "@/components/Mucevher/PirlantaMucevher/MucevherPirlantaSection";
import MucevherRenkliTasSection from "@/components/Mucevher/RenkliTasMucevher/MucevherRenkliTasSection";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";
import { SadeModelType } from "@/app/types/Sade.HeaderType";
import { PirlantaModelType } from "@/app/types/Pirlanta.HeaderType";
import { RenkliTasModelType } from "@/app/types/RenkliTas.HeaderType";

export type CustomArrType = (
  | SadeModelType
  | PirlantaModelType
  | RenkliTasModelType
)[];

export type MucevherDetayDataType = {
  product: ProductType;
  quantity: number | null;
  used_carat: number | null;
};

export default function MucevherDetayContainer({
  productList,
  code,
  isEdit,
  showTitle = true,
  register,
  errors,
  setActiveStep,
}: {
  productList: CustomArrType | null;
  code?: string;
  isEdit: boolean;
  showTitle?: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  setActiveStep?: any;
}) {
  const sadeProducts =
    (productList?.filter((a) => a.type == "Simple") as SadeModelType[]) || null;

  const pirlantaProducts =
    (productList?.filter((a) => a?.type == "Diamond") as PirlantaModelType[]) ||
    null;

  const renkliTasProducts =
    (productList?.filter(
      (a) => a?.type == "ColoredStone",
    ) as RenkliTasModelType[]) || null;

  return (
    <div className="mb-1 rounded-sm bg-white pb-5  dark:border-strokedark dark:bg-boxdark">
      {showTitle && (
        <>
          <div className="border-b border-stroke dark:border-strokedark">
            <div className="flex w-full items-center justify-between">
              <h3 className="p-4 text-lg font-medium text-black dark:text-white">
                Mücevher Bilgileri
              </h3>
              <div className="flex items-center justify-center gap-3">
                <span>Mücevher Kodu:</span>
                <b className="mr-4 text-black">{code}</b>
              </div>
            </div>
          </div>
          <hr />
        </>
      )}
      <div className="grid w-full grid-cols-6  ">
        <div className="col-span-6 flex flex-col">
          <MucevherSadeSection
            register={register}
            sadeProducts={sadeProducts}
            isEdit={isEdit}
            errors={errors}
          />
          <MucevherPirlantaSection
            pirlantaProducts={pirlantaProducts}
            isEdit={isEdit}
            register={register}
            errors={errors}
          />
          <MucevherRenkliTasSection
            renkliTasProducts={renkliTasProducts}
            isEdit={isEdit}
            register={register}
            errors={errors}
          />
        </div>
        <div className="col-span-6 mt-4 flex">
          {/* <h2 className=" h-full w-full justify-end text-right  text-xl dark:text-white">
            Toplam Malzeme Maliyeti :{" "}
            <span className="text-right font-bold text-black underline dark:text-white">{`${formatToCurrency(toplamPirlantaPrice + toplamRenkliTasPrice + sadeTotalPrice)} $`}</span>
          </h2> */}
        </div>
        <div className="col-span-6 mt-8 block w-full text-right">
          {!isEdit && (
            <div className="w-full text-right">
              <button
                className="mr-5  border border-primary px-8 py-2 text-black"
                type="button"
                onClick={() => setActiveStep && setActiveStep(0)}
              >
                Geri
              </button>
              <button className="bg-primary px-8 py-2 text-white" type="submit">
                Kaydet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
