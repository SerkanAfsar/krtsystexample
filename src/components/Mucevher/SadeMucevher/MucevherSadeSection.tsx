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

  return (
    <div className="mb-3 flex w-full flex-col gap-3">
      {!isEdit && ( <b className="mb-1 block text-black underline">Sade Bilgileri</b>)}
      {isEdit && (
        <div className="my-3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke dark:border-strokedark">
            <div className="p-4 text-lg font-medium text-black dark:text-white">
              Sade Bilgileri
            </div>
          </div>
          <hr />
          <div className="block w-full p-5">
            <div className="grid grid-cols-7 items-center gap-3 rounded-md border-[#e5e9ed] bg-[#f9fafb] p-3 font-medium text-black">
              <div className="text-center">Ürün Kodu</div>
              <div className="text-center">Model Türü</div>
              <div className="text-center">Gram</div>
              <div className="text-center">Ayar</div>
              <div className="text-center">Renk</div>
              <div className="text-center">Has Gramı</div>
              <div className="text-center">Fiyat</div>
            </div>
            {mainArr?.map((item: any, index: number) => (
              <div
                key={item.id}
                className="grid grid-cols-7 items-center gap-3 border-l-[1px] border-r-[1px] border-t-[1px] border-[#e5e9ed] p-3 font-medium capitalize text-black last:border-b-[1px]"
              >
                <div className="text-center">
                  {item.code ? (
                    <a
                      href={`/Admin/StokYonetimi/Sade/SadeEkle/${item.pk}`}
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
                <div className="text-center">{item.modelTuru}</div>
                <div className="text-center">{item.gram}</div>
                <div className="text-center">{item.ayar}</div>
                <div className="text-center">{item.altinRengi}</div>
                <div className="text-center">{item.hasGram}</div>
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
