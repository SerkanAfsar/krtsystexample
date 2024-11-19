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
import { CustomMoneyInput } from "@/components/CustomUI/CustomMoneyInput";
import { stringToMoney } from "@/utils";

export default function MucevherPirlantaRow({
  model,
  isEdit = false,
  register,
  errors,
  index,
  removePirlanta,
}: {
  model: PirlantaModelType;
  isEdit: boolean;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  index: number;
  removePirlanta?: any;
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
          firstOptionText="Kesim Seçiniz"
          value={(model?.kesim as string) ?? null}
          err={errors.products?.pirlanta?.[index]?.["kesim"]?.message}
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
            valueAsNumber: true,
          })}
          value={(model?.carat as number) ?? null}
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
          firstOptionText="Berranlık Seçiniz"
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
          firstOptionText="Renk Seçiniz"
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
          firstOptionText="Menşei Seçiniz"
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
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["adet"]?.message}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")} flex gap-2`}>
        <CustomMoneyInput
          item={{
            name: "fiyat",
            required: true,
            type: "money",
            rightIcon: "$",
            placeholder: "Fiyat Giriniz",
          }}
          value={
            model?.fiyat
              ? !isEdit
                ? stringToMoney(model.fiyat).toString()
                : (model?.fiyat as number)
              : undefined
          }
          {...register(`products.pirlanta.${index}.fiyat`, {
            required: "Fiyat Giriniz",
          })}
          disabled={isEdit}
          err={errors.products?.pirlanta?.[index]?.["fiyat"]?.message}
        />
        {!isEdit && (
          <button
            type="button"
            onClick={() => removePirlanta(index)}
            className="btn self-start rounded-md bg-red p-3 text-white"
          >
            Sil
          </button>
        )}
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
