"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn } from "@/utils";
import {
  ProductItemsType,
  WorkOrderProductType,
} from "../../../types/WorkOrder.types";

export type UrunGruplariModulType = {
  title: string;
  buttonText: string;
  headerColumns: { title: string; accessor: string }[];
  tableFunction?: any;
  modalHeaderColumns?: any;
};

export type SeciliUrunType = {
  [key: string]: string | number;
};

export default function UrunGruplariModul({
  item: { title, buttonText, headerColumns, tableFunction, modalHeaderColumns },
  setValues,
}: {
  item: UrunGruplariModulType;
  setValues?: any;
}) {
  const [selectedValues, setSelectedValues] = useState<SeciliUrunType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const items: WorkOrderProductType[] = selectedValues.map((item) => ({
      product_id: Number(item.pk),
      quantity: item.adet ? Number(item.adet) : null,
      used_carat: item.used_carat ? Number(item.used_carat) : null,
      price: item.maliyetPrice ? Number(item.maliyetPrice) : null,
    }));

    setValues((prev: ProductItemsType[]) => {
      const indexNo = prev.findIndex((a) => a.title == title);
      if (indexNo > -1) {
        const updatedObject = { ...prev[indexNo], products: items };
        const newData = [...prev];
        newData[indexNo] = updatedObject;
        return [...newData];
      }
    });
  }, [selectedValues, setValues, title]);

  return (
    <>
      <section
        onClick={(e) => {
          if (modalOpen) {
            e.stopPropagation();
          }
        }}
        className="mb-3 flex w-full flex-col gap-3"
      >
        <div className="flex w-full items-center justify-between">
          <b>{title}</b>
          <button
            type="button"
            className="btn block rounded-md bg-primary px-3 py-2 text-center text-white"
            onClick={() => setModalOpen(true)}
          >
            {buttonText}
          </button>
        </div>
        <div
          className={cn(
            "grid gap-2 bg-gray p-2 text-left text-black",
            `grid-cols-${headerColumns.length}`,
          )}
        >
          {headerColumns.map((key, index) => (
            <b key={index}>{key.title}</b>
          ))}
        </div>
        <div className="flex flex-col">
          {selectedValues.map((item, index) => (
            <div
              key={index}
              className={cn(
                "grid gap-2  p-2 text-left text-black",
                `grid-cols-${headerColumns.length}`,
                "border-b-2 border-black",
              )}
            >
              {Object.entries(item).map(([key, value], index) => {
                if (
                  index != 0 &&
                  headerColumns.findIndex((a) => a.accessor == key) > -1
                ) {
                  return <div key={index}>{value}</div>;
                }
              })}
            </div>
          ))}
        </div>
        <div className="self-end"></div>
      </section>
      {modalOpen && (
        <IsEmirleriModal
          setModalOpen={setModalOpen}
          tableFunction={tableFunction}
          modalHeaderColumns={modalHeaderColumns}
          title={buttonText}
          setSelectedValues={setSelectedValues}
          selectedValues={selectedValues}
        />
      )}
    </>
  );
}
