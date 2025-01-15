"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn, formatToCurrency } from "@/utils";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { toast } from "react-toastify";


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
  urunData,
  model,
}: {
  item: UrunGruplariModulType;
  setValues?: any;
  urunData?: any;
  model?: any;
}) {
  const [selectedValues, setSelectedValues] = useState<SeciliUrunType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getSelectBoxColor = (status: string) => {
    switch (status) {
      case "Gönderildi":
        return "green";
      case "Onaylandı":
        return "blue";
      case "RESERVED":
        return "orange";
      case "Red Edildi":
        return "red";
      default:
        return "black";
    }
  };

  //İş emri düzenleden gelen datalar için. Sıfırdan iş emri oluşturulması durumunda çalışmayacak.
  useEffect(() => {
  if (!urunData) return;

  const mapUrunDataByTitle = (urunData: any[], title: string) => {
    const typeMap: { [key: string]: string } = {
      "Sade": "Simple",
      "Renkli Taş": "ColoredStone",
      "Pırlanta": "Diamond",
    };
  
    const type = typeMap[title] || title; 

    switch (title) {
      case "Sade":
        return urunData
          .filter(item => item.product.type === type)
          .map(item => ({
            pk:item.product.pk,
            ayar: item.product.properties.gram,
            code: item.product.code,
            firstPrice: item.product.total_cost,
            resim: item.product.image,
            renk: item.product.properties.altinRengi,
            gram: item.product.properties.gram,
            has: item.product.properties.hasGrami,
            model: item.product.properties.modelTuru,
            modelTuru: item.product.properties.modelTuru,
            maliyet: `${formatToCurrency(item.product.total_cost)} $`,
            nerede: "Sade Kasa",
            status:item.status,
            type: "Sade"
          }));
  
      case "Renkli Taş":
        return urunData
          .filter(item => item.product.type === type)
          .map(item => ({
            pk:item.product.pk,
            code: item.product.code,
            berraklik: "",
            name: item.product.properties.renkliTas,
            kesim: item.product.properties.kesim,
            used_carat: item.used_carat ,
            carat: item.used_carat ,
            renk: item.product.properties.renk ,
            adet: item.quantity ,
            menstrual_status: item.product.properties.menstrual_status,
            maliyet: `${formatToCurrency(item.product.total_cost)} $`,
            firstPrice: item.product.total_cost,
            nerede: "Sade Kasa",
            status:item.status,
          }));
  
      case "Pırlanta":
        return urunData
          .filter(item => item.product.type === type)
          .map(item => ({
            pk:item.product.pk,
            code: item.product.code,
            kesim: item.product.properties.kesim ,
            carat: item.used_carat ,
            used_carat: item.used_carat ,
            berraklik: item.product.properties.berraklik ,
            renk: item.product.properties.renk ,
            adet: item.quantity ,
            menstrual_status: item.product.properties.menstrual_status,
            maliyet: `${formatToCurrency(item.product.total_cost)} $`,
            firstPrice: item.product.total_cost,
            nerede: "Sade Kasa",
            status:item.status,
          }));
  
      default:
        return [];
    }
  };
  

  if (title === "Sade") {
    const sadeUrunler = mapUrunDataByTitle(urunData, "Sade");
    setSelectedValues(sadeUrunler); 
  } else if (title === "Renkli Taş") {
    const renkliTasUrunler = mapUrunDataByTitle(urunData, "Renkli Taş");
    setSelectedValues(renkliTasUrunler); 
  } else if (title === "Pırlanta") {
    const pirlantaUrunler = mapUrunDataByTitle(urunData, "Pırlanta");
    setSelectedValues(pirlantaUrunler); 
  }
}, [urunData]);

  useEffect(() => {
    const items: WorkOrderProductType[] = selectedValues.map((item) => ({
      product_id: Number(item.pk),
      quantity: item.adet ? Number(item.adet) : 1,
      used_carat: item.used_carat ? Number(item.used_carat) : Number(item.carat),
      name: (item.name as string) ?? null,
      price:
        item.caratPrice && item.type != "Sade" && item.used_carat
          ? Number(item.caratPrice) * (item.used_carat as number)
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
          {urunData ? (
                  <div className="flex space-x-2">
                  <button
                    type="button"
                    className="btn block w-35 rounded-md px-3 py-1 text-center text-primary font-bold border-2 border-primary"
                    onClick={() => {
                      console.log("")
                    }}
                  >
                    {"Toplu Gönder"}
                  </button>
                  <button
                    type="button"
                    className="btn block w-35 rounded-md px-3 py-1 text-center text-primary font-bold border-2 border-primary"
                    onClick={() => {
                      if (buttonText === "Sade Ekle" && model === "") {
                        return toast.error("Sade eklemeden önce model seçilmesi zorunludur!", {
                          position: "top-right",
                        });
                      } else {
                        setModalOpen(true);
                      }
                    }}
                  >
                    {buttonText}
                  </button>
                </div>
          ):(
            <button
            type="button"
            className="btn block w-35 rounded-md bg-primary px-3 py-1 text-center text-white"
            onClick={() => {
              if (buttonText === "Sade Ekle" && model === "") {
                return toast.error("Sade eklemeden önce model seçilmesi zorunludur!", {
                  position: "top-right",
                });
              } else {
                setModalOpen(true);
              }
            }}
          >
            {buttonText}
          </button>
          )}
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
                              (Number(changedItem["caratPrice"]) ? Number(changedItem["caratPrice"]) : Number(changedItem["firstPrice"])) 

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
                          changedItem["adet"] = e.target.value;
                          
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
                  } else if (key == "status") {
                    return (
                      <select
                      key={index}
                      className="p ml-[-20px] h-8 w-28 rounded-full border border-black text-center dark:disabled:text-white text-sm"
                      style={{
                        color: getSelectBoxColor(String(item.status)),
                        border: `2px solid ${getSelectBoxColor(String(item.status))}` 
                      }}
                      value={item.status}
                      onChange={(e) => {
                        const selectedIndexNo = selectedValues.findIndex(
                          (a) => a.pk == item.pk,
                        );
                        const newItems = selectedValues;
                        const changedItem = newItems[selectedIndexNo];
                        changedItem["status"] = e.target.value;
                    
                        setSelectedValues((prev) => [
                          ...prev.slice(0, selectedIndexNo),
                          changedItem,
                          ...prev.slice(selectedIndexNo + 1, newItems.length),
                        ]);
                      }}
                    >
                      <option className="text-green-400"value="Gönderildi">Gönderildi</option>
                      <option className="text-blue-500"value="Onaylandı">Onaylandı</option>
                      <option className="text-yellow-400"value="RESERVED">Reserved</option>
                      <option className="text-red"value="Red Edildi">Red Edildi</option>
                    </select>
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
           <div className="flex items-center justify-left gap-4 dark:text-white">
              {urunData ? (
                <>
                  <IoSendSharp className="cursor-pointer" 
                    onClick={() => {
                      if (item.status === "Onaylandı") {
                        console.log("IoSendSharp icon clicked, status is 'Onaylandı'");
                      } else {
                        return toast.error("Ürünleri gönderebilmek için önce ürünleri onaylamanız gerekmektedir!", {
                          position: "top-right",
                        });                      }
                    }}
                  />
                 <FaTrash
                    className="cursor-pointer"
                    onClick={(e) => {
                      setSelectedValues((prev: SeciliUrunType[]) =>
                        prev.filter((a) => a.pk != item.pk),
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <FaTrash
                    className="cursor-pointer"
                    onClick={(e) => {
                      setSelectedValues((prev: SeciliUrunType[]) =>
                        prev.filter((a) => a.pk != item.pk),
                      );
                    }}
                  />
                </>
              )}
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
          model={model}
        />
      )}
    </>
  );
}
