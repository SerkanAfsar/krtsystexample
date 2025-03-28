import { useEffect, useState } from "react";
//import { toast } from 'react-toastify'; 
import {WorkOrderType,} from "@/types/WorkOrder.types";  
import {
  GetWastageProductList,
  GetRefundProductList,
  //PostWorkOderUpdateStatus
} from "@/Services/WorkOrder.Services";
import { useUserStore } from "@/store/useUserStore";
import CustomConfirmPage from "@/components/CustomUI/CustomConfirmPage";  


  type StatusDetails = {
    className: string;
    name: string;
    newStatus: string;
    userGiving: Number;
  };

  type SeciliUrunType = {
    [key: string]: string | number;
  };

  type UserType = {
    id: number;
    username: string;
    email: string;
  };
  
  export default function WastageAndUnUsedModul({
    type,
    workOderData
    }: {
    type?: string;
    workOderData: WorkOrderType;
    }) {
    const [productList, setProductList] = useState<any[]>([]);
    const [editableUrun, setEditableUrun] = useState<SeciliUrunType>({});
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [kasaType, setKasaType] = useState<string>("");
    const { user } = useUserStore(); 
    const userRoleID = user?.groups[0]?.id;


    const statusDetailsMap: Record<string, StatusDetails> = {
      WORKSHOP_SENT: {
        className: "text-blue-500 border-blue-500",
        name: "Atly. Gönderdi",
        newStatus: "PRODUCTION_WORKSHOP_APPROVED",
        userGiving: Number(user?.id)
      },
      PRODUCTION_WORKSHOP_APPROVED: {
        className: "text-green-500 border-green-500",
        name: "Üretim Onayladı",
        newStatus: "SENT_TO_TILL",
        userGiving: Number(user?.id)
      },
      SENT_TO_TILL: {
        className: "text-green-500 border-green-500",
        name: "Üretim Onayladı",
        newStatus: "TILL_ACCEPTED",
        userGiving: Number(user?.id)
      },
    };

    const handleConfirmationOpen = (item: any) => {
      setEditableUrun(item); 
      setKasaType(item.product.type)
      setConfirmModalOpen(true); 
    };

    const handleConfirmation = (cirak?: UserType, targetUser?:UserType) => {
      const workOrderProductIds = editableUrun.id;
      const currentStatus = editableUrun.status;
      const statusKey = currentStatus && statusDetailsMap[currentStatus] ? currentStatus : null;
      let newStatus = statusKey ? statusDetailsMap[statusKey]?.newStatus ?? "" : "";
      let userGiving = statusKey ? statusDetailsMap[statusKey]?.userGiving ?? null : null;
        console.log(editableUrun)
        console.log(workOrderProductIds)
        console.log(newStatus)
        console.log(cirak)
        console.log(userGiving)
        console.log(targetUser)
       /* if (statusKey) {
          PostWorkOderUpdateStatus({
            work_order_product_ids: workOrderProductIds.map(id => Number(id)),
            status: newStatus,
            pupil_user_id: cirak?.id ? Number(cirak.id) : null,
            from_user_id: userGiving ? Number(userGiving) : null,
            target_user_id: currentStatus == "Gönderildi" ? Number(userGiving) : (targetUser?.id ? Number(targetUser.id) : null)
          }).then((resp) => {
            if (resp?.success) {
              //setStatu((prevStatu: boolean) => !prevStatu);
          } else {
            return toast.error("Ürünün durumu değiştirilemedi!", {
              position: "top-right",
            });
              }
          });
        }*/
        setConfirmModalOpen(false);
      }

      useEffect(() => {
        if(type == "waste"){
          GetWastageProductList({ work_order_id: workOderData.id }).then((resp) => {
            if (resp?.success && Array.isArray(resp.data)) {
              setProductList(resp.data)
            } else {
              console.log("err:", resp);
            }
          });
        } else {
          GetRefundProductList({ work_order_id: workOderData.id }).then((resp) => {
            if (resp?.success && Array.isArray(resp.data)) {
              setProductList(resp.data)
            } else {
              console.log("err:", resp);
            }
          });
        }
       
      }, [type]);

      return (
        <div className="overflow-x-auto p-4">
          <h3 className="text-lg font-medium text-black dark:text-white">
            {type === "waste" ? "Fire Ürünler" : "Kullanılmayan Ürünler"}
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                {[
                  "ID",
                  "Kod",
                  "Ürün Tipi",
                  type === "waste" ? "Fire Karat" : "Kullanılmayan Karat",
                  "Nerede",
                  "Statu",
                  "İşlemler" 
                ]
                .filter(Boolean)
                .map((header, index) => (
                  <th key={index} className="border-b border-gray p-2 text-left text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productList.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-sm">
                    Ürün yok.
                  </td>
                </tr>
              ) : (
                productList.map((product) => (
                  <tr key={product.id}>
                    <td className="p-2 text-sm">{product.product.pk}</td>
                    <td className="p-2 text-sm whitespace-nowrap">
                      <a 
                        href={
                          product.product.type === "Diamond"
                            ? `/Admin/StokYonetimi/Pirlanta/PirlantaEkle/${product.product.pk}`
                            : product.product.type === "Simple"
                            ? `/Admin/StokYonetimi/Sade/SadeEkle/${product.product.pk}`
                            : product.product.type === "ColoredStone"
                            ? `/Admin/StokYonetimi/RenkliTas/RenkliTasEkle/${product.product.pk}`
                            : "#"
                        } 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 underline"
                      >
                        {product.product.code}
                      </a>
                    </td>
                    <td className="p-2 text-sm">
                      {product.product.type === "Simple" 
                        ? "Sade" 
                        : product.product.type === "ColoredStone" 
                        ? "Renkli Taş" 
                        : product.product.type === "Diamond" 
                        ? "Pırlanta" 
                        : product.product.type || "-"}
                    </td>
                    <td className="p-2 text-sm">{type === "waste" ? product.wastage_carat : product.refunded_carat}</td>
                    <td className="p-2 text-sm">{product.user_group_name}</td>
                    <td className="p-2 text-sm">
                      <div className={`p ml-[-25px] pt-2 h-8 w-28 lg:w-28 md:w-22 sm:w-20 rounded-full text-center text-xs font-bold whitespace-nowrap dark:disabled:text-white border-2 leading-[2],
                        ${statusDetailsMap[product.status]?.className}`}
                        >
                        {statusDetailsMap[product.status]?.name}
                      </div>
                    </td>
                    <td className="p-2 text-sm">
                      {product.status !== "TILL_ACCEPTED" && (
                        <button
                          className={`p-2 w-8 h-8 ${
                            (["PRODUCTION_WORKSHOP_APPROVED", "WORKSHOP_SENT"].includes(product.status) && userRoleID !== 2) ||
                            (product.status === "SENT_TO_TILL" &&
                              ((product.product.type === "Simple" && userRoleID !== 9) ||
                              (product.product.type === "Diamond" && userRoleID !== 8) ||
                              (product.product.type === "ColoredStone" && userRoleID !== 7)))
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() => handleConfirmationOpen(product)}
                          disabled={
                            (["PRODUCTION_WORKSHOP_APPROVED", "WORKSHOP_SENT"].includes(product.status) && userRoleID !== 2) ||
                            (product.status === "SENT_TO_TILL" &&
                              ((product.product.type === "Simple" && userRoleID !== 9) ||
                              (product.product.type === "Diamond" && userRoleID !== 8) ||
                              (product.product.type === "ColoredStone" && userRoleID !== 7)))
                          }
                        >
                          <img src="/images/icon/confirmation.svg" alt="confirmation" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {confirmModalOpen && (
            <CustomConfirmPage
              isOpen={confirmModalOpen}
              item={editableUrun}
              kasaType={kasaType}
              onConfirm={handleConfirmation}
              onCancel={() => {
                setConfirmModalOpen(false);
              }}
            />
          )}
        </div>
      );
  }

  