"use client";
import {
  AddProductService,
  UpdateProductService,
} from "@/Services/Product.Services";

import CustomForm from "@/components/CustomUI/CustomForm";
import useRenkliTasCode from "@/hooks/CodeHooks/useRenkliTasCode";
import { IRenkliTasType } from "../../types/formTypes";
import { RenkliTasListesiData } from "@/utils";
import { AddRenkliTasSections } from "@/utils/MockData";
import { useState } from "react";

export default function RenkliTasDetayContainer({
  renkliTasItemData,
  isAdd,
}: {
  renkliTasItemData: (IRenkliTasType & { code?: string | null }) | null;
  isAdd: boolean;
}) {
  const renkliTasItem: IRenkliTasType = renkliTasItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<IRenkliTasType>(renkliTasItem);

  const { renkliTasCode, extraOptions } = useRenkliTasCode({
    data_frommixedItem: data.frommixedItem ?? null,
    item_frommixedItem: renkliTasItemData?.fromsingleormixed ?? null,
    isAdd: isAdd,
    data_fromsingleormixed: data.fromsingleormixed ?? null,
    item_fromsingleormixed: renkliTasItemData?.fromsingleormixed ?? null,
    productCode: renkliTasItemData?.code,
    data_menstrual_status: data.menstrual_status,
    dataRenkliTasCode: RenkliTasListesiData.find(
      (a) => a.titleVal == data.renkliTas,
    )?.extraValue,
    itemRenkliTasCode: RenkliTasListesiData.find(
      (a) => a.titleVal == renkliTasItemData?.renkliTas,
    )?.extraValue,
  });

  const newData: IRenkliTasType = AddRenkliTasSections.filter(
    (a) => a.groupNumber == 0,
  ).reduce(
    (acc, next) => {
      const elems = next.elements.reduce((acc2, next2) => {
        const name = next2.name as keyof IRenkliTasType;
        if (data[name]) {
          return {
            ...acc2,
            [name]: next2.type == "number" ? Number(data[name]) : data[name],
          };
        }
        return { ...acc2 };
      }, {});
      return { ...acc, [next.keyString]: elems };
    },
    {
      menstrual_status:
        data.menstrual_status == "Sertifikalı" ? "Single" : "Mixed",
      type: "ColoredStone",
      code: renkliTasCode,
      total_cost: 3000,
    },
  );

  return (
    <CustomForm
      setData={setData}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      sections={AddRenkliTasSections.filter((a) => a.groupNumber == activeStep)}
      data={data}
      stepCount={1}
      productCode={renkliTasCode}
      isAdd={isAdd}
      //   resultCallBack={updateData}
      serviceFunction={isAdd ? AddProductService : UpdateProductService}
      filteredData={newData}
      extraOptions={extraOptions}
      redirectUrl="/Admin/StokYonetimi/RenkliTas/RenkliTasListesi"
    />
  );
}
