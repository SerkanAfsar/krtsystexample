"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn, formatToCurrency } from "@/utils";
//import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import CustomConfirmPage from "../CustomUI/CustomConfirmPage";  
import { PostWorkOderUpdateStatus, DeleteWorkOrderSingleItem } from "@/Services/WorkOrder.Services";
import { useUserStore } from "@/store/useUserStore";

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

export type UserType = {
  id: number;
  username: string;
  email: string;
};

export type SeciliUrunType = {
  [key: string]: string | number;
};

export default function UrunGruplariModul({
  item: { title, buttonText, headerColumns, tableFunction, modalHeaderColumns },
  setValues,
  urunData,
  model,
  setStatu,
}: {
  item: UrunGruplariModulType;
  setValues?: any;
  urunData?: any;
  model?: any;
  setStatu?: any;
}) {

  const [selectedValues, setSelectedValues] = useState<SeciliUrunType[]>([]);
  const [editableUrun, setEditableUrun] = useState<SeciliUrunType>({});
  const [editableUruns, setEditableUruns] = useState<SeciliUrunType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [indexForConfirmation, setIndexForConfirmation] = useState<number | null>(null);
  const { user } = useUserStore(); 
  const userRoleID = user?.groups[0]?.id;
  const isDisabled = urunData && (
    (title === "Pırlanta" && ![2, 8].includes(userRoleID ?? -1)) ||
    (title === "Renkli Taş" && ![2, 7].includes(userRoleID ?? -1)) ||
    (title === "Sade" && ![2, 1].includes(userRoleID ?? -1))
  );
  const isButtonDisabled = (item: SeciliUrunType) => {
    const statusCondition = item.status === "Rezervli" || item.status === "Gönderildi" || item.status === "Üretim Onayladı";
    const roleMap: { [key: string]: number} = {
      "Pırlanta": 8,
      "Renkli Taş": 7,
      "Sade": 1
    };
  
    if (item.status === "Rezervli") {
      if (userRoleID === 2) return false;
      return userRoleID !== roleMap[title] && title in roleMap;
    }
  
    if (statusCondition) {
      return userRoleID !== 2;
    }
  
    return userRoleID !== roleMap[title] && title in roleMap;
  };

  const handleConfirmationOpen = (item: SeciliUrunType, index: number, newStatus?: string, items?: SeciliUrunType[]) => {
    setEditableUrun(newStatus ? { ...item, status: newStatus } : item);
    setIndexForConfirmation(index);
    setConfirmModalOpen(true);
    setEditableUruns(items || []);
  };

  const statusDetailsMap : { 
    [key: string]: 
    { 
      className: string,
      icon: string, 
      name: string,
      newStatus: string, 
      userGiving?: Number, 
    } 
  } = {
    CANCELLED: {
      className: "text-red border-red",
      icon: "/images/icon/redTrash.svg",
      name: "Red Edildi",
      newStatus: "CANCELLED",
      userGiving: Number(user?.id)
    },
    RESERVED: {
      className: "text-blue-500 border-blue-500",
      icon: "/images/icon/sendToConfirmation.svg",
      name: "Rezervli",
      newStatus: "PENDING"
    },
    PENDING: {
      className: "text-orange-500 border-orange-500 text-xs pt-0.5",
      icon: "/images/icon/confirmation.svg",
      name: "Onay Bekliyor",
      newStatus: "ACCEPTED"
    },
    ACCEPTED: {
      className: "text-green-500 border-green-500",
      icon: "/images/icon/send.svg",
      name: "Onaylandı",
      newStatus: "SENT",
      userGiving: Number(user?.id)
    },
    SENT: {
      className: "text-purple-500 border-purple-500",
      icon: "/images/icon/approval.svg",
      name: "Gönderildi",
      newStatus: "PRODUCTION_ACCEPTED",
      userGiving: Number(user?.id)
    },
    PRODUCTION_ACCEPTED: {
      className: "text-green-500 border-green-500 text-xs pt-0.5",
      icon: "/images/icon/approval.svg",
      name: "Üretim Onayladı",
      newStatus: "SENT_TO_WORKSHOP",
      userGiving: Number(user?.id)
    },
    SENT_TO_WORKSHOP: {
      className: "text-purple-500 border-purple-500 text-xs whitespace-pre-wrap",
      icon: "/images/icon/sendToConfirmation.svg",
      name: "Atly. Gönderildi",
      newStatus: "",
      userGiving: Number(user?.id)
    },
  };

  const handleConfirmation = (cirak?: UserType, targetUser?:UserType, items?:SeciliUrunType[]) => {
    if (indexForConfirmation !== null) {
      const updatedValues = [...selectedValues];
      const workOrderProductIds = items && items.length > 0  ? items.map(item => item.id) : [updatedValues[indexForConfirmation].id];
      const currentStatus = ["Red Edildi", "Geri Gönderildi"].includes(String(editableUrun.status))
        ? "Red Edildi"
        : (items && items.length > 0 ? items[0].status : updatedValues[indexForConfirmation].status);
      const statusKey = Object.keys(statusDetailsMap).find(
        key => statusDetailsMap[key].name === currentStatus
      );
      let newStatus = statusKey ? statusDetailsMap[statusKey]?.newStatus ?? "" : "";
      let userGiving = statusKey ? statusDetailsMap[statusKey]?.userGiving ?? null : null;
      if (statusKey) {
        PostWorkOderUpdateStatus({
          work_order_product_ids: workOrderProductIds.map(id => Number(id)),
          status: newStatus,
          pupil_user_id: cirak?.id ? Number(cirak.id) : null,
          from_user_id: userGiving ? Number(userGiving) : null,
          target_user_id: currentStatus == "Gönderildi" ? Number(userGiving) : (targetUser?.id ? Number(targetUser.id) : null)
        }).then((resp) => {
          if (resp?.success) {
            setStatu((prevStatu: boolean) => !prevStatu);
        } else {
          return toast.error("Ürünün durumu değiştirilemedi!", {
            position: "top-right",
          });
            }
        });
      }
    }
    setConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };


  const handleDeleteSingleItem = (item: SeciliUrunType): void => {
    if(item.id){
      DeleteWorkOrderSingleItem({
        work_order_product_id: Number(item.id),
      }).then((resp) => {
        if (resp?.success) {
          setSelectedValues((prev: SeciliUrunType[]) =>
            prev.filter((a) => a.pk != item.pk),
          );
        } else {
          if(resp?.error == "WorkOrderProduct matching query does not exist."){
            setSelectedValues((prev: SeciliUrunType[]) =>
              prev.filter((a) => a.pk != item.pk),
            );
          } else {
            return toast.error("Ürün silinemedi!", {
              position: "top-right",
            });
          }
        }
      });
    } else{
      setSelectedValues((prev: SeciliUrunType[]) =>
        prev.filter((a) => a.pk != item.pk),
      );
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
            firstPrice: item.cost,
            resim: item.product.image,
            renk: item.product.properties.altinRengi,
            gram: item.product.properties.gram,
            has: item.product.properties.hasGrami,
            model: item.product.properties.modelTuru,
            modelTuru: item.product.properties.modelTuru,
            maliyet: `${formatToCurrency(item.cost)} $`,
            fiyat: item.current_cost || item.cost,
            nerede: item.user_group_name,
            status: statusDetailsMap[item.status]?.name || item.status,
            type: "Sade",
            id:item.id
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
            carat: item.product.properties.carat ,
            renk: item.product.properties.renk ,
            adet: item.quantity ,
            menstrual_status: item.product.properties.menstrual_status,
            maliyet: `${formatToCurrency(item.cost)} $`,
            firstPrice: item.cost,
            nerede: item.user_group_name,
            status: statusDetailsMap[item.status]?.name || item.status,
            caratPrice:item.product.product_cost.pricePerCarat,
            type:item.product.type,
            id:item.id,
            remaining_carat: item.product.properties.remaining_carat 
              ? item.product.properties.remaining_carat + item.used_carat 
              : (item.used_carat === 0 ? 0 : item.used_carat),
          }));
  
      case "Pırlanta":
        return urunData
          .filter(item => item.product.type === type)
          .map(item => ({
            pk:item.product.pk,
            code: item.product.code,
            kesim: item.product.properties.kesim ,
            carat: item.product.properties.carat  ,
            used_carat: item.used_carat ,
            berraklik: item.product.properties.berraklik ,
            renk: item.product.properties.renk ,
            adet: item.quantity ,
            menstrual_status: item.product.properties.menstrual_status,
            maliyet: `${formatToCurrency(item.cost)} $`,
            firstPrice: item.cost,
            nerede: item.user_group_name,
            status: statusDetailsMap[item.status]?.name || item.status,
            caratPrice:item.product.product_cost.pricePerCarat,
            type:item.product.type,
            id:item.id,
            remaining_carat: item.product.properties.remaining_carat 
              ? item.product.properties.remaining_carat + item.used_carat 
              : (item.used_carat === 0 ? 0 : item.used_carat), 
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
      used_carat: item.used_carat != null ? Number(item.used_carat) : 0,
      name: (item.name as string) ?? null,
      price:
        item.caratPrice && item.type != "Sade" && item.used_carat
          ? Number(item.caratPrice) * (item.used_carat as number)
          : Number(item.firstPrice),
      type: item.type ? String(item.type) : undefined,
      ayar: item.ayar ? String(item.ayar) : null,
      modelTuru: item.modelTuru ? String(item.modelTuru) : null,
      renk: (item.renk as string) ?? null,
      caratPrice: item.caratPrice != null ? Number(item.caratPrice) : null,
      ...(item.type === "Sade"
        ? { 
            current_cost: 
              item.fiyat != null && item.fiyat !== "" 
                ? Number(String(item.fiyat).replace(/[$,]/g, "")) 
                : null 
          } 
        : {}),
        ...(urunData ? { status: Object.keys(statusDetailsMap).find(key => statusDetailsMap[key].name === item.status) } : {})
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
        <div className="flex text-black dark:text-white w-full items-center justify-between grid-cols-12">
          <b>{title}</b>
          {urunData ? (
                <div className="flex space-x-2 ">
                  {title !== "Sade" && (
                    <b className="mt-1 px-3 py-1 ml-4">
                      <span className="mr-8 text-black dark:text-white">
                      Toplam Karat:{" "}
                      <span className="text-green-500">
                      {selectedValues
                        .filter(item => item.status !== "Red Edildi") 
                        .reduce((sum, item) => {
                          const caratValue = item.menstrual_status === "Sertifikalı" 
                            ? Number(item.carat)  
                            : Number(item.used_carat);
                          return sum + (caratValue || 0);  
                        }, 0)
                        .toFixed(2)
                      }
                      </span>
                      </span>
                      <span className=" text-black dark:text-white">
                      Toplam Adet:{" "}
                      <span className="text-green-500">
                        {selectedValues
                          .filter(item => item.status !== "Red Edildi") 
                          .reduce((sum, item) => sum + (Number(item.adet) || 0), 0)}
                      </span>
                      </span>
                    </b>
                  )}
                  <b className="mt-1 px-3 py-1 ml-4 dark:text-white text-black">
                  <span className="text-black dark:text-white">
                    Toplam Maliyet:{" "}
                    <span className="text-green-500">
                      {(() => {
                        const total = selectedValues.reduce((sum, item) => {
                          if (item.status === "Red Edildi") {
                            return sum;
                          }
                          if (title === "Sade") {
                            return sum + (Number(item.firstPrice) || 0);
                          } else {
                            return sum + (item.used_carat != 0 && item.used_carat
                              ? (Number(String(item.caratPrice).replace(",", ".")) * Number(item.used_carat)) 
                              : Number(item.firstPrice)) || 0;
                          }
                        }, 0);

                        return total
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
                      })()}{" "}
                      $
                    </span>
                    </span>
                    {title == "Sade" && (
                    <span className="text-black dark:text-white ml-6">
                    Toplam Fiyat:{" "}
                    <span className="text-green-500">
                      {(() => {
                        const total = selectedValues.reduce((sum, item) => {
                          if (item.status === "Red Edildi") {
                            return sum;
                          }
                          return sum + (Number(item.fiyat) || 0);
                        }, 0);

                        return total
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      })()}{" "}
                      $
                    </span>
                  </span>
                  )}
                  </b>     
                  <button
                    type="button"
                    className="btn block w-35 rounded-md px-3 py-1 text-center text-primary font-bold border-2 border-primary"
                    onClick={() => {
                      if (userRoleID === 2) {
                        const deliveredItems = selectedValues.filter((item) => item.status === "Üretim Onayladı");
                        if (deliveredItems.length > 0) {
                          deliveredItems.forEach((item, index) => {
                            handleConfirmationOpen(item, index, "Üretim Onayladı", deliveredItems);
                          });
                        } else {
                          toast.error("Onaylanmış ürün yok!", { position: "top-right" });
                        }
                      } else {
                        const sentItems = selectedValues.filter((item) => item.status === "Onaylandı");
                        if (sentItems.length > 0) {
                          sentItems.forEach((item, index) => {
                            handleConfirmationOpen(item, index, "Onaylandı", sentItems); 
                          });
                        } else {
                          toast.error("Onaylanmış ürün yok!", { position: "top-right" });
                        }
                      }
                    }}
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                        <div className={cn("dark:text-white",
                        item.status === "Red Edildi" ? "line-through" : ""
                      )}
                        key={index}>
                          {item.carat}
                        </div>
                      );
                    } else {
                      return (
                        <input
                          min="1"
                          key={index}
                          className={cn("ml-[-10px] dark:text-white  h-8 w-17 rounded-md border border-black pl-3 text-center",
                          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield",
                          item.status === "Red Edildi" ? "line-through" : "" 
                        )}
                          type="number"
                          value={item.used_carat}
                          disabled={
                            isDisabled ||
                            (item?.status && item?.status !== "Rezervli")
                          }
                          onWheel={(e) => {
                            e.preventDefault();
                          }}
                          onFocus={(e) => {
                            e.target.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
                          }}
                          onBlur={(e) => {
                            e.target.removeEventListener('wheel', (e) => e.preventDefault());
                          }}
                          onChange={(e) => {
                            const selectedIndexNo = selectedValues.findIndex(
                              (a) => a.pk == item.pk,
                            );
                            const newItems = selectedValues;
                            const changedItem = newItems[selectedIndexNo];
                            let value = e.target.value;

                            value = value.replace(/(\.\d{2})\d+/g, '$1');
                            if (item.remaining_carat && value > item.remaining_carat) {
                              toast.error(`Girdiğiniz karat miktarı ${item.remaining_carat} ile sınırlıdır!`, {
                                position: "top-right",
                              });
                              value= item.remaining_carat.toString();
                            }

                            const newMaliyet =
                              Number(value) *
                              (Number(changedItem["caratPrice"]) ? Number(changedItem["caratPrice"]) : Number(changedItem["firstPrice"])) 

                            changedItem["used_carat"] = value;
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
                    if (item.menstrual_status == "Sertifikalı") {
                      return (
                        <div className={cn("dark:text-white",
                        item.status === "Red Edildi" ? "line-through" : ""
                      )}
                        key={index}>
                          {item.adet}
                        </div>
                      );
                    } else {
                      return (
                        <input
                          min="1"
                          key={index}
                          className={cn("p ml-[-12px] h-8 w-17 rounded-md border dark:text-white border-black pl-3 text-center dark:disabled:text-white",
                            "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield",
                            item.status === "Red Edildi" ? "line-through" : "" 
                          )}
                          type="number"
                          disabled={
                            item?.menstrual_status == "Sertifikalı" ||
                            isDisabled  ||
                            (item?.status && item?.status !== "Rezervli")
                          }
                          value={item.adet}
                          onKeyDown={(e) => {
                            if (e.key === '.') {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => {
                            e.preventDefault();
                          }}
                          onFocus={(e) => {
                            e.target.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
                          }}
                          onBlur={(e) => {
                            e.target.removeEventListener('wheel', (e) => e.preventDefault());
                          }}
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
                    }
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
                    const currentStatus = item.status;
                    const isValidStatus = Object.values(statusDetailsMap).some(detail => detail.name === currentStatus);
                
                    return (
                      <div
                          key={index}
                          className={`
                              p ml-[-15px] h-8 w-25 lg:w-25 md:w-22 sm:w-20 rounded-full text-center text-sm font-bold whitespace-nowrap dark:disabled:text-white
                              ${isValidStatus ? Object.values(statusDetailsMap).find(detail => detail.name === currentStatus)?.className : 'text-purple-500 border-purple-500'} 
                              border-2 leading-[2] 
                          `}
                      >
                          {isValidStatus ? currentStatus : "Üretimde"}
                      </div>
                    );
                  } else if (key == "fiyat") {
                    return (
                      <div key={index} className="relative w-22 lg:w-22 md:w-16 sm:w-16 lg:ml-[-14px] md:ml-[-10px]">
                      <input
                        min="0"
                        className={cn(
                          "p h-8 w-full border-0 border-b rounded-none border-black bg-transparent dark:text-white text-center",
                          "dark:disabled:text-white focus:outline-none focus:ring-0",
                          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield",
                          item.status === "Red Edildi" ? "line-through" : ""
                        )}
                        type="text" 
                        disabled={!(userRoleID === 1 && item?.status === "Onay Bekliyor")}
                        value={item.fiyat}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value.includes(',')) {
                            value = value.replace(',', '.');
                          }
                          if (!/^\d*\.?\d{0,2}$/.test(value)) {
                            return;
                          }
                    
                          const selectedIndexNo = selectedValues.findIndex(
                            (a) => a.pk == item.pk
                          );
                          const newItems = selectedValues;
                          const changedItem = newItems[selectedIndexNo];
                          changedItem["fiyat"] = value;
                    
                          setSelectedValues((prev) => [
                            ...prev.slice(0, selectedIndexNo),
                            changedItem,
                            ...prev.slice(selectedIndexNo + 1, newItems.length),
                          ]);
                        }}
                      />
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-black dark:text-white text-sm">$</span>
                    </div>
                    
                  );
                  } else {
                    return (
                      <div className={cn(
                        "dark:text-white lg:text-base md:text-xs sm:text-xs",
                        item.status === "Red Edildi" ? "line-through" : "" 
                      )}
                      key={index}>
                        {value}
                      </div>
                    );
                  }
                }
              })}
           <div className="flex items-center justify-left gap-4 ml-2 lg:ml-2 md:ml-3 sm:ml-3 dark:text-white">
              {urunData ? (
                <>
              {!["Red Edildi", "Atly. Gönderildi"].includes(String(item.status)) && 
                Object.values(statusDetailsMap).map(detail => detail.name).includes(String(item.status)) ? (
                <>
                  <img
                    src={Object.values(statusDetailsMap).find(detail => detail.name === item.status)?.icon}
                    alt="Change Status"
                    className={`cursor-pointer w-4 h-4 ${isButtonDisabled(item) ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => {
                      if (!isButtonDisabled(item)) {
                        handleConfirmationOpen(item, index);
                      }
                    }}
                  />
                  <img
                    src="/images/icon/redTrash.svg"
                    alt="delete"
                    className={`cursor-pointer w-4 h-4 ${isButtonDisabled(item) ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={(e) => {
                      if (!isButtonDisabled(item)) {
                        if (item.status === "Rezervli") {
                          handleDeleteSingleItem(item);
                        } else if (item.status === "Onay Bekliyor" || item.status === "Onaylandı") {
                          handleConfirmationOpen(item, index, "Red Edildi");
                        } else {
                          handleConfirmationOpen(item, index, "Geri Gönderildi");
                        }
                      }
                    }}
                  />
                </>
                ) : null}
                </>
              ) : (
                <>
                  <FaTrash
                  className={`cursor-pointer ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={(e) => {
                    if (!isDisabled) {
                      setSelectedValues((prev: SeciliUrunType[]) =>
                        prev.filter((a) => a.pk != item.pk),
                      );
                    }
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
          isDuzenleContainer={urunData ? true : false}
        />
      )}
         {confirmModalOpen && (
        <CustomConfirmPage
          isOpen={confirmModalOpen}
          item={editableUrun}
          items={editableUruns}
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
          title = {title}
        />      
      )}
    </>
  );
}
