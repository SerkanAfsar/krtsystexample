"use client";

import CustomForm from "@/components/CustomUI/CustomForm";

import { useState } from "react";
import { TedarikciType } from "../types/types";
import { AddTedarikciSections } from "@/utils/MockData";
import {
  AddTedarikciApiService,
  UpdateTedarikciApiService,
} from "@/ApiServices/Suppliers.ApiService";
import { useTedarikciModalData } from "@/store/useModalStore";
import CustomTabs, { TabSectionType } from "@/components/CustomUI/CustomTabs";
import useTedarikciyeBagliUrunlerTable from "@/hooks/SatisHooks/useTedarikciyeBagliUrunler";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import { SupplierProductDataTableHeaders } from "@/types/Tedarikci";
import { stringToMoney } from "@/utils";

export default function TedarikciDetayContainer({
  tedarikciItemData,
  isAdd,
  isRedirect = true,
}: {
  tedarikciItemData: TedarikciType | null;
  isAdd: boolean;
  isRedirect: boolean;
}) {
  const tedarikciItem: TedarikciType = tedarikciItemData ?? {};
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState<TedarikciType>(tedarikciItem);
  const { setTedarikciModalOpen } = useTedarikciModalData();

  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useTedarikciyeBagliUrunlerTable({
      tedarikciId: tedarikciItemData?.id || 0,
    });

  const newData: any = AddTedarikciSections.reduce((acc, next) => {
    const elems = next.elements.reduce((acc2, next2) => {
      const name = next2.name as keyof TedarikciType;

      if (data[name]) {
        return {
          ...acc2,
          [name]:
            next2.type == "number" || next2.type == "money"
              ? stringToMoney(data[name])
              : data[name],
        };
      }
      return { ...acc2 };
    }, {});
    return { ...acc, [next.keyString]: elems };
  }, {});

  const filteredData = Object.values(newData).reduce<TedarikciType>(
    (acc: any, next: any) => {
      return { ...acc, ...next };
    },
    {
      type: "deneme",
    },
  );

  if (isAdd) {
    return (
      <CustomForm
        setData={setData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        sections={AddTedarikciSections.filter(
          (a) => a.groupNumber == activeStep,
        )}
        data={data}
        stepCount={1}
        isAdd={isAdd}
        serviceFunction={
          isAdd ? AddTedarikciApiService : UpdateTedarikciApiService
        }
        filteredData={filteredData}
        redirectUrl={
          isRedirect
            ? "/Admin/Firmalar/Tedarikciler/TedarikciListesi"
            : undefined
        }
        extraCallBack={setTedarikciModalOpen}
      />
    );
  }

  const sections: TabSectionType[] = [
    {
      colName: "Tedarikçi Bilgileri",
      component: (
        <CustomForm
          setData={setData}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          sections={AddTedarikciSections.filter(
            (a) => a.groupNumber == activeStep,
          )}
          data={data}
          stepCount={1}
          isAdd={isAdd}
          serviceFunction={
            isAdd ? AddTedarikciApiService : UpdateTedarikciApiService
          }
          filteredData={filteredData}
          redirectUrl={
            isRedirect
              ? "/Admin/Firmalar/Tedarikciler/TedarikciListesi"
              : undefined
          }
          extraCallBack={setTedarikciModalOpen}
        />
      ),
    },
    {
      colName: "Tedarikçiden Satın Alınan Ürünler",
      component: tedarikciItem?.id && (
        <>
          {error ? (
            <div>{error}</div>
          ) : (
            <CustomDatatable
              totalPageCount={totalPageCount}
              columns={SupplierProductDataTableHeaders}
              data={activeData}
              activePage={activePage}
              isFirstLarge={false}
              setActivePage={setActivePage}
            />
          )}
        </>
      ),
    },
  ];

  return <CustomTabs productCode={""} tabs={sections} />;
}
