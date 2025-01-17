"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn, formatToCurrency } from "@/utils";
//import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import CustomConfirmPage from "../CustomUI/CustomConfirmPage";  

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
  const [editableUrun, setEditableUrun] = useState<SeciliUrunType>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [indexForConfirmation, setIndexForConfirmation] = useState<number | null>(null);

  const handleConfirmationOpen = (item: SeciliUrunType,index: number) => {
    setEditableUrun(item)
    setIndexForConfirmation(index);
    setConfirmModalOpen(true);
  };

  const handleConfirmation = () => {
    if (indexForConfirmation !== null) {
      const updatedValues = [...selectedValues];
      if (updatedValues[indexForConfirmation].status === 'RESERVED') {
        updatedValues[indexForConfirmation].status = 'Onay Bekliyor';
      } else if (updatedValues[indexForConfirmation].status === 'Onay Bekliyor') {
        updatedValues[indexForConfirmation].status = 'Onaylandı';
      } else if (updatedValues[indexForConfirmation].status === 'Onaylandı') {
        updatedValues[indexForConfirmation].status = 'Gönderildi';
      }
      setSelectedValues(updatedValues);
    }
    setConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
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
            firstPrice: item.cost,
            resim: item.product.image,
            renk: item.product.properties.altinRengi,
            gram: item.product.properties.gram,
            has: item.product.properties.hasGrami,
            model: item.product.properties.modelTuru,
            modelTuru: item.product.properties.modelTuru,
            maliyet: `${formatToCurrency(item.cost)} $`,
            nerede: "Kasa",
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
            maliyet: `${formatToCurrency(item.cost)} $`,
            firstPrice: item.cost,
            nerede: "Kasa",
            status:item.status,
            caratPrice:item.product.product_cost.pricePerCarat
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
            maliyet: `${formatToCurrency(item.cost)} $`,
            firstPrice: item.cost,
            nerede: "Kasa",
            status:item.status,
            caratPrice:item.product.product_cost.pricePerCarat
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
      caratPrice : Number(item.caratPrice),
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
                      if (buttonText === "Sade Ekle" && !model) {
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
              if (buttonText === "Sade Ekle" && !model) {
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
                      <div
                      key={index}
                      className={`
                        p ml-[-20px] h-8 w-28 rounded-full text-center text-sm font-bold dark:disabled:text-white
                        ${item.status === 'RESERVED' ? 'text-blue-500 border-blue-500' :
                         item.status === 'Onay Bekliyor' ? 'text-orange-500 border-orange-500' :
                         item.status === 'Onaylandı' ? 'text-green-500 border-green-500' :
                         item.status === 'Gönderildi' ? 'text-purple-500 border-purple-500' :
                         'text-black-500 border-black-500'}
                        border-2 leading-[2]
                      `}                    
                      >
                      {item.status}
                    </div>
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
              {urunData && String(item.status) !== 'Gönderildi'? (
                <>
              <IoSendSharp
                  className="cursor-pointer"
                  onClick={() => handleConfirmationOpen(item, index)}
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
         {confirmModalOpen && (
        <CustomConfirmPage
          isOpen={confirmModalOpen}
          item={editableUrun}
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
