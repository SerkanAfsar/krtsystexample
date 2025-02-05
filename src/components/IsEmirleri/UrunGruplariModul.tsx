"use client";

import { useEffect, useState } from "react";
import IsEmirleriModal from "./IsEmirleriModal";
import { cn, formatToCurrency } from "@/utils";
//import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import CustomConfirmPage from "../CustomUI/CustomConfirmPage";  
import { PostWorkOderUpdateStatus } from "@/Services/WorkOrder.Services";
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

export type CirakType = {
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
}: {
  item: UrunGruplariModulType;
  setValues?: any;
  urunData?: any;
  model?: any;
}) {

  const [selectedValues, setSelectedValues] = useState<SeciliUrunType[]>([]);
  const [editableUrun, setEditableUrun] = useState<SeciliUrunType>({});
  const [editableUruns, setEditableUruns] = useState<SeciliUrunType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [indexForConfirmation, setIndexForConfirmation] = useState<number | null>(null);
  const [kasa, setKasa] = useState<number | null>(null);
  const [targetUser, setTargetUSer] = useState<number | null>(null);
  const [userGiving, setUserGiving] = useState<number | null>(null);
  const { user } = useUserStore(); 
  const userRoleID = user?.groups[0]?.id;
  const isDisabled = urunData && (
    (title === "Pırlanta" && ![2, 8].includes(userRoleID ?? -1)) ||
    (title === "Renkli Taş" && ![2, 7].includes(userRoleID ?? -1)) ||
    (title === "Sade" && ![2, 1].includes(userRoleID ?? -1))
  );

  const isButtonDisabled = (item: SeciliUrunType) => {
    if (title === "Pırlanta") {
      if (item.status === "Rezervli" || item.status === "Gönderildi") {
        return userRoleID !== 2;
      }
      return userRoleID !== 8;
    }
    if (title === "Renkli Taş") {
      if (item.status === "Rezervli" || item.status === "Gönderildi") {
        return userRoleID !== 2;
      }
      return userRoleID !== 7;
    }
    if (title === "Sade") {
      if (item.status === "Rezervli" || item.status === "Gönderildi") {
        return userRoleID !== 2;
      }
      return userRoleID !== 1;
    }
    return true; 
  };


  const handleConfirmationOpen = (item: SeciliUrunType, index: number, newStatus?: string, items?: SeciliUrunType[]) => {
    setEditableUrun(newStatus ? { ...item, status: newStatus } : item);
    setIndexForConfirmation(index);
    setConfirmModalOpen(true);
    setEditableUruns(items || []);
    if (title === "Renkli Taş") {
      setKasa(7);
    } else if (title === "Pırlanta") {
      setKasa(8);
    } else if (title === "Sade") {
      setKasa(9);
    }
  };

  const statusMap: { [key: string]: string } = {
    PENDING: "Onay Bekliyor",
    RESERVED: "Rezervli",
    CANCELLED: "Red Edildi",
    ACCEPTED: "Onaylandı",
    SENT: "Gönderildi",
    Teslim: "Teslim Edildi",
  };

  const reverseStatusMap = Object.fromEntries(
    Object.entries(statusMap).map(([key, value]) => [value, key])
  );

  const handleConfirmation = (cirak?: CirakType) => {

    console.log("Seçili Çırak:", cirak?.id); 
    if (indexForConfirmation !== null) {
      const updatedValues = [...selectedValues];
      let newStatus: string | undefined;
      if (editableUrun.status === "Red Edildi") {
        newStatus = "Red Edildi";
        setTargetUSer(kasa)
        if(updatedValues[indexForConfirmation].status === 'Gönderildi'){
          setUserGiving(3)
        } else{
          setUserGiving(kasa)
        }
      } else if (updatedValues[indexForConfirmation].status === 'Rezervli') {
        newStatus = 'Onay Bekliyor';
        setUserGiving(kasa)
        setTargetUSer(kasa)
      } else if (updatedValues[indexForConfirmation].status === 'Onay Bekliyor') {
        newStatus = 'Onaylandı';
        setUserGiving(kasa)
        setTargetUSer(kasa)
      } else if (updatedValues[indexForConfirmation].status === 'Onaylandı') {
        newStatus = 'Gönderildi';
        setUserGiving(kasa)
        setTargetUSer(2)
      }  else if (updatedValues[indexForConfirmation].status === 'Gönderildi') {
        newStatus = 'Tesim Edildi';
        setUserGiving(2)
        setTargetUSer(2)
      }
      else if (updatedValues[indexForConfirmation].status === 'Tesim Edildi') {
        newStatus = 'Üretime Gönderildi';
        setUserGiving(2)
        setTargetUSer(2)
      }
      

      if (newStatus && newStatus != 'Tesim Edildi') {
      const newBackendStatus = reverseStatusMap[String(newStatus)];
      PostWorkOderUpdateStatus({
        work_order_product_id: Number(updatedValues[indexForConfirmation].id),
        status: newBackendStatus,
       // cirak: cirak?.id ?? null, 
       // user_giving: userGiving,
       // target_user: targetUser
      }).then((resp) => {
        if (resp?.success) {
          updatedValues[indexForConfirmation].status = newStatus;
          setSelectedValues(updatedValues);
        } else {
          return toast.error("Ürünün durumunu değiştirmeden önce kaydetmeniz gerekmektedir!", {
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
            nerede: item.user_group_name,
            status: statusMap[item.status] || item.status,
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
            carat: item.used_carat ,
            renk: item.product.properties.renk ,
            adet: item.quantity ,
            menstrual_status: item.product.properties.menstrual_status,
            maliyet: `${formatToCurrency(item.cost)} $`,
            firstPrice: item.cost,
            nerede: item.user_group_name,
            status: statusMap[item.status] || item.status,
            caratPrice:item.product.product_cost.pricePerCarat,
            type:item.product.type,
            id:item.id
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
            nerede: item.user_group_name,
            status: statusMap[item.status] || item.status,
            caratPrice:item.product.product_cost.pricePerCarat,
            type:item.product.type,
            id:item.id
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
      used_carat: item.used_carat != null ? Number(item.used_carat) : (item.carat != null ? Number(item.carat) : null),
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
        <div className="flex text-black dark:text-white w-full items-center justify-between">
          <b>{title}</b>
          {urunData ? (
                <div className="flex space-x-2 ">
                  {title !== "Sade" && (
                    <b className="mt-1 px-3 py-1 ml-4">
                      <span className="mr-8 text-black dark:text-white">
                      Toplam Karat:{" "}
                      <span className="text-green-500">
                        {selectedValues
                          .reduce((sum, item) => sum + (Number(item.used_carat) || Number(item.carat) || 0), 0)
                          .toFixed(2)}
                      </span>
                      </span>
                      <span className=" text-black dark:text-white">
                      Toplam Adet:{" "}
                      <span className="text-green-500">
                        {selectedValues
                          .reduce((sum, item) => sum + (Number(item.adet) || 0), 0)}
                      </span>
                      </span>
                    </b>
                  )}
                  <b className="mt-1 px-3 py-1 ml-4 dark:text-white text-black">
                    Toplam Maliyet:{" "}
                    <span className="text-green-500">
                      {(() => {
                        const total = selectedValues.reduce((sum, item) => {
                          if (title === "Sade") {
                            return sum + (Number(item.firstPrice) || 0);
                          } else {
                            return sum + (item.used_carat != null 
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
                  </b>     
                  <button
                    type="button"
                    className="btn block w-35 rounded-md px-3 py-1 text-center text-primary font-bold border-2 border-primary"
                    onClick={() => {
                      if (userRoleID === 2) {
                        const deliveredItems = selectedValues.filter((item) => item.status === "Teslim Alındı");
                        if (deliveredItems.length > 0) {
                          deliveredItems.forEach((item, index) => {
                            handleConfirmationOpen(item, index, "Teslim Alındı", deliveredItems);
                          });
                        } else {
                          toast.error("Teslim alınan ürün yok!", { position: "top-right" });
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
                          className={cn("ml-[-10px] dark:text-white  h-8 w-16 rounded-md border border-black pl-3 text-center",
                          item.status === "Red Edildi" ? "line-through" : "" 
                        )}
                          type="number"
                          value={item.used_carat}
                          disabled={
                            isDisabled ||
                            (item?.status && item?.status !== "Rezervli")
                          }
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
                        className={cn("p ml-[-12px] h-8 w-16 rounded-md border dark:text-white border-black pl-3 text-center dark:disabled:text-white",
                          item.status === "Red Edildi" ? "line-through" : "" 
                        )}
                        type="number"
                        disabled={
                          item?.menstrual_status == "Sertifikalı" ||
                          isDisabled  ||
                          (item?.status && item?.status !== "Rezervli")
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
                        ${item.status === 'Rezervli' ? 'text-blue-500 border-blue-500' :
                         item.status === 'Onay Bekliyor' ? 'text-orange-500 border-orange-500' :
                         item.status === 'Onaylandı' ? 'text-green-500 border-green-500' :
                         item.status === 'Gönderildi' ? 'text-purple-500 border-purple-500' :
                         item.status === 'Red Edildi' ? 'text-red border-red' :
                         item.status === 'Tesim Edildi' ? 'text-green-500 border-green-500' :
                         'text-black-500 border-black-500'}
                        border-2 leading-[2] 
                      `}                    
                      >
                      {item.status}
                    </div>
                    );
                  } else {
                    return (
                      <div className={cn(
                        "dark:text-white",
                        item.status === "Red Edildi" ? "line-through" : "" 
                      )}
                      key={index}>
                        {value}
                      </div>
                    );
                  }
                }
              })}
           <div className="flex items-center justify-left gap-4 dark:text-white">
              {urunData ? (
                <>
                {item.status !== "Red Edildi" && item.status !== "Teslim Edildi" ? (
                <>
                  <img
                    src={
                      item.status === "Rezervli"
                        ? "/images/icon/sendToConfirmation.svg"
                        : item.status === "Onay bekliyor"
                        ? "/images/icon/confirmation.svg"
                        : item.status === "Onaylandı"
                        ? "/images/icon/send.svg"
                        : item.status === "Teslim Edildi"
                        ? "/images/icon/approval.svg"
                        : "/images/icon/confirmation.svg"
                    }
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
                          setSelectedValues((prev: SeciliUrunType[]) =>
                            prev.filter((a) => a.pk != item.pk),
                          );
                        } else {
                          handleConfirmationOpen(item, index, "Red Edildi");
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
        />      
      )}
    </>
  );
}
