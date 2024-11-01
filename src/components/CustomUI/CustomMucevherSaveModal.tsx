"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomImageSelect from "./CustomImageSelect";
import { FinishWorkOrderApiService } from "@/ApiServices/WorkOrders.ApiService";

import { useRouter } from "next/navigation";
import { MagazaType } from "@/types/Magaza";

import { CustomDataListType } from "@/types/types";
import { CustomOptionType } from "@/types/inputTypes";
import { GetMagazaDatatableService } from "@/Services/Magaza.Services";

function CustomMucevherSaveModal({
  id,
  showConfirm,
  setShowConfirm,
  code,
}: {
  id: number;
  showConfirm: boolean;
  setShowConfirm: any;
  code: string;
  handleFunction?: any;
}) {
  const router = useRouter();
  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);
  const [img, setImage] = useState<string | ArrayBuffer | undefined>();
  const [ware_house, setWareHouse] = useState<string>();
  const [error, setError] = useState<boolean>(false);

  const [warehouselist, setWarehouselist] = useState<MagazaType[]>([]);

  useEffect(() => {
    GetMagazaDatatableService({})
      .then((resp) => {
        if (resp.success) {
          const data = resp.data as CustomDataListType<MagazaType>;
          setWarehouselist(data.results);
        } else {
          console.log(resp.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  useEffect(() => {
    if (img && ware_house) {
      setError(false);
    }
  }, [img, ware_house]);

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
            <CustomImageSelect
              setCustomImage={setImage}
              title="Resim Seçiniz"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-3 text-left">
            <CustomSelect
              item={{
                name: "ambar",
                required: true,
                type: "select",
                title: "Ambar Seçiniz",
                options: warehouselist.map((item: MagazaType, index) => {
                  return {
                    titleVal: item.name,
                    valueVal: item.name,
                  } as CustomOptionType;
                }),
              }}
              value={ware_house}
              onChange={(e) => setWareHouse(e.target.value)}
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
        {error && (
          <div className="mb-5 flex w-full border-l-6 border-red bg-red bg-opacity-[15%] p-4 text-left shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <p className="mt-1 leading-relaxed text-red">
                Bütün Alanların Eksiksiz Bir Şekildi Doldurulması Gerekiyor!
              </p>
            </div>
          </div>
        )}

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
              if (!img || !ware_house) {
                setError(true);
                return;
              }
              await FinishWorkOrderApiService({
                id: id,
                ware_house: ware_house as string,
                image: img as string,
              });
              router.refresh();
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
