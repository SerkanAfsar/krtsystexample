"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn, formatToCurrency } from "@/utils";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

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
      used_carat: item.used_carat ? Number(item.used_carat) : 0,
      name: item.name ? item.name : null,
      price:
        item.firstPrice && item.type != "Sade" && item.used_carat
          ? Number(item.firstPrice) * (item.used_carat as number)
          : Number(item.firstPrice),
      type: item.type ? String(item.type) : undefined,
      ayar: item.ayar ? String(item.ayar) : null,
      modelTuru: item.modelTuru ? String(item.modelTuru) : null,
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

  console.log(selectedValues);

  return (
    <>
      <section
        onClick={(e) => {
          if (modalOpen) {
            e.stopPropagation();
          }
        }}
        className="mb-3 flex w-full flex-col gap-2"
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
                "mx-2 mt-1 grid gap-2 text-left text-black",
                `grid-cols-${headerColumns.length}`,
                "items-center",
                "border-b-[1px] border-graydark py-1",
              )}
            >
              {Object.entries(item).map(([key, value], index) => {
                if (
                  index != 0 &&
                  headerColumns.findIndex((a) => a.accessor == key) > -1
                ) {
                  if (key == "carat") {
                    if (item.menstrual_status == "Sertifikalı") {
                      return <div key={index}>{item.carat}</div>;
                    } else {
                      return (
                        <input
                          min="1"
                          key={index}
                          className="ml-[-10px] h-8 w-16 rounded-sm border border-black pl-3 text-center"
                          type="number"
                          value={item.used_carat}
                          onChange={(e) => {
                            const selectedIndexNo = selectedValues.findIndex(
                              (a) => a.pk == item.pk,
                            );
                            const newItems = selectedValues;
                            const changedItem = newItems[selectedIndexNo];

                            const newMaliyet =
                              Number(e.target.value) *
                              Number(changedItem["firstPrice"]);

                            changedItem["used_carat"] = e.target.value;
                            changedItem["maliyet"] =
                              `${formatToCurrency(newMaliyet)} $`;

                            setSelectedValues((prev) => [
                              ...prev.slice(0, selectedIndexNo),
                              changedItem,
                              ...prev.slice(
                                selectedIndexNo + 1,
                                newItems.length,
                              ),
                            ]);
                          }}
                        />
                      );
                    }
                  } else if (key == "adet") {
                    return (
                      <input
                        min="1"
                        key={index}
                        className="p ml-[-12px] h-8 w-16 rounded-sm border border-black pl-3 text-center"
                        type="number"
                        disabled={
                          item?.menstrual_status == "Sertifikalı" ? true : false
                        }
                        value={item.adet}
                        onChange={(e) => {
                          const selectedIndexNo = selectedValues.findIndex(
                            (a) => a.pk == item.pk,
                          );
                          const newItems = selectedValues;
                          const changedItem = newItems[selectedIndexNo];
                          changedItem["adet"] = e.target.value;

                          setSelectedValues((prev) => [
                            ...prev.slice(0, selectedIndexNo),
                            changedItem,
                            ...prev.slice(selectedIndexNo + 1, newItems.length),
                          ]);
                        }}
                      />
                    );
                  } else {
                    return <div key={index}>{value}</div>;
                  }
                }
              })}
              <div className="flex items-center justify-start gap-4">
                <FaPencil className="cursor-pointer" />
                <FaTrash
                  className="cursor-pointer dark:text-white"
                  onClick={(e) => {
                    setSelectedValues((prev: SeciliUrunType[]) =>
                      prev.filter((a) => a.pk != item.pk),
                    );
                  }}
                />
              </div>
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
