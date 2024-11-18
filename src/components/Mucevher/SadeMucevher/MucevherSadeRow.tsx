import { SadeHeaders, SadeModelType } from "@/app/types/Sade.HeaderType";
import CustomSelect from "@/components/CustomUI/CustomSelect";
import {
  AltinAyarData,
  AltinRengiData,
  SadeModelTurleri,
} from "@/data/Sade.data";
import CustomInput from "@/components/CustomUI/CustomInput";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

import { CustomMoneyInput } from "@/components/CustomUI/CustomMoneyInput";
import { stringToMoney } from "@/utils";

export default function MucevherSadeRow({
  model,
  isEdit = false,
  register,
  index,
  errors,
  removeSade,
}: {
  model?: SadeModelType;
  isEdit: boolean;
  index: number;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
  removeSade?: any;
}) {
  const findSpan = (key: keyof SadeModelType): number => {
    return SadeHeaders.find((a) => a.accessor == key)?.span || 1;
  };

  return (
    <>
      <div className={`col-span-${findSpan("modelTuru")}`}>
        <CustomSelect
          item={{
            name: "modelTuru",
            required: true,
            type: "select",
            placeholder: "Model Türü Seçiniz",
            options: SadeModelTurleri,
          }}
          firstOptionText="Model Türü Seçiniz"
          {...register(`products.sade.${index}.modelTuru`, {
            required: "Model Türü Giriniz",
          })}
          value={(model?.modelTuru as string) ?? null}
          err={errors.products?.sade?.[index]?.modelTuru?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("gram")}`}>
        <CustomInput
          item={{
            name: "gram",
            required: true,
            type: "number",
            placeholder: "Gram",
          }}
          {...register(`products.sade.${index}.gram`, {
            required: "Gram Giriniz",
            valueAsNumber: true,
          })}
          value={(model?.gram as number) ?? null}
          err={errors.products?.sade?.[index]?.gram?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("ayar")}`}>
        <CustomSelect
          item={{
            name: "ayar",
            required: true,
            type: "select",
            placeholder: "Ayar",
            options: AltinAyarData,
          }}
          firstOptionText="Ayar Seçiniz"
          {...register(`products.sade.${index}.ayar`, {
            required: "Ayar Giriniz",
          })}
          value={(model?.ayar as string) ?? null}
          err={errors.products?.sade?.[index]?.ayar?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("altinRengi")}`}>
        <CustomSelect
          item={{
            name: "altinRengi",
            required: true,
            type: "select",
            placeholder: "Altın Rengi",
            options: AltinRengiData,
          }}
          {...register(`products.sade.${index}.renk`, {
            required: "Altın Rengi Giriniz",
          })}
          firstOptionText="Altın Rengi Seçiniz"
          value={(model?.altinRengi as string) ?? null}
          err={errors.products?.sade?.[index]?.renk?.message}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("hasGram")}`}>
        <CustomInput
          item={{
            name: "hasGram",
            required: true,
            placeholder: "Has Gramı",
            type: "number",
          }}
          {...register(`products.sade.${index}.hasGram`, {
            required: "Has Gram Giriniz",
            valueAsNumber: true,
          })}
          value={(model?.hasGram as number) ?? null}
          err={errors.products?.sade?.[index]?.hasGram?.message}
          disabled={true}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")} flex gap-3`}>
        <CustomMoneyInput
          item={{
            name: "fiyat",
            required: true,
            type: "number",
            placeholder: "Fiyat",
            rightIcon: "$",
          }}
          {...register(`products.sade.${index}.fiyat`, {
            required: "Fiyat Giriniz",
          })}
          value={
            model?.fiyat
              ? !isEdit
                ? stringToMoney(model.fiyat).toString()
                : (model?.fiyat as number)
              : undefined
          }
          err={errors.products?.sade?.[index]?.fiyat?.message}
          disabled={isEdit}
        />
        {!isEdit && (
          <button
            type="button"
            onClick={() => removeSade(index)}
            className="btn self-start rounded-md bg-red p-3 text-white"
          >
            Sil
          </button>
        )}
      </div>

      <div className="hidden">
        <input
          type="hidden"
          {...register(`products.sade.${index}.type`, {
            required: false,
          })}
          value={"Simple"}
        />
      </div>
    </>
  );
}
