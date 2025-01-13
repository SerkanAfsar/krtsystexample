"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn, formatToCurrency } from "@/utils";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

import {
  ProductItemsType,
  WorkOrderProductType,
} from "../../types/WorkOrder.types";
import Image from "next/image";

export type UrunGruplariModulType = {
  title: string;
  buttonText: string;
  headerColumns: { title: string; accessor: string; isCenter?: boolean }[];
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
      quantity: item.adet ? Number(item.adet) : 1,
      used_carat: item.used_carat ? Number(item.used_carat) : Number(item.carat),
      name: (item.name as string) ?? null,
      price:
        item.caratPrice && item.type != "Sade" && item.used_carat
          ? Number(item.caratPrice) * (item.used_carat as number) *(item.adet as number)
          : Number(item.firstPrice),
      type: item.type ? String(item.type) : undefined,
      ayar: item.ayar ? String(item.ayar) : null,
      modelTuru: item.modelTuru ? String(item.modelTuru) : null,
      renk: (item.renk as string) ?? null,
      caratPrice : Number(item.caratPrice)
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
        className="mb-3 flex w-full flex-col gap-2"
      >
        <div className="flex text-black w-full items-center justify-between">
          <b>{title}</b>
          <button
            type="button"
            className="btn block w-35 rounded-md bg-primary px-3 py-1 text-center text-white"
            onClick={() => setModalOpen(true)}
          >
            {buttonText}
          </button>
        </div>
        <div
          className={cn(
            "grid gap-2 py-2 text-gray-500 text-left dark:text-white", 
            `grid-cols-${headerColumns.length}`,
            "border-b-2 border-t-2 border-stone-200",
          )}
        >
          {headerColumns.map((key, index) => (
            <label className="font-bold dark:font-normal" key={index}>
              {key.title}
            </label>
          ))}
        </div>
        <div className="flex flex-col">
          {selectedValues.map((item, index) => (
            <div
              key={index}
              className={cn(
                "mt-1 grid gap-2 pb-2 text-left text-black",
                `grid-cols-${headerColumns.length}`,
                "items-center",
                "border-b-[1px] border-stone-400 py-",
              )}
            >
              {Object.entries(item).map(([key, value], index) => {
                if (
                  index != 0 &&
                  headerColumns.findIndex((a) => a.accessor == key) > -1
                ) {
                  if (key == "carat") {
                    if (item.menstrual_status == "Sertifikalı") {
                      return (
                        <div className="dark:text-white" key={index}>
                          {item.carat}
                        </div>
                      );
                    } else {
                      return (
                        <input
                          min="1"
                          key={index}
                          className="ml-[-10px]  h-8 w-16 rounded-md border border-black pl-3 text-center"
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
                              (Number(changedItem["caratPrice"]) ? Number(changedItem["caratPrice"]) : Number(changedItem["firstPrice"])) *
                              Number(changedItem["adet"]);

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
                        className="p ml-[-12px] h-8 w-16 rounded-md border border-black pl-3 text-center dark:disabled:text-white"
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

                          const newMaliyet =
                            Number(e.target.value) *
                            (Number(changedItem["caratPrice"]) ? Number(changedItem["caratPrice"]) : Number(changedItem["firstPrice"])) *
                            Number(changedItem["used_carat"]);

                          changedItem["adet"] = e.target.value;
                          changedItem["maliyet"] =

                          `${formatToCurrency(newMaliyet)} $`;

                          setSelectedValues((prev) => [
                            ...prev.slice(0, selectedIndexNo),
                            changedItem,
                            ...prev.slice(selectedIndexNo + 1, newItems.length),
                          ]);
                        }}
                      />
                    );
                  } else if (key == "resim") {
                    return (
                      <Image
                        key={index}
                        src={value as string}
                        width={40}
                        height={40}
                        alt="Sade"
                      />
                    );
                  } else {
                    return (
                      <div className="dark:text-white" key={index}>
                        {value}
                      </div>
                    );
                  }
                }
              })}
              <div className="flex items-center justify-left  gap-4 dark:text-white">
                <FaPencil className="cursor-pointer" />
                <FaTrash
                  className="cursor-pointer"
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
