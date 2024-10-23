"use client";

import CustomForm from "@/components/CustomUI/CustomForm";

import { useState } from "react";
import { MusteriType } from "../../types/types";
import { AddMusteriSections } from "@/utils/MockData";
import {
  AddCustomerApiService,
  UpdateCustomerApiService,
} from "@/ApiServices/Customer.ApiService";
import CustomTabs, { TabSectionType } from "@/components/CustomUI/CustomTabs";
import useMusteriSatilanUrunlerTable from "@/hooks/SatisHooks/useMusteriSatilanUrunlerTable";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import { CustomerSaledProductsHeader } from "@/types/Satis";
import { useTedarikciModalData } from "@/store/useModalStore";

export default function MusteriDetayContainer({
  musteriItemData,
  isAdd,
  isRedirect = true,
}: {
  musteriItemData: MusteriType | null;
  isAdd: boolean;
  isRedirect: boolean;
}) {
  const musteriItem: MusteriType = musteriItemData ?? { area: "Domestic" };
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<MusteriType>(musteriItem);
  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useMusteriSatilanUrunlerTable({ customerId: musteriItemData?.id || 0 });

  const { musteriModalData, setMusteriModalData } = useTedarikciModalData();

  const newData: any = AddMusteriSections.reduce((acc, next) => {
    const elems = next.elements.reduce((acc2, next2) => {
      const name = next2.name as keyof MusteriType;
      if (data[name]) {
        return {
          ...acc2,
          [name]: next2.type == "number" ? Number(data[name]) : data[name],
        };
      }
      return { ...acc2 };
    }, {});
    return { ...acc, [next.keyString]: elems };
  }, {});

  const filteredData = Object.values(newData).reduce<MusteriType>(
    (acc: any, next: any) => {
      return { ...acc, ...next };
    },
    {},
  );

  if (isAdd) {
    return (
      <CustomForm
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        sections={AddMusteriSections.filter((a) => a.groupNumber == activeStep)}
        data={data}
        stepCount={1}
        isAdd={isAdd}
        serviceFunction={
          isAdd ? AddCustomerApiService : UpdateCustomerApiService
        }
        filteredData={
          filteredData.area == "Domestic"
            ? { ...filteredData, country_code: "" }
            : { ...filteredData }
        }
        extraCallBack={setMusteriModalData}
        redirectUrl={
          isRedirect ? "/Admin/Firmalar/Musteriler/MusteriListesi" : undefined
        }
      />
    );
  }
  const sections: TabSectionType[] = [
    {
      colName: "Müşteri Bilgileri",
      component: (
        <CustomForm
          setData={setData}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          sections={AddMusteriSections.filter(
            (a) => a.groupNumber == activeStep,
          )}
          data={data}
          stepCount={1}
          isAdd={isAdd}
          serviceFunction={
            isAdd ? AddCustomerApiService : UpdateCustomerApiService
          }
          filteredData={filteredData}
          redirectUrl="/Admin/Firmalar/Musteriler/MusteriListesi"
        />
      ),
    },
    {
      colName: "Müşteriye Satılan Ürünler",
      component: musteriItemData?.id ? (
        <CustomDatatable
          totalPageCount={totalPageCount}
          columns={CustomerSaledProductsHeader}
          data={activeData}
          activePage={activePage}
          isFirstLarge={false}
          setActivePage={setActivePage}
        />
      ) : (
        <div>Deneme</div>
      ),
    },
  ];

  return <CustomTabs productCode={""} tabs={sections} />;
}
