import { SadeHeaders, SadeModelType } from "@/app/types/Sade.HeaderType";
import CustomSelect from "@/components/CustomUI/CustomSelect";
import { AltinRengiData, SadeModelTurleri } from "@/data/Sade.data";
import CustomInput from "@/components/CustomUI/CustomInput";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddMucevherExternalType } from "@/types/Mucevher";

export default function MucevherSadeRow({
  model,
  isEdit = false,
  register,
  index,
  errors,
}: {
  model?: SadeModelType;
  isEdit: boolean;
  index: number;
  register: UseFormRegister<AddMucevherExternalType>;
  errors: FieldErrors<AddMucevherExternalType>;
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
          {...register(`products.sade.${index}.modelTuru`, {
            required: "Model Türü Giriniz",
          })}
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
          err={errors.products?.sade?.[index]?.gram?.message}
          // value={model?.gram as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("ayar")}`}>
        <CustomInput
          item={{
            name: "ayar",
            required: true,
            type: "number",
            placeholder: "Ayar",
          }}
          {...register(`products.sade.${index}.ayar`, {
            required: "Ayar Giriniz",
          })}
          err={errors.products?.sade?.[index]?.ayar?.message}
          // value={model?.ayar as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("renk")}`}>
        <CustomSelect
          item={{
            name: "altinRengi",
            required: true,
            type: "select",
            placeholder: "Altın Rengi",
            options: AltinRengiData,
          }}
          {...register(`products.sade.${index}.altinRengi`, {
            required: "Altın Rengi Giriniz",
          })}
          err={errors.products?.sade?.[index]?.altinRengi?.message}
          // value={model?.renk as string}
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
          err={errors.products?.sade?.[index]?.hasGram?.message}
          // value={model?.hasGram as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")}`}>
        <CustomInput
          item={{
            name: "fiyat",
            required: true,
            type: "number",
            placeholder: "Fiyat",
            rightIcon: "$",
          }}
          {...register(`products.sade.${index}.fiyat`, {
            required: "Fiyat Giriniz",
            valueAsNumber: true,
          })}
          err={errors.products?.sade?.[index]?.fiyat?.message}
          // value={formatToCurrency(Number(model?.fiyat || 0))}
          disabled={isEdit}
        />
      </div>
    </>
  );
}
