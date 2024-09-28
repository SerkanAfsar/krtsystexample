import CustomInput from "@/components/CustomUI/CustomInput";
import CustomSelect from "@/components/CustomUI/CustomSelect";
import {
  PirlantaHeaders,
  PirlantaModelType,
} from "@/app/types/Pirlanta.HeaderType";
import {
  PirlantaBerraklikData,
  PirlantaKesimKodlariData,
  PirlantaRenkData,
} from "@/data/Pirlanta.data";
import { MenseiSelectedOptionsList } from "@/data/RenkliTas.data";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

export default function MucevherPirlantaRow({
  model,
  isEdit = false,
  register,
  errors,
  index,
}: {
  model: PirlantaModelType;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  index: number;
}) {
  const findSpan = (key: keyof PirlantaModelType): number => {
    return PirlantaHeaders.find((a) => a.accessor == key)?.span || 1;
  };
  return (
    <>
      <div className={`col-span-${findSpan("kesim")}`}>
        <CustomSelect
          item={{
            name: "kesim",
            required: true,
            type: "select",
            placeholder: "Kesim Seçiniz",
            options: PirlantaKesimKodlariData,
          }}
          {...register(`products.pirlanta.${index}.kesim`, {
            required: "Kesim Giriniz",
          })}
          value={(model?.kesim as string) ?? null}
          err={errors.products?.pirlanta?.[index]?.["kesim"]?.message}
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
          {...register(`products.pirlanta.${index}.carat`, {
            required: "Karat Giriniz",
          })}
          value={(model?.carat as number) ?? null}
          // value={model.karat as number}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["carat"]?.message}
        />
      </div>
      <div className={`col-span-${findSpan("berraklik")}`}>
        <CustomSelect
          item={{
            name: "berraklik",
            required: true,
            type: "select",
            options: PirlantaBerraklikData,
            placeholder: "Berranlık Seçiniz",
          }}
          value={(model?.berraklik as string) ?? null}
          {...register(`products.pirlanta.${index}.berraklik`, {
            required: "Berraklık Giriniz",
          })}
          // value={model.berraklik as string}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["berraklik"]?.message}
        />
      </div>
      <div className={`col-span-${findSpan("renk")}`}>
        <CustomSelect
          item={{
            name: "renk",
            required: true,
            type: "select",
            options: PirlantaRenkData,
            placeholder: "Renk Seçiniz",
          }}
          value={(model?.renk as string) ?? null}
          {...register(`products.pirlanta.${index}.renk`, {
            required: "Renk Giriniz",
          })}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["renk"]?.message}
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
          {...register(`products.pirlanta.${index}.mensei`, {
            required: "Mensei Giriniz",
          })}
          value={(model?.mensei as string) ?? null}
          // value={model.mensei as string}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["mensei"]?.message}
        />
      </div>
      <div className={`col-span-${findSpan("adet")}`}>
        <CustomInput
          item={{
            name: "adet",
            required: true,
            type: "number",
            placeholder: "Adet Giriniz",
          }}
          value={(model?.adet as number) ?? null}
          {...register(`products.pirlanta.${index}.adet`, {
            required: "Adet Giriniz",
            valueAsNumber: true,
          })}
          // value={model.adet as number}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["adet"]?.message}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")}`}>
        <CustomInput
          item={{
            name: "fiyat",
            required: true,
            type: "number",
            rightIcon: "$",
            placeholder: "Fiyat Giriniz",
          }}
          value={(model?.fiyat as number) ?? null}
          {...register(`products.pirlanta.${index}.fiyat`, {
            required: "Fiyat Giriniz",
            valueAsNumber: true,
          })}
          // value={formatToCurrency(Number(model.fiyat || 0))}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["fiyat"]?.message}
        />
      </div>
      <div className="hidden">
        <input
          type="hidden"
          {...register(`products.pirlanta.${index}.type`, {
            required: false,
          })}
          value={"Diamond"}
        />
      </div>
    </>
  );
}
