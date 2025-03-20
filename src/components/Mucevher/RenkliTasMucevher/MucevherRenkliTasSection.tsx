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
      {!isEdit && ( <b className="mb-1 block text-black underline">Renkli Taş Bilgileri</b>)}
      {isEdit && (
        <div className="mb-1 mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke dark:border-strokedark">
            <div className="flex w-full items-center justify-between p-4 text-lg font-medium text-black dark:text-white">
              <span>Renkli Taş Bilgileri</span>
            </div>
          </div>
          <div className="block w-full p-5">
            <div className="grid grid-cols-8 items-center gap-3 rounded-md border-[#e5e9ed] bg-[#f9fafb] p-3 font-medium text-black">
              <div className="text-center">Ürün Kodu</div>
              <div className="text-center">Kesim</div>
              <div className="text-center">Renkli Taş</div>
              <div className="text-center">Karat</div>
              <div className="text-center">Renk</div>
              <div className="text-center">Menşei</div>
              <div className="text-center">Adet</div>
              <div className="text-center">Fiyat</div>
            </div>
            {mainArr?.map((item: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-8 items-center gap-3 border-l-[1px] border-r-[1px] border-t-[1px] border-[#e5e9ed] p-3 font-medium capitalize text-black last:border-b-[1px]"
              >
                <div className="text-center">
                  {item.code ? (
                <a
                  href={`/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/${item.pk}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.code}
                </a>
            ) : (
              "-"
          )}
          </div>
          <div className="text-center">{item.kesim}</div>
          <div className="text-center">{item.renkliTas}</div>
          <div className="text-center">{item.carat}</div>
          <div className="text-center">{item.renk}</div>
          <div className="text-center">{item.mensei}</div>
          <div className="text-center">{item.adet}</div>
          <div className="text-right font-semibold">{Number(item.fiyat).toFixed(2)} $</div>
        </div>
      ))}
    </div>
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
