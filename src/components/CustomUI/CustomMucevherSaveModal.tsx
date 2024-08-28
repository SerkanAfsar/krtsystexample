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
        <div className="mb-10 grid grid-cols-2 gap-10">
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
        <div className="flex w-full flex-wrap justify-end  gap-y-4 font-bold uppercase">
          <button
            onClick={() => setShowConfirm(false)}
            className="mr-5 w-1/4 border border-primary  bg-white px-6 py-3 uppercase  text-black"
          >
            İptal Et
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
