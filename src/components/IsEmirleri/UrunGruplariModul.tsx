"use client";

import { useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn } from "@/utils";

export type UrunGruplariModulType = {
  title: string;
  buttonText: string;
  headerColumns: string[];
  tableFunction?: any;
  modalHeaderColumns?: any;
};

export type SeciliUrunType = {
  [key: string]: string;
};

export default function UrunGruplariModul({
  item: { title, buttonText, headerColumns, tableFunction, modalHeaderColumns },
}: {
  item: UrunGruplariModulType;
}) {
  const [selectedValues, setSelectedValues] = useState<SeciliUrunType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
            <b key={index}>{key}</b>
          ))}
        </div>
        <div className="flex flex-col">
          {selectedValues.map((item, index) => (
            <>
              <div
                key={index}
                className={cn(
                  "grid gap-2  p-2 text-left text-black",
                  `grid-cols-${headerColumns.length}`,
                  "border-b-2 border-black",
                )}
              >
                {Object.values(item).map((prop, key) => {
                  if (key != 0) {
                    return <div key={key}>{prop}</div>;
                  }
                })}
              </div>
            </>
          ))}
        </div>
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
