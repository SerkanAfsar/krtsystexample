"use client";
import MucevherSadeSection from "@/components/Mucevher/SadeMucevher/MucevherSadeSection";
import { ProductType } from "../types/types";
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
  fieldsPirlanta,
  appendPirlanta,
  removePirlanta,
  fieldsRenkliTas,
  appendRenkliTas,
  removeRenkliTas,
  fieldsSade,
  appendSade,
  removeSade,
}: {
  productList: CustomArrType | null;
  code?: string;
  isEdit: boolean;
  showTitle?: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  setActiveStep?: any;
  fieldsPirlanta?: any;
  appendPirlanta?: any;
  removePirlanta?: any;
  fieldsRenkliTas?: any;
  appendRenkliTas?: any;
  removeRenkliTas?: any;
  fieldsSade?: any;
  appendSade?: any;
  removeSade?: any;
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
      <div className="grid w-full grid-cols-6">
        <div className="col-span-6 flex flex-col gap-4">
          <MucevherSadeSection
            dataList={sadeProducts}
            register={register}
            isEdit={isEdit}
            errors={errors}
            fieldsSade={fieldsSade}
            appendSade={appendSade}
            removeSade={removeSade}
          />
          <MucevherPirlantaSection
            isEdit={isEdit}
            register={register}
            errors={errors}
            dataList={pirlantaProducts}
            fieldsPirlanta={fieldsPirlanta}
            appendPirlanta={appendPirlanta}
            removePirlanta={removePirlanta}
          />
          <MucevherRenkliTasSection
            isEdit={isEdit}
            register={register}
            errors={errors}
            dataList={renkliTasProducts}
            fieldsRenkliTas={fieldsRenkliTas}
            appendRenkliTas={appendRenkliTas}
            removeRenkliTas={removeRenkliTas}
          />
        </div>
      </div>
      {!isEdit && <hr className="my-8" />}

      <div className="col-span-6 flex  w-full justify-end">
        {!isEdit && (
          <>
            <button
              className="mr-5 w-40 rounded-md border border-primary px-4 py-2 text-black"
              type="button"
              onClick={() => setActiveStep && setActiveStep(0)}
            >
              Geri
            </button>
            <button
              className="block w-40 rounded-md bg-primary px-4 py-2 text-white"
              type="submit"
            >
              Kaydet
            </button>
          </>
        )}
      </div>
    </div>
  );
}
