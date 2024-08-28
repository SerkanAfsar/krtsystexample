"use client";
import React, { useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import CustomImageSelect from "./CustomImageSelect";

function CustomMucevherSaveModal({
  showConfirm,
  setShowConfirm,
  code,
  handleFunction,
}: {
  showConfirm: boolean;
  setShowConfirm: any;
  code: string;
  handleFunction?: any;
}) {
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !showConfirm ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShowConfirm(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!showConfirm || keyCode !== 27) return;
      setShowConfirm(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${showConfirm ? "block" : "hidden"}`}
    >
      <div
        ref={modal}
        onFocus={() => setShowConfirm(true)}
        className="w-full max-w-180 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-8 md:py-8"
      >
        <h3 className="mb-5 flex items-center justify-between pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          <span>Üretim Bitir</span>
          <span>{code}</span>
        </h3>
        <div className="mb-5 grid grid-cols-2 gap-10">
          <div>
            <CustomImageSelect title="Resim Seçiniz" />
          </div>
          <div className="flex flex-col items-start justify-start gap-3 text-left">
            <CustomSelect
              item={{
                name: "ambar",
                required: true,
                type: "select",
                title: "Ambar Seçiniz",
              }}
            />
            <div className="block w-full">
              <label className="mb-3 block h-5 text-sm font-medium text-black dark:text-white">
                Açıklama
              </label>
              <textarea
                rows={3}
                placeholder="Açıklama..."
                className="block w-full rounded-lg border-[1.5px]  border-stone-400 bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="mb-5 flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] p-4 text-left shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
          <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                fill="#FBBF24"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <p className="leading-relaxed text-[#D0915C]">
              Bitir’e tıkladığınızda mücehver stoğa girecektir.
              <span className="font-bold text-red">
                Bu işlem geri alınamaz!
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-end  gap-y-4 font-bold uppercase">
          <button
            onClick={() => setShowConfirm(false)}
            className="mr-5 w-1/4 border border-primary  bg-white px-6 py-3 uppercase  text-black"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={async () => {
              if (handleFunction) {
                await handleFunction();
              }
              setShowConfirm(false);
            }}
            className="block w-1/4 bg-primary px-6 py-3 uppercase  text-white"
          >
            Bitir
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomMucevherSaveModal;
