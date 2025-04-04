"use client";
import CustomTabs, { TabSectionType } from "@/components/CustomUI/CustomTabs";

import { AddMucevherExternalType, MucevherDetayType } from "@/types/Mucevher";
import { useForm } from "react-hook-form";
import MucevherDetaySectionOne from "@/components/Mucevher/MucevherDetaySectionOne";
import MucevherDetayContainer, {
  CustomArrType,
} from "./MucevherDetayContainer";
import { ProductType } from "../types/types";
import IsEmirleriLoglari from "@/components/IsEmirleri/IsEmirLoglari";

export default function MucevherDetayTabsContainer({
  data,
  isEdit,
}: {
  data: MucevherDetayType;
  isEdit: boolean;
}) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddMucevherExternalType>();
  const arr =
    data?.inside_products?.reduce<CustomArrType>(
      (acc: CustomArrType, nextItem: any) => {
        if (nextItem["product"]) {
          const productItem = nextItem.product as ProductType;
          const newItem = {
            code: productItem.code as string,
            pk: productItem.pk as number,
            renkliTas: productItem.properties?.renkliTas as string,
            carat: nextItem?.used_carat && nextItem.used_carat > 0 
              ? (nextItem.used_carat as number) 
              : (productItem.properties?.carat as number),
            type: productItem.type as string,
            mensei: productItem.properties?.mensei as string,
            berraklik: productItem.properties?.berraklik as string,
            adet: (nextItem?.quantity as number) || null,
            kesim: productItem.properties?.kesim as string,
            renk: productItem.properties?.renk as string,
            altinRengi: productItem.properties?.altinRengi as string,
            fiyat: nextItem.current_cost,
            modelTuru: productItem.properties?.modelTuru as string,
            gram: productItem.properties?.gram as number,
            ayar: productItem.properties?.ayar as number,
            hasGram: productItem.properties?.hasGrami as number,
          };
          return [...acc, newItem];
        } else {
          return [...acc, nextItem];
        }
      },
      [],
    ) || null;

   const sections: TabSectionType[] = [
  {
    colName: "Mücevher",
    component: (
      <div className="space-y-6">
        <div className="p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <MucevherDetaySectionOne
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            isEdit={isEdit}
            mainData={data.product as ProductType}
          />
        </div>

        <div className="p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <MucevherDetayContainer
            register={register}
            productList={arr}
            isEdit={isEdit}
            errors={errors}
            showTitle={false}
          />
        </div>

        {data.work_order_logs && (
            <IsEmirleriLoglari workOrderLogs={data.work_order_logs} />
        )}
      </div>
    ),
  },
];

    
  return (
    <CustomTabs
      productCode={`Mücevher Kodu : ${data.product_code || data.product?.code}`}
      tabs={sections}
    />
  );
}
