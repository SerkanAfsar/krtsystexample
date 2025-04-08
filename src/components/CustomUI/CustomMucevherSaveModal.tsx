"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomImageSelect from "./CustomImageSelect";
import { FinishWorkOrder } from "@/Services/WorkOrder.Services";

import { useRouter } from "next/navigation";
import { MagazaType } from "@/types/Magaza";
import { ProductType } from "@/types/types";

import { CustomDataListType } from "@/types/types";
import { CustomOptionType } from "@/types/inputTypes";
import { GetMagazaDatatableService } from "@/Services/Magaza.Services";
import CustomFinishDataTable from "@/components/CustomUI/CustomFinishDataTable"
import { 
  GetWorkOrderProductList,
  GetWastageProductList,
  GetRefundProductList,
  GetWorkCosts
 } from "@/Services/WorkOrder.Services";


import { toast } from 'react-toastify'; 
import { FcInfo } from "react-icons/fc";


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
  const [store_id, setStoreId] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const [outputGram, setOutputGram] = useState<number | undefined>();
  const [sadekarIscilik, setSadekarIscilik] = useState<number>(0);
  const [mihlayiciIscilik, setMihlayiciIscilik] = useState<number>(0);
  const [cilaIscilik, setCilaIscilik] = useState<number>(0);
  const [ro, setRo] = useState<number>(1);
  const [warehouselist, setWarehouselist] = useState<MagazaType[]>([]);
  const [workOrderProductList, setWorkOrderProductList] = useState<ProductType[]>([]);
  const [wastageProductList, setWastageProductList] = useState<ProductType[]>([]);
  const [refundedrProductList, setRefundedProductList] = useState<ProductType[]>([]);
  const [workCosts, setWorkCosts] = useState({
    totalLaborCost: 0,
    mihlayiciCost: 0,
    sadekarCost: 0,
    cilaciCost: 0,
  });


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

      GetWorkOrderProductList({work_order_id: id})
        .then((resp) => {
          if (resp.success && resp.data) {
            const data = resp.data as ProductType[]; 
            const filteredData = data.filter(item => item.status == "PRODUCTION_WORKSHOP_APPROVED");
            setWorkOrderProductList(filteredData);
          } else {
            console.log(resp.error);
          }
        })
        .catch((err) => console.log(err));
 
        GetWastageProductList({work_order_id: id})
        .then((resp) => {
          if (resp.success && resp.data) {
            const data = resp.data as ProductType[]; 
            setWastageProductList(data)
          } else {
            console.log(resp.error);
          }
        })
        .catch((err) => console.log(err));

        GetRefundProductList({work_order_id: id})
        .then((resp) => {
          if (resp.success && resp.data) {
            const data = resp.data as ProductType[]; 
            setRefundedProductList(data)
          } else {
            console.log(resp.error);
          }
        })
        .catch((err) => console.log(err));

        GetWorkCosts({work_order_id: id})
        .then((resp) => {
          if (resp.success && resp.data) {
            const costs = {
              totalLaborCost: resp.data.total_labor_cost || 0,
              mihlayiciCost: 0,
              sadekarCost: 0,
              cilaciCost: 0,
            };
            if (resp.data.logs) {
              resp.data.logs.forEach((item: any) => {
                if (item.user_group === "Mıhlayıcı") costs.mihlayiciCost = item.cost;
                if (item.user_group === "Sadekar") costs.sadekarCost = item.cost;
                if (item.user_group === "Cilacı") costs.cilaciCost = item.cost;
              });
            }
    
            setWorkCosts(costs);
            setCilaIscilik(costs.cilaciCost)
            setMihlayiciIscilik(costs.mihlayiciCost)
            setSadekarIscilik(costs.sadekarCost)
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
        // boşluğa tıklanınca kapanıyor
        trigger.current?.contains(target)
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
    if (img && store_id) {
      setError(false);
    }
  }, [img, store_id]);

  return (
     <div className="fixed inset-0 z-999 flex h-full justify-center bg-black bg-opacity-80">
      <div className="mt-5 animate-modalAnimation  justify-start gap-3 rounded-lg bg-white p-3 dark:bg-graydark overflow-y-auto">
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
                    valueVal: String(item.id),
                  } as CustomOptionType;
                }),
              }}
              value={store_id}
              onChange={(e) => setStoreId(Number(e.target.value))}
            />
             <div className="block w-full">
              <label className="mb-3 block h-5 text-sm font-medium text-black dark:text-white">
                Mücevher Ağırlığı
              </label>
              <input
                type="number"
                placeholder="Mücevher Ağırlığı..."
                value={outputGram}
                onChange={(e) => setOutputGram(Number(e.target.value))}
                className="block w-full rounded-lg border-[1.5px] border-stone-400 bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
            </div>
            <div className="block w-full">
              <label className="mb-3 block h-5 text-sm font-medium text-black dark:text-white">
                Mücevher Açıklaması
              </label>
              <textarea
                rows={3}
                placeholder="Açıklama..."
                className="block w-full rounded-lg border-[1.5px]  border-stone-400 bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
        <CustomFinishDataTable title="Geri Gönderilen" data={refundedrProductList}/>
        <CustomFinishDataTable title="Fire" data={wastageProductList}/>
        <CustomFinishDataTable title="Tüketilen" data={workOrderProductList}/>
            <div className="mb-5 mt-5">
            <h4 className="text-xl font-bold border-b-2 text-black border-stone-400 pb-2 text-left">
              İşçilik Bilgileri 
            </h4>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm text-left font-medium text-black dark:text-white w-1/3">
                  Sadekar İşçilik:
                </label>
                <input
                  type="number"
                  value={workCosts.sadekarCost}
                  disabled= {true}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
                 <input
                  type="number"
                  value={sadekarIscilik} 
                  onChange={(e) => setSadekarIscilik(Number(e.target.value))}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm text-left font-medium text-black dark:text-white w-1/3">
                  Mıhlayıcı İşçilik:
                </label>
                <input
                  type="number"
                  value={workCosts.mihlayiciCost}
                  disabled= {true}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
                <input
                  type="number"
                  value={mihlayiciIscilik} 
                  onChange={(e) => setMihlayiciIscilik(Number(e.target.value))}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm text-left font-medium text-black dark:text-white w-1/3">
                  Cilacı İşçilik:
                </label>
                <input
                  type="number"
                  value={workCosts.cilaciCost}
                  disabled= {true}
                  className="w-2/3 mt-2 text-left border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
                 <input
                  type="number"
                  value={cilaIscilik} 
                  onChange={(e) => setCilaIscilik(Number(e.target.value))}
                  className="w-2/3 mt-2 text-left border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm text-left font-medium text-black dark:text-white w-1/3">
                  Toplam İşçilik:
                </label>
                <input
                  type="number"
                  value={workCosts.totalLaborCost}
                  disabled= {true}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
                <input
                  type="number"
                  value={sadekarIscilik + mihlayiciIscilik + cilaIscilik}
                  disabled= {true}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />
              </div>

              <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-black dark:text-white w-1/3 flex items-center gap-1">
                Çarpan :
                <div className="group relative flex items-center">
                  <FcInfo className="w-5 h-5 cursor-pointer" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-40 bg-black text-white text-xs p-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    1.1 1.2 gibi çarpan değerleri giriniz.
                  </div>
                </div>
              </label>
                <input
                  type="number"
                  value={1} 
                  disabled= {true}
                  className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
                />  
                <input
                type="number"
                value={ro} 
                onChange={(e) => setRo(Number(e.target.value))}
                className="w-2/3 mt-2 border-b-[1.5px] border-stone-400 bg-transparent px-3 py-2 outline-none dark:border-form-strokedark dark:text-white"
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
              if (!img || !store_id) {
                setError(true);
                return;
              }
              await FinishWorkOrder({
                work_order_id: id,
                store_id,
                image: img as string,
                output_gram: Number(outputGram),
                work_order_log_group_by: {
                  sadekar_cost: sadekarIscilik,
                  mıhlayıcı_cost: mihlayiciIscilik,
                  cilacı_cost: cilaIscilik,
                }
              })
                .then((resp) => {
                  if (resp?.success) {
                    toast.success("Mücevher başarıyla kaydedildi!", { position: "top-right" });
                    setShowConfirm(false);
                    return router.push(
                      `/Admin/StokYonetimi/Mucevher/MucevherStokListesi`,
                    );
                  } else {
                    toast.error("Üretim bitirilemedi. Hala teslim alınmamış ürünler var!", { position: "top-right" });
                  }
                })
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
    </div>
  );
}

export default CustomMucevherSaveModal;
