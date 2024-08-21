import CustomSelect from "../CustomUI/CustomSelect";

import CustomInput from "../CustomUI/CustomInput";

import {
  PirlantaHeaders,
  PirlantaModelType,
} from "@/app/types/Pirlanta.HeaderType";
import {
  PirlantaBerraklikData,
  PirlantaKesimKodlariData,
  PirlantaRenkData,
} from "@/data/Pirlanta.data";
import { RenkliTasListesiMenseiList } from "@/data/RenkliTas.data";
import { formatToCurrency } from "@/utils";

export default function MucevherPirlantaRow({
  model,
  isEdit = false,
}: {
  model: PirlantaModelType;
  isEdit: boolean;
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
            options: PirlantaKesimKodlariData,
          }}
          value={model.kesim as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("karat")}`}>
        <CustomInput
          item={{
            name: "karat",
            required: true,
            type: "number",
          }}
          value={model.karat as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("berraklik")}`}>
        <CustomSelect
          item={{
            name: "berraklik",
            required: true,
            type: "select",
            options: PirlantaBerraklikData,
          }}
          value={model.berraklik as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("renk")}`}>
        <CustomSelect
          item={{
            name: "renk",
            required: true,
            type: "select",
            options: PirlantaRenkData,
          }}
          value={model.renk as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("mensei")}`}>
        <CustomSelect
          item={{
            name: "mensei",
            required: true,
            type: "select",
            staticOptions: RenkliTasListesiMenseiList,
          }}
          value={model.mensei as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("adet")}`}>
        <CustomInput
          item={{
            name: "adet",
            required: true,
            type: "text",
          }}
          value={model.adet as number}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("fiyat")}`}>
        <CustomInput
          item={{
            name: "fiyat",
            required: true,
            type: "text",
          }}
          value={formatToCurrency(Number(model.fiyat || 0))}
          disabled={isEdit}
        />
      </div>
    </>
  );
}
