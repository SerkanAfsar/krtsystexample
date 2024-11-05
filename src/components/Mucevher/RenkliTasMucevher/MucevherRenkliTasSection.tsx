import { cn } from "@/utils";

import {
  RenkliTasHeaders,
  RenkliTasModelType,
} from "@/app/types/RenkliTas.HeaderType";
import MucevherRenkliTasRow from "./MucevherRenkliTasRow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";
import { useState } from "react";

export default function MucevherRenkliTasSection({
  renkliTasProducts,
  isEdit,
  register,
  errors,
}: {
  renkliTasProducts: RenkliTasModelType[] | null;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
}) {
  const [renkliTasTempItems, setRenkliTasTempItems] = useState<
    RenkliTasModelType[]
  >([]);
  const renkliTasHeaderColSum = RenkliTasHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  return (
    <div className="my-3 flex w-full flex-col gap-3">
      <b className="mb-1 block text-black underline">Renkli Taş Bilgileri</b>
      <div
        className={cn(
          "grid w-full gap-3 rounded-sm bg-gray p-1 text-black",
          `grid-cols-${renkliTasHeaderColSum}`,
        )}
      >
        {RenkliTasHeaders.map((column, index) => (
          <div className={`col-span-${column.span} font-bold`} key={index}>
            {column.header}
          </div>
        ))}
      </div>
      <div
        className={cn("my-3 grid gap-3", `grid-cols-${renkliTasHeaderColSum}`)}
      >
        {renkliTasProducts?.map((item, index) => {
          return (
            <MucevherRenkliTasRow
              register={register}
              errors={errors}
              isEdit={isEdit}
              key={index}
              index={index}
              model={item}
            />
          );
        })}
        {!isEdit &&
          renkliTasTempItems.map((item, index) => {
            return (
              <MucevherRenkliTasRow
                register={register}
                errors={errors}
                isEdit={isEdit}
                index={index}
                key={index}
                model={item}
              />
            );
          })}
      </div>

      {!isEdit && (
        <button
          type="button"
          className="block w-40 self-end rounded-md bg-primary px-4 py-2 text-center text-white"
          onClick={() => {
            setRenkliTasTempItems((prev: any) => [
              ...prev,
              {
                adet: null,
                fiyat: null,
                carat: null,
                kesim: null,
                mensei: null,
                renk: null,
                renkliTas: null,
                type: "ColoredStone",
              },
            ]);
          }}
        >
          Renkli Taş Ekle
        </button>
      )}
    </div>
  );
}
