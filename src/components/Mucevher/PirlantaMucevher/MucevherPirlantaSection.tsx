import { cn } from "@/utils";

import {
  PirlantaHeaders,
  PirlantaModelType,
} from "@/app/types/Pirlanta.HeaderType";
import MucevherPirlantaRow from "./MucevherPirlantaRow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";
import { useState } from "react";

export default function MucevherPirlantaSection({
  pirlantaProducts,
  isEdit,
  register,
  errors,
}: {
  pirlantaProducts: PirlantaModelType[] | null;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
}) {
  const [pirlantaTempItems, setPirlantaTempItems] = useState<
    PirlantaModelType[]
  >([]);
  const pirlantaHeaderColSum = PirlantaHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  // const toplamPirlantaPrice = pirlantaProducts?.reduce((acc, next) => {
  //   return acc + Number(next.product.total_cost || 0);
  // }, 0);

  // const toplamPirlantaAdet = pirlantaProducts?.reduce((acc, next) => {
  //   return acc + Number(next.quantity || 0);
  // }, 0);

  return (
    <div className="my-3 w-full">
      <b className="mb-1 block text-black">Pırlanta Bilgileri</b>
      <div
        className={cn(
          "grid w-full gap-3 rounded-sm bg-gray p-1 text-black",
          `grid-cols-${pirlantaHeaderColSum}`,
        )}
      >
        {PirlantaHeaders.map((column, index) => (
          <div className={`col-span-${column.span} font-bold`} key={index}>
            {column.header}
          </div>
        ))}
      </div>
      <div
        className={cn("my-3 grid gap-3", `grid-cols-${pirlantaHeaderColSum}`)}
      >
        {pirlantaProducts?.map((item, index) => {
          return (
            <MucevherPirlantaRow
              index={index}
              isEdit={isEdit}
              key={index}
              model={item}
              errors={errors}
              register={register}
            />
          );
        })}
        {!isEdit &&
          pirlantaTempItems.map((item, index) => {
            return (
              <MucevherPirlantaRow
                register={register}
                key={index}
                index={index}
                isEdit={isEdit}
                model={item}
                errors={errors}
              />
            );
          })}
      </div>
      {!isEdit && (
        <div className="w-full text-right">
          <button
            type="button"
            className="w-40 rounded-md bg-primary px-4 py-2 text-center text-white"
            onClick={() => {
              setPirlantaTempItems((prev: any) => [
                ...prev,
                {
                  adet: null,
                  berraklik: null,
                  fiyat: null,
                  carat: null,
                  kesim: null,
                  mensei: null,
                  renk: null,
                  type: "Diamond",
                },
              ]);
            }}
          >
            Pırlanta Ekle
          </button>
        </div>
      )}
      {/* {isEdit && (
        <div className="flex w-full justify-end">
          <div className="float-right flex w-auto flex-col flex-wrap font-bold text-black">
            <div className="flex">
              <div>Toplam Pırlanta Fiyat &nbsp;:&nbsp;</div>
              <div>{formatToCurrency(toplamPirlantaPrice || 0)} $</div>
            </div>
            <div className="flex">
              <div>Toplam Pırlanta Adet &nbsp;:&nbsp;</div>
              <div>{toplamPirlantaAdet}</div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
