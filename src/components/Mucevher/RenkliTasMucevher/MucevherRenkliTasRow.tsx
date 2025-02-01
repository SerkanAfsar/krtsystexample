import CustomSelect from "../../CustomUI/CustomSelect";

import CustomInput from "../../CustomUI/CustomInput";

import {
  MenseiSelectedOptionsList,
  RenkliTasListesiData,
  RenkliTasListesiKesimData,
  RenkliTasRenkListesi,
} from "@/data/RenkliTas.data";

import {
  RenkliTasHeaders,
  RenkliTasModelType,
} from "@/app/types/RenkliTas.HeaderType";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

import { CustomMoneyInput2 } from "@/components/CustomUI/CustomMoneyInput2";

export default function MucevherRenkliTasRow({
  model,
  isEdit = false,
  register,
  errors,
  removeRenkliTas,
  index,
}: {
  model: RenkliTasModelType;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  index: number;
  removeRenkliTas?: any;
}) {
  const findSpan = (key: keyof RenkliTasModelType): number => {
    return RenkliTasHeaders.find((a) => a.accessor == key)?.span || 1;
  };
  return (
    <>
      <div className={`col-span-${findSpan("renkliTas")}`}>
        <CustomSelect
          item={{
            name: "renkliTas",
            required: true,
            type: "select",
            placeholder: "Renkli Taş Seçiniz",
            options: RenkliTasListesiData,
          }}
          {...register(`products.renkliTas.${index}.renkliTas`, {
            required: "Renkli Taş Giriniz",
          })}
          firstOptionText="Renkli Taş Seçiniz"
          value={(model?.renkliTas as string) ?? null}
          err={errors.products?.renkliTas?.[index]?.["renkliTas"]?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("kesim")}`}>
        <CustomSelect
          item={{
            name: "kesim",
            required: true,
            type: "select",
            placeholder: "Kesim Seçiniz",
            options: RenkliTasListesiKesimData,
          }}
          {...register(`products.renkliTas.${index}.kesim`, {
            required: "Kesim Giriniz",
          })}
          firstOptionText="Kesim Seçiniz"
          value={(model?.kesim as string) ?? null}
          err={errors.products?.renkliTas?.[index]?.["kesim"]?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("carat")}`}>
        <CustomInput
          item={{
            name: "carat",
            required: true,
            type: "number",
            placeholder: "Karat Giriniz",
          }}
          {...register(`products.renkliTas.${index}.carat`, {
            required: "Karat Giriniz",
            valueAsNumber: true,
          })}
          value={(model?.carat as number) ?? null}
          err={errors.products?.renkliTas?.[index]?.["carat"]?.message}
          disabled={isEdit}
        />
      </div>

      <div className={`col-span-${findSpan("renk")}`}>
        <CustomSelect
          item={{
            name: "renk",
            required: true,
            type: "select",
            placeholder: "Renk Seçiniz",
            options: RenkliTasRenkListesi,
          }}
          firstOptionText="Renk Seçiniz"
          {...register(`products.renkliTas.${index}.renk`, {
            required: "Renk Giriniz",
          })}
          value={(model?.renk as string) ?? null}
          err={errors.products?.renkliTas?.[index]?.["renk"]?.message}
          // value={model.renk as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("mensei")}`}>
        <CustomSelect
          item={{
            name: "mensei",
            required: true,
            type: "select",
            placeholder: "Menşei Seçiniz",
            options: MenseiSelectedOptionsList,
          }}
          {...register(`products.renkliTas.${index}.mensei`, {
            required: "Menşei Giriniz",
          })}
          firstOptionText="Menşei Seçiniz"
          value={(model?.mensei as string) ?? null}
          err={errors.products?.renkliTas?.[index]?.["mensei"]?.message}
          // value={model.mensei as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("adet")}`}>
        <CustomInput
          item={{
            name: "adet",
            required: true,
            placeholder: "Adet Giriniz",
            type: "number",
          }}
          {...register(`products.renkliTas.${index}.adet`, {
            required: "Adet Giriniz",
            valueAsNumber: true,
          })}
          value={(model?.adet as number) ?? null}
          err={errors.products?.renkliTas?.[index]?.["adet"]?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")} flex gap-2`}>
        <CustomMoneyInput2
          item={{
            name: "fiyat",
            required: true,
            type: "text",
            placeholder: "Fiyat Giriniz",
            rightIcon: "$",
          }}
          {...register(`products.renkliTas.${index}.fiyat`, {
            valueAsNumber: true,
            required: "Fiyat Giriniz",
          })}
          value={model.fiyat as number}
          err={errors.products?.renkliTas?.[index]?.["fiyat"]?.message}
          disabled={isEdit}
        />
        {!isEdit && (
          <button
            type="button"
            onClick={() => removeRenkliTas(index)}
            className="btn self-start rounded-md bg-red p-3 text-white"
          >
            Sil
          </button>
        )}
      </div>
      <div className="hidden">
        <input
          type="hidden"
          {...register(`products.renkliTas.${index}.type`, {
            required: false,
          })}
          value={"ColoredStone"}
        />
      </div>
    </>
  );
}
