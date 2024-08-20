import { SadeHeaders, SadeModelType } from "@/app/types/Sade.HeaderType";
import CustomSelect from "../CustomUI/CustomSelect";
import { AltinRengiData, SadeModelTurleri } from "@/data/Sade.data";
import CustomInput from "../CustomUI/CustomInput";
import { formatToCurrency } from "@/utils";

export default function MucevherSadeRow({
  model,
  isEdit = false,
}: {
  model: SadeModelType;
  isEdit: boolean;
}) {
  console.log(model);
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
            options: SadeModelTurleri,
          }}
          value={model.modelTuru as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("gram")}`}>
        <CustomInput
          item={{
            name: "gram",
            required: true,
            type: "number",
          }}
          value={model.gram as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("ayar")}`}>
        <CustomInput
          item={{
            name: "ayar",
            required: true,
            type: "number",
          }}
          value={model.ayar as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("renk")}`}>
        <CustomSelect
          item={{
            name: "altinRengi",
            required: true,
            type: "select",
            options: AltinRengiData,
          }}
          value={model.renk as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("hasGram")}`}>
        <CustomInput
          item={{
            name: "hasGram",
            required: true,
            type: "number",
          }}
          value={model.hasGram as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")}`}>
        <CustomInput
          item={{
            name: "hasGram",
            required: true,
            type: "text",
            rightIcon: "$",
          }}
          value={formatToCurrency(Number(model?.fiyat || 0))}
          disabled={isEdit}
        />
      </div>
    </>
  );
}
