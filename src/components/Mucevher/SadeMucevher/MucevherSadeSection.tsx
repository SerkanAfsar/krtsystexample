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

  //console.log("mainarr is ", mainArr);

  return (
    <div className="mb-3 flex w-full flex-col gap-3">
      <b className="mb-1 block text-black underline">Sade Bilgileri</b>
      {isEdit && (
        <div className="my-3">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 text-center font-semibold text-gray-800">Model Turu</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Gram</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Ayar</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Renk</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Has Gramı</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {mainArr?.map((item: any, index: number) => (
                <tr key={item.id} className="hover:bg-gray-100 transition-all">
                  <td className="border p-4 text-center text-gray-600">{item.modelTuru}</td>
                  <td className="border p-4 text-center text-gray-600">{item.gram}</td>
                  <td className="border p-4 text-center text-gray-600">{item.ayar}</td>
                  <td className="border p-4 text-center text-gray-600">{item.altinRengi}</td>
                  <td className="border p-4 text-center text-gray-600">{item.hasGram}</td>
                  <td className="border p-4 text-right font-semibold text-gray-600">{Number(item.fiyat).toFixed(2)} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isEdit && (
      <>
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
        </>
      )}
    </div>
  );
}
