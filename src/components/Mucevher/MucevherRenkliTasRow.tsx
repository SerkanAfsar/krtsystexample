import CustomSelect from "../CustomUI/CustomSelect";

import CustomInput from "../CustomUI/CustomInput";

import {
  RenkliTasListesiData,
  RenkliTasListesiKesimData,
  RenkliTasListesiMenseiList,
  RenkliTasRenkListesi,
} from "@/data/RenkliTas.data";
import { formatToCurrency } from "@/utils";
import {
  RenkliTasHeaders,
  RenkliTasModelType,
} from "@/app/types/RenkliTas.HeaderType";

export default function MucevherRenkliTasRow({
  model,
  isEdit = false,
}: {
  model: RenkliTasModelType;
  isEdit: boolean;
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
            options: RenkliTasListesiData,
          }}
          value={model.renkliTas as string}
          disabled={isEdit}
        />
      </div>
      <div className={`col-span-${findSpan("kesim")}`}>
        <CustomSelect
          item={{
            name: "kesim",
            required: true,
            type: "select",
            options: RenkliTasListesiKesimData,
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

      <div className={`col-span-${findSpan("renk")}`}>
        <CustomSelect
          item={{
            name: "renk",
            required: true,
            type: "select",
            options: RenkliTasRenkListesi,
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
            rightIcon: "$",
          }}
          value={formatToCurrency(Number(model.fiyat || 0))}
          disabled={isEdit}
        />
      </div>
    </>
  );
}
