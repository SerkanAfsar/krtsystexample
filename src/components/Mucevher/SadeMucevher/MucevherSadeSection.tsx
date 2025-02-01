import { SadeHeaders } from "@/app/types/Sade.HeaderType";
import MucevherSadeRow from "./MucevherSadeRow";
import { cn } from "@/utils";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

export default function MucevherSadeSection({
  isEdit,
  register,
  errors,
  fieldsSade,
  appendSade,
  removeSade,
  dataList,
}: {
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  fieldsSade?: any;
  appendSade?: any;
  removeSade?: any;
  dataList?: any;
}) {
  const sadeHeaderColSum = SadeHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  const mainArr = isEdit ? dataList : fieldsSade;

  console.log("mainarr is ", mainArr);

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
        {mainArr?.map((item: any, index: number) => {
          return (
            <MucevherSadeRow
              register={register}
              key={item.id}
              index={index}
              isEdit={isEdit}
              model={item}
              errors={errors}
              removeSade={removeSade}
            />
          );
        })}
      </div>
      {!isEdit && (
        <button
          type="button"
          className="block w-40 self-end rounded-md bg-primary px-4 py-2 text-center text-white"
          onClick={() => {
            appendSade({
              ayar: null,
              fiyat: null,
              gram: null,
              hasGram: null,
              modelTuru: null,
              renk: null,
              type: "Simple",
            });
          }}
        >
          Sade Ekle
        </button>
      )}
    </div>
  );
}
