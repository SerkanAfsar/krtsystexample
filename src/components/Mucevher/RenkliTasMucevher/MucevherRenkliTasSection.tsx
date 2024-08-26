import { cn, formatToCurrency } from "@/utils";
import { MucevherDetayDataType } from "@/Containers/MucevherDetayContainer";

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
  renkliTasProducts: MucevherDetayDataType[] | null;
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

  const toplamRenkliTasPrice = renkliTasProducts?.reduce((acc, next) => {
    return acc + Number(next.product.total_cost || 0);
  }, 0);

  const toplamRenkliTasAdet = renkliTasProducts?.reduce((acc, next) => {
    return acc + Number(next.quantity || 0);
  }, 0);

  return (
    <div className="my-3 w-full">
      <b className="mb-1 block text-black">Renkli Taş Bilgileri</b>
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
          const newItem: RenkliTasModelType = {
            renkliTas: item.product.properties?.renkliTas as string,
            kesim: item.product.properties?.kesim as string,
            carat: item.product.properties?.carat as number,
            adet: item.quantity as number,
            mensei: item.product.properties?.mensei as string,
            fiyat: item.product.total_cost as number,
            renk: item.product.properties?.renk as string,
          };

          return (
            <MucevherRenkliTasRow
              register={register}
              errors={errors}
              isEdit={isEdit}
              key={index}
              index={index}
              model={newItem}
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
      {/* {isEdit && (
        <div className="flex w-full justify-end">
          <div className="float-right flex w-auto flex-col flex-wrap font-bold text-black">
            <div className="flex">
              <div>Toplam Renkli Taş Fiyat &nbsp;:&nbsp;</div>
              <div>{formatToCurrency(toplamRenkliTasPrice || 0)} $</div>
            </div>
            <div className="flex">
              <div>Toplam Renkli Taş Adet &nbsp;:&nbsp;</div>
              <div>{toplamRenkliTasAdet}</div>
            </div>
          </div>
        </div>
      )} */}
      {!isEdit && (
        <div className="w-full text-right">
          <button
            type="button"
            className="w-40 rounded-md bg-primary px-4 py-2 text-center text-white"
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
                },
              ]);
            }}
          >
            Renkli Taş Ekle
          </button>
        </div>
      )}
      {isEdit && (
        <div className="flex w-full justify-end">
          <div className="float-right flex w-auto flex-col flex-wrap font-bold text-black">
            <div className="flex">
              <div>Toplam Renkli Taş Fiyat &nbsp;:&nbsp;</div>
              <div>{formatToCurrency(toplamRenkliTasPrice || 0)} $</div>
            </div>
            <div className="flex">
              <div>Toplam Renkli Taş Adet &nbsp;:&nbsp;</div>
              <div>{toplamRenkliTasAdet}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
