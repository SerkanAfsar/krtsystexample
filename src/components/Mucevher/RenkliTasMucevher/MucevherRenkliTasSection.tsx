import { cn } from "@/utils";

import {
  RenkliTasHeaders,
  RenkliTasModelType,
} from "@/app/types/RenkliTas.HeaderType";
import MucevherRenkliTasRow from "./MucevherRenkliTasRow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

export default function MucevherRenkliTasSection({
  isEdit,
  register,
  errors,
  fieldsRenkliTas,
  appendRenkliTas,
  removeRenkliTas,
  dataList,
}: {
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  fieldsRenkliTas?: any;
  appendRenkliTas?: any;
  removeRenkliTas?: any;
  dataList?: any;
}) {
  const renkliTasHeaderColSum = RenkliTasHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  const mainArr = isEdit ? dataList : fieldsRenkliTas;

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
        {mainArr?.map((item: RenkliTasModelType, index: number) => {
          return (
            <MucevherRenkliTasRow
              register={register}
              errors={errors}
              isEdit={isEdit}
              key={`${item.adet}_${item.carat}_${item.fiyat}_${item.renkliTas}_${index}`}
              index={index}
              model={item}
              removeRenkliTas={removeRenkliTas}
            />
          );
        })}
      </div>

      {!isEdit && (
        <button
          type="button"
          className="block w-40 self-end rounded-md bg-primary px-4 py-2 text-center text-white"
          onClick={() => {
            appendRenkliTas({
              adet: null,
              fiyat: null,
              carat: null,
              kesim: null,
              mensei: null,
              renk: null,
              renkliTas: null,
              type: "ColoredStone",
            });
          }}
        >
          Renkli Taş Ekle
        </button>
      )}
    </div>
  );
}
