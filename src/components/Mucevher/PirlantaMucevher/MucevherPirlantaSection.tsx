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
      {isEdit && (
        <div className="my-3">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 text-center font-semibold text-gray-800">Kesim</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Carat</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Berraklık</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Renk</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Mensei</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Adet</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {mainArr?.map((item: any, index: number) => (
                <tr key={item.id} className="hover:bg-gray-100 transition-all">
                  <td className="border p-4 text-center text-gray-600">{item.kesim}</td>
                  <td className="border p-4 text-center text-gray-600">{item.carat}</td>
                  <td className="border p-4 text-center text-gray-600">{item.berraklik}</td>
                  <td className="border p-4 text-center text-gray-600">{item.renk}</td>
                  <td className="border p-4 text-center text-gray-600">{item.mensei}</td>
                  <td className="border p-4 text-center text-gray-600">{item.adet}</td>
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
          `grid-cols-${pirlantaHeaderColSum}`,
        )}
      >
      {PirlantaHeaders.map((column, index) => (
        <div className={`col-span-${column.span} font-bold`} key={index}>
          {column.header}
        </div>
      ))}
      </div>
      <div className={cn("my-3 grid gap-3", `grid-cols-${pirlantaHeaderColSum}`)}>
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
      </>
      )}
    </div>
  );
}
