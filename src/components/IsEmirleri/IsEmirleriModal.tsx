"use client";

import { useEffect, useState } from "react";
import CustomErrorAlert from "../CustomUI/Alerts/CustomErrorAlert";
import CustomDatatable from "../CustomUI/CustomDatatable";
import { IoMdCloseCircle } from "react-icons/io";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function IsEmirleriModal({
  title,
  setModalOpen,
  modalHeaderColumns,
  tableFunction,
  setSelectedValues,
  selectedValues,
  model,
}: {
  title: string;
  modalHeaderColumns: any;
  setModalOpen: React.Dispatch<boolean>;
  setSelectedValues: any;
  tableFunction?: any;
  selectedValues?: any;
  model?: any;
}) {
  if (!tableFunction) {
    return null;
  }
  const {
    totalPageCount,
    activeData,
    activePage,
    error,
    setActivePage,
    isOpen,
    setIsOpen,
    imgSrc,
  } = tableFunction({ setSelectedValues, selectedValues });

  const filteredData = title === "Sade Ekle" && model
  ? activeData.filter((item: any) => item.model === model)
  : activeData;

  return (
    <div className="fixed inset-0 z-999 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
      <div className="flex h-[90%] w-[90%] animate-modalAnimation flex-col items-center justify-start gap-3 rounded-lg bg-white p-3 dark:bg-graydark">
        <div className="flex w-full items-center justify-center">
          <h3 className="flex justify-center text-lg font-bold dark:text-white">{title}</h3>
          {/* <IoMdCloseCircle
            className="ml-auto mr-4 cursor-pointer"
            size={30}
            onClick={() => setModalOpen(false)}
          />
          */}
        </div>

        {error ? (
          <CustomErrorAlert title="Hata" description={error} />
        ) : (
          <>
            {isOpen && (
              <Lightbox
                mainSrc={imgSrc}
                onCloseRequest={() => setIsOpen(false)}
              />
            )}
            <CustomDatatable
              className={"block shadow-none"}
              totalPageCount={totalPageCount}
              columns={modalHeaderColumns}
              data={filteredData}
              activePage={activePage}
              setActivePage={setActivePage}
            />
         <div className="flex text-black w-full justify-end space-x-4">
            <button
              type="button"
              className="btn block w-35 rounded-md bg-primary px-3 py-1 text-center text-white"
              onClick={() => setSelectedValues([], setModalOpen(false))}
            >
              Temizle
            </button>

            <button
              type="button"
              className="btn block w-35 rounded-md bg-primary px-3 py-1 text-center text-white"
              onClick={() => setModalOpen(false)}
            >
              Kaydet
            </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
