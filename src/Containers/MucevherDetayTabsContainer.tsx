"use client";
import CustomTabs, { TabSectionType } from "@/components/CustomUI/CustomTabs";
import IsEmirDetayLoglari from "@/components/IsEmirleri/IsEmirDetayLoglari";
import { AddMucevherExternalType, MucevherDetayType } from "@/types/Mucevher";
import { useForm } from "react-hook-form";
import MucevherDetaySectionOne from "@/components/Mucevher/MucevherDetaySectionOne";
import MucevherDetayContainer, {
  CustomArrType,
} from "./MucevherDetayContainer";
import { ProductType } from "../../types/types";

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
    formState: { errors },
  } = useForm<AddMucevherExternalType>();

  const arr =
    data?.inside_products?.reduce<CustomArrType>(
      (acc: CustomArrType, nextItem: any) => {
        if (nextItem["product"]) {
          const productItem = nextItem.product as ProductType;
          const newItem = {
            renkliTas: productItem.properties?.renkliTas as string,
            carat: productItem.properties?.carat as number,
            type: productItem.type as string,
            mensei: productItem.properties?.mensei as string,
            berraklik: productItem.properties?.berraklik as string,
            adet: (nextItem?.quantity as number) || null,
            kesim: productItem.properties?.kesim as string,
            renk: productItem.properties?.renk as string,
            altinRengi: productItem.properties?.altinRengi as string,
            fiyat: productItem.total_cost as number,
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
        <MucevherDetaySectionOne
          register={register}
          setValue={setValue}
          errors={errors}
          isEdit={isEdit}
          mainData={data.product as ProductType}
        />
      ),
    },
    {
      colName: "Mücevher Bilgileri",
      component: (
        <MucevherDetayContainer
          register={register}
          productList={arr}
          isEdit={isEdit}
          errors={errors}
          showTitle={false}
        />
      ),
    },
    {
      colName: data.work_order_logs && "İşçilik",
      component: data.work_order_logs && (
        <IsEmirDetayLoglari workOrderLogs={data.work_order_logs} />
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
