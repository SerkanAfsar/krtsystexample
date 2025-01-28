"use client";
import UrunGruplariModul, {
  UrunGruplariModulType,
} from "@/components/IsEmirleri/UrunGruplariModul";
import {
  PirlantaModalHeaders,
  RenkliTasModalHeaders,
  SadeModalHeaders,
} from "../types/types";
import {
   // WorkOrderAtolyeType,
   // WorkOrderPeopleList,
    WorkOrderTeamGroupType,
    WorkOrderType,
  } from "../types/WorkOrder.types";
import usePirlantaModalData from "@/hooks/ModalDataHooks/usePirlantaModalData";
import useRenkliTasModalData from "@/hooks/ModalDataHooks/useRenkliTasModalData";
import useSadeModalData from "@/hooks/ModalDataHooks/useSadeModalData";
import { useEffect, useState, useRef } from "react";
import { formatToCurrency } from "@/utils";
import {
  AddWorOrderType,
  ProductItemsType,
  WorkOrderProductType,
} from "../types/WorkOrder.types";

import { AddWorkOrderService } from "@/Services/WorkOrder.Services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { WorkOrderQueueApiService } from "@/ApiServices/WorkOrders.ApiService";
import { MucevherCode } from "@/utils/Mucevher.Utils";
import { GetSimpleWorkOrderProductList } from "@/Services/WorkOrder.Services";
import { useUserStore } from "@/store/useUserStore";

