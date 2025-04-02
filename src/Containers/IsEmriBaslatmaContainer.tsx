"use client";
import { useEffect, useState } from "react";
import {
  WorkOrderTeamGroupType,
  WorkOrderType,
} from "../types/WorkOrder.types";
import CustomInput from "@/components/CustomUI/CustomInput";
import { cn } from "@/utils";
import { toast } from 'react-toastify'; 
import CustomConfirmPage from "../components/CustomUI/CustomConfirmPage";  
import CustomMucevherSaveModal from "../components/CustomUI/CustomMucevherSaveModal";  
import { PostWorkOderUpdateStatus, PostWorkOderWastages, GetWorkOrderProductList } from "@/Services/WorkOrder.Services";
import { useUserStore } from "@/store/useUserStore";
import { WorkOrderWastagePayloadType } from "../types/WorkOrder.types";
import WastageAndUnUsedModul from "../components/IsEmirleri/WastageAndUnUsedModul"

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

export default function IsEmriBaslatmaContainer({
  workOrderGroups,
  workOrderData,
  isAdmin,
  userId,
}: {
  userId: number;
  isAdmin: boolean;
  workOrderData: WorkOrderType;
  workOrderGroups: WorkOrderTeamGroupType[];
}) {
  const [productList, setProductList] = useState<any[]>([]);
  const [fireValues, setFireValues] = useState<{ [key: number]: number }>({});
  const [fireKaratValues, setFireKaratValues] = useState<{ [key: number]: number }>({});
  const [unUsed, setUnUsed] = useState<{ [key: number]: number }>({});
  const [description, setDescription] = useState<string>("");
  const [outputGram, setOutputGram] = useState<number | string>("");
  const [iscilik, setIscilik] = useState<number | string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [editableUrun, setEditableUrun] = useState<SeciliUrunType>({});
  const [editableUruns, setEditableUruns] = useState<SeciliUrunType[]>([]);
  const [statu, setStatu] = useState<boolean>(false);
  const [isSendClicked, setIsSendClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("production"); 
  const { user } = useUserStore(); 
  const userRoleID = user?.groups[0]?.id;
  const resetForm = () => {
    setDescription("");
    setOutputGram("");
    setIscilik("");
    setFireValues({});
    setFireKaratValues({});
};

  const fetchWorkOrderProducts = async (id: number) => {
    const response = await GetWorkOrderProductList({ work_order_id: id });
  
    if (response?.success && Array.isArray(response.data)) {
      const validStatuses = [
        "SENT_TO_WORKSHOP",
        "WORKSHOP_ACCEPTED",
        "WORKSHOP_SENT",
        "PRODUCTION_WORKSHOP_APPROVED",
      ];
  
      const filteredProducts = response.data.filter((product) =>
        validStatuses.includes(product.status)
      );
  
      setProductList(filteredProducts);
    } else {
      console.log("err:", response?.error);
      setProductList([]);
    }
  };
  
  const statusDetailsMap: Record<string, StatusDetails> = {
    SENT_TO_WORKSHOP: {
      className: "text-purple-500 border-purple-500",
      name: "Atly. Gönderildi",
      newStatus: "WORKSHOP_ACCEPTED",
      userGiving: Number(user?.id)
    },
    WORKSHOP_ACCEPTED: {
      className: "text-green-500 border-green-500",
      name: "Atly. Onayladı",
      newStatus: "WORKSHOP_SENT",
      userGiving: Number(user?.id)
    },
    WORKSHOP_SENT: {
      className: "text-blue-500 border-blue-500",
      name: "Atly. Gönderdi",
      newStatus: "PRODUCTION_WORKSHOP_APPROVED",
      userGiving: Number(user?.id)
    },
    PRODUCTION_WORKSHOP_APPROVED: {
      className: "text-green-500 border-green-500",
      name: "Üretim Onayladı",
      newStatus: "SENT_TO_WORKSHOP",
      userGiving: Number(user?.id)
    },
  };

  
  useEffect(() => {
    fetchWorkOrderProducts(workOrderData.id);
    setIsSendClicked(false);
  }, [workOrderData.id, statu]);

  const handleFireChange = (id: number, value: number) => {
    setFireValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleFireKaratChange = (id: number, value: number) => {
    setFireKaratValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleUnUsed = (id: number, value: number) => {
    setUnUsed((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirmation = (cirak?: UserType, targetUser?: UserType, items?: SeciliUrunType[]) => {
    const workOrderProductIds = items && items.length > 0 ? items.map(item => item.id) : [editableUrun.id];
    const currentStatus = editableUrun.status;
    const statusKey = currentStatus && statusDetailsMap[currentStatus] ? currentStatus : null;
    let newStatus = statusKey ? statusDetailsMap[statusKey]?.newStatus ?? "" : "";
    let userGiving = statusKey ? statusDetailsMap[statusKey]?.userGiving ?? null : null;

    if (statusKey) {
      if (isSendClicked) {
        const wastagePayload = workOrderProductIds.map((productId) => ({
          work_order_product_id: Number(productId),
          wastage: fireKaratValues[Number(productId)] ? Number(fireKaratValues[Number(productId)]) : null, 
          wastage_quantity: fireValues[Number(productId)] ? Number(fireValues[Number(productId)]) : null, 
          unused_carat: unUsed[Number(productId)] ? Number(unUsed[Number(productId)]) : null, 
        }));
        
        const WorkOrderWastagePayload: WorkOrderWastagePayloadType = {
          work_order_product_wastage: wastagePayload,
          will_update_products: {
            work_order_product_ids: workOrderProductIds.map(Number),
            status: newStatus,
            target_user_id:
              currentStatus === "WORKSHOP_SENT" || currentStatus === "SENT_TO_WORKSHOP"
                ? Number(userGiving)
                : targetUser?.id
                ? Number(targetUser.id)
                : null,
            from_user_id: userGiving ? Number(userGiving) : null,
            pupil_user_id: cirak?.id ? Number(cirak.id) : null,
          },
          work_order_log: {
            work_order: workOrderData.id,
            output_gram: outputGram,
            cost: iscilik,
            description: description,
            product_ids: workOrderProductIds.map(Number),
          },
        };
        
        PostWorkOderWastages(WorkOrderWastagePayload).then((resp) => {
          if (resp?.success) {
            toast.success("Ürünlerin durumu başarıyla değişti!", { position: "top-right" });
            setStatu(prevStatu => !prevStatu);
          } else {
            toast.error("Ürünlerin durumu değiştirilemedi!", { position: "top-right" });
          }
        });
        
      } else {
        PostWorkOderUpdateStatus({
          work_order_product_ids: workOrderProductIds.map(id => Number(id)),
          status: newStatus,
          pupil_user_id: cirak?.id ? Number(cirak.id) : null,
          from_user_id: userGiving ? Number(userGiving) : null,
          target_user_id: currentStatus === "WORKSHOP_SENT" || currentStatus === "SENT_TO_WORKSHOP" 
          ? Number(userGiving) 
          : (targetUser?.id 
          ? Number(targetUser.id) 
          : null),
        }).then((resp) => {
          if (resp?.success) {
            toast.success("Ürünlerin durumu başarıyla değişti!", { position: "top-right" });
            setStatu(prevStatu => !prevStatu);
          } else {
            toast.error("Ürünün durumu değiştirilemedi!", { position: "top-right" });
          }
        });
      }
    }
    resetForm()
    setConfirmModalOpen(false);
  };
  
  const handleConfirmationOpen = (item: any, index: number) => {
    setEditableUrun(item); 
    setEditableUruns([])
    setConfirmModalOpen(true); 
  };
  
  const handleSubmit = () => {
    if (!description.trim()) {
      return toast.error("Açıklama alanı boş olamaz!", { position: "top-right" });
    }
    if (!outputGram || isNaN(Number(outputGram)) || Number(outputGram) <= 0) {
      return toast.error("Geçerli bir çıkış gramı giriniz!", { position: "top-right" });
    }
    if (!iscilik || isNaN(Number(iscilik)) || Number(iscilik) <= 0) {
      return toast.error("Geçerli bir işçilik değeri giriniz!", { position: "top-right" });
    }
    const acceptedProducts = productList.filter(
      (product) => product.status === "WORKSHOP_ACCEPTED"
    );
  
    if (acceptedProducts.length === 0) {
      return toast.error("Atölyede gönderilecek ürün yok!", {
        position: "top-right",
      });
    }
    setEditableUruns(acceptedProducts)
    setEditableUrun(acceptedProducts[0])
    setConfirmModalOpen(true); 
    setIsSendClicked(true);
  };

  const handleFinishProduction = () => {
    if (productList.length === 0) {
      return toast.error("Ürün listesi boş!", {
        position: "top-right",
      });
    }
  
    const allApproved = productList.every(product => product.status === "PRODUCTION_WORKSHOP_APPROVED");
  
    if (allApproved) {
      setFinishModalOpen(true);
    } else {
      return toast.error("Hala üretimde olan ürünler var!", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className={cn(
        "mb-1 rounded-sm border border-stroke bg-white pb-5 shadow-default dark:border-strokedark dark:bg-boxdark",
        ["Completed", "Cancelled"].includes(workOrderData.status) ? "pointer-events-none opacity-50" : ""
        )}
      >
        <div className="border-b border-stroke dark:border-strokedark">
          <div className="flex w-full items-center justify-between">
            <h3 className="p-4 text-lg font-medium text-black dark:text-white">
              Atölye Bilgileri
            </h3>
            <div className="flex items-center justify-center gap-3">
              <span>Mücevher Kodu:</span>
              <b className="mr-4 text-black">
                {workOrderData?.product_temp_code}
              </b>
            </div>
          </div>
        </div>
        <hr />
        <div className="m-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid w-full grid-cols-4 gap-4">
            <CustomInput
              item={{
                name: "description",
                title: "Açıklama",
                required: false,
                type: "text",
              }}
              onChange={(e) => setDescription(e.target.value)}
              value={description} 
            />
            <CustomInput
              item={{
                name: "output_gram",
                title: "Çıkış Gramı",
                required: true,
                type: "number",
                placeholder: "Çıkış Gramı",
              }}
              step=".001"
              onChange={(e) => setOutputGram(e.target.value)}
              value={outputGram} 
            />
            <CustomInput
              item={{
                name: "cost",
                title: "İşçilik",
                required: true,
                type: "number",
                placeholder: "İşçilik",
                rightIcon: "$",
              }}
              onChange={(e) => setIscilik(e.target.value)}
              value={iscilik} 
            />
          <button
            type="submit"
            className={cn(
              "mt-8 rounded-md bg-primary p-3 text-white h-12",
              userRoleID === 2 ? "opacity-50 cursor-not-allowed" : ""
            )}
            disabled={userRoleID === 2}
          >
            GÖNDER
          </button>
          </div>
          </form>
        </div>
      </div>
      <div className={cn(
        "mb-1 rounded-sm border border-stroke bg-white pb-5 shadow-default dark:border-strokedark dark:bg-boxdark",
        )}
      >
        <div className="border-b border-stroke dark:border-strokedark p-4">
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={() => setActiveTab("production")}
            className={`relative px-4 py-2 text-gray-800 font-medium transition-colors duration-300 ${
              activeTab === "production"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Üretim Ürünleri
            {activeTab === "production" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
            )}
          </button>
          <span className="text-gray-600">/</span>
          <button
            onClick={() => setActiveTab("waste")}
            className={`relative px-4 py-2 text-gray-800 font-medium transition-colors duration-300 ${
              activeTab === "waste"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Fire Ürünler
            {activeTab === "waste" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
            )}
          </button>
          <span className="text-gray-600">/</span>
          <button
            onClick={() => setActiveTab("unused")}
            className={`relative px-4 py-2 text-gray-800 font-medium transition-colors duration-300 ${
              activeTab === "unused"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Kullanılmayan Ürünler
            {activeTab === "unused" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
            )}
          </button>
        </div>
        </div>
        {activeTab === "production" && (
          <div className={cn(
            "overflow-x-auto p-4",
            ["Completed", "Cancelled"].includes(workOrderData.status) ? "pointer-events-none opacity-50" : ""
            )}
          >
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  {[
                    "ID",
                    "Kod",
                    "Resim",
                    "Ürün Tipi",
                    "Adet",
                    "Kullanılan Karat",
                    "Fire Adet",
                    "Fire Karat",
                    "Kullanılmayan Karat",
                    "Nerede",
                    "Statu",
                    "Fiyat",
                    "İşlemler"
                  ].map((header, index) => (
                    <th key={index} className="border-b border-gray p-2 text-left text-sm font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productList.length > 0 ? (
                  productList.map((product) => {
                    const productStatus = product.status; 
                    const statusDetails = statusDetailsMap[productStatus];
                    return (
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
                          {product.product.image ? (
                            <img 
                            src={product.product.image} 
                            alt="Ürün Resmi" 
                            className="w-10 h-10" 
                            />
                          ) : (
                            "-"
                          )}
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
                        <td className="p-2 text-sm">{product.quantity || "-"}</td>
                        <td className="p-2 text-sm">
                          {product.used_carat && product.used_carat !== 0 
                            ? product.used_carat 
                            : product.product.properties?.carat && product.product.properties.carat !== 0 
                              ? product.product.properties.carat 
                              : "-"}
                        </td>
                        <td className="p-2 text-sm">
                          <input
                            type="number"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              const maxAllowed = (product.wastage || 0) + (product.quantity || 0);
                        
                              if (value > maxAllowed) {
                                toast.error("Fire toplamı adetten fazla olamaz!", { position: "top-right" });;            
                                handleFireChange(product.id, 0); 
                              } else {
                                handleFireChange(product.id, value);
                              }
                            }}
                            className="w-20 border p-1 text-sm"
                            disabled={product.status !== "WORKSHOP_ACCEPTED"}
                          />
                        </td>
                        <td className="p-2 text-sm">
                          <input
                            type="number"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              const maxAllowed = (product.used_carat && product.used_carat !== 0 
                                ? product.used_carat 
                                : product.product.properties?.carat && product.product.properties.carat !== 0 
                                  ? product.product.properties.carat 
                                  : 0);
                              if (value > maxAllowed) {
                                toast.error("Fire toplam karatı kullanılan karattan fazla olamaz!", { position: "top-right" });;            
                                handleFireKaratChange(product.id, 0); 
                              } else {
                                handleFireKaratChange(product.id, value);
                              }
                            }}
                            className="w-20 border p-1 text-sm"
                            disabled={product.status !== "WORKSHOP_ACCEPTED"}
                          />
                        </td>
                        <td className="p-2 text-sm">
                          <input
                            type="number"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              const maxAllowed = (product.used_carat && product.used_carat !== 0 
                                ? product.used_carat 
                                : product.product.properties?.carat && product.product.properties.carat !== 0 
                                  ? product.product.properties.carat 
                                  : 0);
                              if (value > maxAllowed) {
                                toast.error("Kullanılmayan karat toplam karattan fazla olamaz!", { position: "top-right" });;            
                                handleUnUsed(product.id, 0); 
                              } else {
                                handleUnUsed(product.id, value);
                              }
                            }}
                            className="w-20 border p-1 text-sm"
                            disabled={product.status !== "WORKSHOP_ACCEPTED"}
                          />
                        </td>
                        <td className="pr-8 text-sm">{product.user_group_name || ""} </td>
                        <td className="p-2 text-sm">
                          <div className={`p ml-[-25px] pt-2 h-8 w-28 lg:w-28 md:w-22 sm:w-20 rounded-full text-center text-xs font-bold whitespace-nowrap dark:disabled:text-white border-2 leading-[2],
                            ${statusDetails?.className}`}
                            >
                            {statusDetails?.name}
                          </div>
                        </td>
                        <td className="p-2 text-sm">
                          {product.cost
                            ? (Number(product.cost).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : "0.00"} $
                        </td>
                        <td className="p-2 text-sm">
                        {product.status !== "WORKSHOP_ACCEPTED" && (
                          <button
                            className={`p-2 w-8 h-8 ${
                              (product.status === "SENT_TO_WORKSHOP" && userRoleID === 2) ||
                              (userRoleID !== 2 && (product.status === "WORKSHOP_SENT" || product.status === "PRODUCTION_WORKSHOP_APPROVED"))
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            onClick={() => handleConfirmationOpen(product, product.id)}
                            disabled={
                              (product.status === "SENT_TO_WORKSHOP" && userRoleID === 2) ||
                              (product.status !== "SENT_TO_WORKSHOP" && userRoleID !== 2) ||
                              (userRoleID === 7) ||
                              (userRoleID === 8) ||
                              (userRoleID === 9) 
                            }
                            >
                            <img src="/images/icon/confirmation.svg" alt="confirmation" />
                          </button>
                        )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={13} className="p-4 text-center text-sm">
                      Ürün yok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "waste" && <WastageAndUnUsedModul type="waste" workOderData={workOrderData}/>}
        {activeTab === "unused" && <WastageAndUnUsedModul type="unused" workOderData={workOrderData} />}
      </div>
      <div className="flex justify-end mt-4">
      <button
        className={cn(
          "mt-8 rounded-md bg-primary p-3 text-white h-12 w-1/4",
          userRoleID !== 2 || ["Completed", "Cancelled"].includes(workOrderData.status) ?  "opacity-50 cursor-not-allowed" : ""
        )}
        disabled={userRoleID !== 2 || ["Completed", "Cancelled"].includes(workOrderData.status)}
        onClick={handleFinishProduction} 
      >
        Üretimi Bitir
      </button>
      </div>
      {confirmModalOpen && (
        <CustomConfirmPage
          isOpen={confirmModalOpen}
          item={editableUrun}
          items={editableUruns}
          onConfirm={handleConfirmation}
          onCancel={() => {
            setConfirmModalOpen(false);
            setIsSendClicked(false); 
          }}
        />
      )}
        {finishModalOpen && (
        <CustomMucevherSaveModal
          id={workOrderData.id} 
          showConfirm={finishModalOpen}
          setShowConfirm={setFinishModalOpen}
          code={String(workOrderData.product_temp_code)} 
        />
      )}
    </>
  );
}