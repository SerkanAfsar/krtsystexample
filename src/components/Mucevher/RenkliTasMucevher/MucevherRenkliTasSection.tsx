import { cn } from "@/utils";

import { RenkliTasHeaders } from "@/app/types/RenkliTas.HeaderType";
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
      {isEdit && (
        <div className="my-3">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4 text-center font-semibold text-gray-800">Renkli Taş</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Kesim</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Karat</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Renk</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Mensei</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Adet</th>
                <th className="border p-4 text-center font-semibold text-gray-800">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {mainArr?.map((item: any, index: number) => (
                <tr key={item.id} className="hover:bg-gray-100 transition-all">
                  <td className="border p-4 text-center text-gray-600">{item.renkliTas}</td>
                  <td className="border p-4 text-center text-gray-600">{item.kesim}</td>
                  <td className="border p-4 text-center text-gray-600">{item.carat}</td>
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
        {mainArr?.map((item: any, index: number) => {
          return (
            <MucevherRenkliTasRow
              register={register}
              errors={errors}
              isEdit={isEdit}
              key={item.id}
              index={index}
              model={item}
              removeRenkliTas={removeRenkliTas}
            />
          );
        })}
      </div>

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
       </>
      )}
    </div>
  );
}
