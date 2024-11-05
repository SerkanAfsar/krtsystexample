import { SadeHeaders, SadeModelType } from "@/app/types/Sade.HeaderType";
import MucevherSadeRow from "./MucevherSadeRow";
import { cn } from "@/utils";

import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

export default function MucevherSadeSection({
  sadeProducts,
  isEdit,
  register,
  errors,
}: {
  sadeProducts: SadeModelType[] | null;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
}) {
  const [sadeTempItems, setSadeTempItems] = useState<SadeModelType[]>([]);
  const sadeHeaderColSum = SadeHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  return (
    <div className="mb-3 flex w-full flex-col gap-3">
      <b className="mb-1 block text-black underline">Sade Bilgileri</b>
      <div
        className={cn(
          "grid w-full gap-3 rounded-sm bg-gray p-1 text-black",
          `grid-cols-${sadeHeaderColSum}`,
        )}
      >
        {SadeHeaders.map((column, index) => (
          <div className={`col-span-${column.span} font-bold`} key={index}>
            {column.header}
          </div>
        ))}
      </div>
      <div className={cn("my-3 grid gap-3", `grid-cols-${sadeHeaderColSum}`)}>
        {sadeProducts?.map((item, index) => {
          return (
            <MucevherSadeRow
              register={register}
              key={index}
              index={index}
              isEdit={isEdit}
              model={item}
              errors={errors}
            />
          );
        })}
        {!isEdit &&
          sadeTempItems.map((item, index) => {
            return (
              <MucevherSadeRow
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
            setSadeTempItems((prev: any) => [
              ...prev,
              {
                ayar: null,
                fiyat: null,
                gram: null,
                hasGram: null,
                modelTuru: null,
                renk: null,
                type: "Simple",
              },
            ]);
          }}
        >
          Sade Ekle
        </button>
      )}
    </div>
  );
}
