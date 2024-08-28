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

export default function MucevherRenkliTasRow({
  model,
  isEdit = false,
  register,
  errors,
  index,
}: {
  model: RenkliTasModelType;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  index: number;
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
          value={(model?.renkliTas as string) ?? null}
          err={errors.products?.renkliTas?.[index]?.["renkliTas"]?.message}
          // value={model.renkliTas as string}
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
          value={(model?.kesim as string) ?? null}
          err={errors.products?.renkliTas?.[index]?.["kesim"]?.message}
          // value={model.kesim as string}
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
          // value={model.karat as number}
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
          // value={model.adet as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")}`}>
        <CustomInput
          item={{
            name: "fiyat",
            required: true,
            type: "number",
            placeholder: "Fiyat Giriniz",
            rightIcon: "$",
          }}
          {...register(`products.renkliTas.${index}.fiyat`, {
            required: "Fiyat Giriniz",
            valueAsNumber: true,
          })}
          value={(model?.fiyat as number) ?? null}
          err={errors.products?.renkliTas?.[index]?.["fiyat"]?.message}
          // value={formatToCurrency(Number(model.fiyat || 0))}
          disabled={isEdit}
        />
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
