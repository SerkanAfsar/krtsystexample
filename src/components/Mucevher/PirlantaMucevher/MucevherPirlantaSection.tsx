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

  return (
    <div className="my-3 flex w-full flex-col gap-3">
      <b className="mb-1 block text-black underline">Pırlanta Bilgileri</b>
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
        <button
          type="button"
          className="block w-40 self-end rounded-md bg-primary px-4 py-2 text-center text-white"
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
      )}
    </div>
  );
}
