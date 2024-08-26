"use client";
import CustomTabs, { TabSectionType } from "@/components/CustomUI/CustomTabs";
import MucevherDetayContainer, {
  MucevherDetayDataType,
} from "./MucevherDetayContainer";
import IsEmirDetayLoglari from "@/components/IsEmirleri/IsEmirDetayLoglari";
import { AddMucevherExternalType, MucevherDetayType } from "@/types/Mucevher";
import { useForm } from "react-hook-form";
import MucevherDetaySectionOne from "@/components/Mucevher/MucevherDetaySectionOne";

export default function MucevherDetayTabsContainer({
  data,
}: {
  data: MucevherDetayType;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddMucevherExternalType>();

  const sections: TabSectionType[] = [
    {
      colName: "Mücevher",
      component: (
        <MucevherDetaySectionOne
          register={register}
          errors={errors}
          isEdit={true}
        />
      ),
    },
    {
      colName: "Mücevher Bilgileri",
      component: (
        <MucevherDetayContainer
          register={register}
          productList={data.inside_products as MucevherDetayDataType[]}
          isEdit={true}
          errors={errors}
          showTitle={false}
        />
      ),
    },
    {
      colName: "İşçilik",
      component: <IsEmirDetayLoglari workOrderLogs={data.work_order_logs} />,
    },
  ];
  return (
    <CustomTabs
      productCode={`Mücevher Kodu : ${data.product_code}`}
      tabs={sections}
    />
  );
}
