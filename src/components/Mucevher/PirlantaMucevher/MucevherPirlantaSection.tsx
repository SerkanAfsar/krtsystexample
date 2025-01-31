import { cn } from "@/utils";

import { PirlantaHeaders } from "@/app/types/Pirlanta.HeaderType";
import MucevherPirlantaRow from "./MucevherPirlantaRow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

export default function MucevherPirlantaSection({
  isEdit,
  register,
  errors,
  fieldsPirlanta,
  appendPirlanta,
  removePirlanta,
  dataList,
}: {
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  fieldsPirlanta?: any;
  appendPirlanta?: any;
  removePirlanta?: any;
  dataList?: any;
}) {
  const pirlantaHeaderColSum = PirlantaHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);
  const mainArr = isEdit ? dataList : fieldsPirlanta;

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
        {mainArr?.map((item: any, index: number) => {
          return (
            <MucevherPirlantaRow
              index={index}
              isEdit={isEdit}
              key={item.id}
              model={item}
              errors={errors}
              register={register}
              removePirlanta={removePirlanta}
            />
          );
        })}
      </div>
      {!isEdit && (
        <button
          type="button"
          className="block w-40 self-end rounded-md bg-primary px-4 py-2 text-center text-white"
          onClick={() => {
            appendPirlanta({
              adet: null,
              berraklik: null,
              fiyat: null,
              carat: null,
              kesim: null,
              mensei: null,
              renk: null,
              type: "Diamond",
            });
          }}
        >
          Pırlanta Ekle
        </button>
      )}
    </div>
  );
}