const UrunGruplari: UrunGruplariModulType[] = [
  {
    buttonText: "Sade Ekle",
    headerColumns: [
      { title: "Ürün Kodu", accessor: "code" },
      { title: "Resim", accessor: "resim", isCenter: true },
      { title: "Renk", accessor: "renk" },
      { title: "Gram", accessor: "gram" },
      { title: "Has", accessor: "has" },
      { title: "Model", accessor: "model" },
      { title: "Maliyet", accessor: "maliyet" },
      { title: "Nerede", accessor: "nerede" },
      { title: "Status", accessor: "status" },
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Sade",
    modalHeaderColumns: SadeModalHeaders,
    tableFunction: useSadeModalData,
  },
  {
    buttonText: "Renkli Taş Ekle",
    headerColumns: [
      { title: "Ürün Kodu", accessor: "code" },
      { title: "Renkli Taş", accessor: "name" },
      { title: "Kesim", accessor: "kesim" },
      { title: "Karat", accessor: "carat" },
      { title: "Renk", accessor: "renk" },
      { title: "Adet", accessor: "adet" },
      { title: "Maliyet", accessor: "maliyet" },
      { title: "Nerede", accessor: "nerede" },
      { title: "Status", accessor: "status" },
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Renkli Taş",
    modalHeaderColumns: RenkliTasModalHeaders,
    tableFunction: useRenkliTasModalData,
  },
  {
    buttonText: "Pırlanta Ekle",
    headerColumns: [
      { title: "Ürün Kodu", accessor: "code" },
      { title: "Kesim", accessor: "kesim" },
      { title: "Karat", accessor: "carat" },
      { title: "Berraklık", accessor: "berraklik" },
      { title: "Renk", accessor: "renk" },
      { title: "Adet", accessor: "adet" },
      { title: "Maliyet", accessor: "maliyet" },
      { title: "Nerede", accessor: "nerede" },
      { title: "Status", accessor: "status" },
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Pırlanta",
    modalHeaderColumns: PirlantaModalHeaders,
    tableFunction: usePirlantaModalData,
  },
];

export default function IsEmriDuzenleContainer ({
  workOrderGroups,
  workOrderData,
  isAdmin,
  userId,
}:{
  userId: number;
  isAdmin: boolean;
  workOrderData: WorkOrderType;
  workOrderGroups: WorkOrderTeamGroupType[];
}) {
  const router = useRouter();
  const { user } = useUserStore(); 
  const userRoleID = user?.groups[0]?.id;
  const [description, setDescription] = useState<string>(workOrderData.description || "");
  const [isEmriCode, setIsEmriCode] = useState<string>(String(workOrderData.id) || "");
  const [gender, setGender] = useState<string>(workOrderData.gender || ""); 
  const [isWomanChecked, setIsWomanChecked] = useState<boolean>(false);
  const [isManChecked, setIsManChecked] = useState<boolean>(false);
  const [model, setModel] = useState<string>(workOrderData.model_type_name || ""); 
  const [urunData, setUrunData] = useState<any>([]);
  const [values, setValues] = useState<ProductItemsType[]>(
    UrunGruplari.map((item) => {
      return {
        title: item.title,
        products: [],
      };
    }),
  );
  const pirlantaArr = values.find((a) => a.title == "Pırlanta")?.products;
  const renkliTasArr = values.find((a) => a.title == "Renkli Taş")?.products;
  const sadeArr = values.find((a) => a.title == "Sade")?.products;
  const { ayar, modelTuru } = sadeArr?.length ? sadeArr[0] : {};
  const { name: type } = renkliTasArr?.length ? renkliTasArr[0] : {};
  const isCondition = pirlantaArr?.some((a) => a.renk == "BLACK");
  const initialTotalPrice = useRef<number>(0); 


  useEffect(() => {
    if (gender === "Woman") {
      setIsWomanChecked(true);
      setIsManChecked(false);
      setGender("Woman");
    } else if (gender === "Man") {
      setIsWomanChecked(false);
      setIsManChecked(true);
      setGender("Man");
    } else if (gender === "Both") {
      setIsWomanChecked(true);
      setIsManChecked(true);
      setGender("Both");
    }
  }, [gender]);

  useEffect(() => {
    GetSimpleWorkOrderProductList({
      work_order_id: workOrderData.id,
      order_by: "order_by", 
      page: 1,
    }).then((resp) => {
      if (resp?.success) {
        setUrunData(resp?.data);
      } else {
        console.log("API Response başarısız:", resp);
      }
    });
  }, [workOrderData.id]);

  useEffect(() => {
    const resultCode = MucevherCode(pirlantaArr, sadeArr, renkliTasArr);
    const process = async ({ resultCode }: { resultCode: string }) => {
      const result = await WorkOrderQueueApiService({ code: resultCode });
      //setIsEmriCode(`${resultCode}-${result}`);
    };
    if (resultCode) {
      process({ resultCode });
    } else {
      setIsEmriCode(String(workOrderData.id) || "");;
    }
  }, [
    gender,
    pirlantaArr,
    renkliTasArr,
    sadeArr,
    renkliTasArr?.length,
    ayar,
    modelTuru,
    renkliTasArr?.length,
    type,
    isCondition,
  ]);


  const lastItems = values.reduce<WorkOrderProductType[]>((acc, next) => {
    return [...acc, ...next.products];
  }, []);

  
  const totalPrice = lastItems.reduce<number>((acc, next) => {
    return next.price ? acc + next.price : acc;
  }, 0);

  if (initialTotalPrice.current === 0) {
    initialTotalPrice.current = lastItems.reduce<number>((acc, next) => {
      return next.price ? acc + next.price : acc;
    }, 0);
  }

  const lastData: AddWorOrderType = {
    model_type : 0,
    total_product_cost : String(totalPrice),
    gender,
    description,
    workorder_products: lastItems,
    product_temp_code: isEmriCode,
  };

  const addWorkOrder = async () => {
    const condition = lastData.workorder_products.some(
      (a: WorkOrderProductType) => a.type == "Sade",
    );
    if (!condition) {
      return toast.error("Üretimde En Az 1 Adet Sade Seçilmesi Zorunludur!", {
        position: "top-right",
      });
    }

    if (!pirlantaArr?.length && !renkliTasArr?.length) {
      return toast.error("Üretimde En Az 1 Adet Taş Seçilmesi Zorunludur!", {
        position: "top-right",
      });
    }

    if (!description) {
      return toast.error("Üretimde İş Emri Açıklaması Girilmesi Zorunludur!", {
        position: "top-right",
      });
    }

    if (!gender) {
      return toast.error("Üretimde Cinsiyet Seçilmesi Zorunludur!", {
        position: "top-right",
      });
    }
    const result: any = await AddWorkOrderService({ data: lastData });

    if (result?.success) {
      toast.success("Üretim İş Emri Eklendi", { position: "top-right" });
      return router.push(
        `/Admin/IsEmirleri/UretimBaslatma/${result.data.id}?isFirst=true`,
      );
    } else {
      toast.error(result[0], { position: "top-right" });
    }
  };

  return (
    <div className="mb-5">
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col gap-4 p-3">
        <div className="mb-6 w-full rounded-lg border border-stroke bg-white p-5 shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="float-right flex w-full items-center justify-between text-black text-sm font-medium border-b-2 py-1 border-stone-200">
            İş Emri ID: {isEmriCode}
        </div>
        <div className="flex w-full justify-between mt-10">
        {/* model kısmı */}
          <div className="flex flex-col gap-4 w-1/4">
            <label className="text-sm font-medium text-black dark:text-white">
              Model Türü
            </label>
            <select disabled className="w-full rounded-lg border-[1.5px] border-stone-400 bg-white px-3 py-2 text-black outline-none focus:border-primary dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={(e) => setModel(e.target.value)}
                >
              <option>{model}</option>
            </select>
            <div className="flex items-center gap-4 ml-2">
            <label className="flex items-center text-sm font-medium text-black dark:text-white">
              <input
                disabled
                type="checkbox"
                className="mr-2"
                value="Kadın"
                checked={isWomanChecked}
              />{" "}
              KADIN
            </label>
            <label className="flex items-center text-sm font-medium text-black dark:text-white">
              <input
                disabled
                type="checkbox"
                className="mr-2"
                value="Erkek"
                checked={isManChecked}
              />{" "}
              ERKEK
            </label>
            </div>
          </div>
          {/* maliyet */}
          <div className="flex flex-col gap-2">
          <label className="text-sm dark:text-white text-black">
            Maliyetler
          </label>
          <label className="text-sm dark:text-white text-black font-bold">
            İlk Malzeme Maliyeti :{" "}
            <span className="font-bold text-black underline dark:text-white">{`${formatToCurrency(initialTotalPrice.current)} $`}</span>
          </label>
          <label className="text-sm dark:text-white text-green-400 font-bold">
            Güncel Malzeme Maliyeti : {" "}
            <span className="font-bold text-green-400 underline dark:text-white">{`${formatToCurrency(totalPrice)} $`}</span>
          </label>
          </div>
          {/* açıklama */}
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium text-black dark:text-white">
              Üretim Müdürü Açıklaması
            </label>
            <textarea
              readOnly
              rows={3}
              value={description}
              placeholder= {workOrderData.description}
              className="w-full rounded-lg border-[1.5px] border-stone-400 bg-white px-5 py-3 text-black outline-none focus:border-primary dark:bg-boxdark dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* ürün kısımları */}
          {UrunGruplari.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-stroke bg-white p-4 shadow-md dark:border-strokedark dark:bg-boxdark"
            >
              <UrunGruplariModul setValues={setValues} item={item} urunData={urunData.results} model={model}/>
            </div>
          ))}
        </div>

        <div className="flex items-center self-end justify-between p-3">
        <button
            type="button"
            onClick={async () => await addWorkOrder()}
            className="w-40 rounded-md bg-primary px-2 py-2 ml-5 text-center text-white"
          >
            Kaydet
          </button>
          <button
            type="button"
            className={`w-40 rounded-md px-2 py-2 ml-5 text-center text-white ${
              userRoleID === 2 ? "bg-primary" : "bg-primary cursor-not-allowed"
            }`}
            disabled={userRoleID !== 2} 
          >
            Üretimi Başlat
        </button>
        </div>


      </div>
    </div>
  );
}
