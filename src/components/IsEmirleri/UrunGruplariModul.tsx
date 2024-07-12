"use client";

import { useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";

export type UrunGruplariModulType = {
  title: string;
  buttonText: string;
  headerColumns: string[];
  tableFunction?: any;
  modalHeaderColumns?: any;
};

export type SeciliUrunType = {
  [key: string]: { value: string | number };
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
        <div className="flex items-center justify-between gap-2 bg-gray p-2 text-left text-black">
          {headerColumns.map((key, index) => (
            <b key={index}>{key}</b>
          ))}
        </div>
        <div className="flex flex-col gap-6 ">
          <div className="border-b-1 block w-full  border-red">Deneme</div>
        </div>
      </section>
      <IsEmirleriModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        tableFunction={tableFunction}
        modalHeaderColumns={modalHeaderColumns}
        title={buttonText}
      />
    </>
  );
}
