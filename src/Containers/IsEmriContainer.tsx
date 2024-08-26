"use client";
import UrunGruplariModul, {
  UrunGruplariModulType,
} from "@/components/IsEmirleri/UrunGruplariModul";
import { ModalHeaders, ModalSadeHeaders } from "../../types/types";

import usePirlantaModalData from "@/hooks/ModalDataHooks/usePirlantaModalData";
import useRenkliTasModalData from "@/hooks/ModalDataHooks/useRenkliTasModalData";
import useSadeModalData from "@/hooks/ModalDataHooks/useSadeModalData";
import { useEffect, useMemo, useState } from "react";
import { formatToCurrency } from "@/utils";
import {
  AddWorOrderType,
  ProductItemsType,
  WorkOrderProductType,
} from "../../types/WorkOrder.types";

import { AddWorkOrderService } from "@/Services/WorkOrder.Services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { WorkOrderQueueApiService } from "@/ApiServices/WorkOrders.ApiService";
import { MucevherCode } from "@/utils/Mucevher.Utils";

const UrunGruplari: UrunGruplariModulType[] = [
  {
    buttonText: "Sade Ekle ",
    headerColumns: [
      { title: "Ürün Kodu", accessor: "code" },
      { title: "Renk", accessor: "renk" },
      { title: "Gram", accessor: "gram" },
      { title: "Has", accessor: "has" },
      { title: "Model", accessor: "model" },
      { title: "Maliyet", accessor: "maliyet" },
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Sade",
    modalHeaderColumns: ModalSadeHeaders,
    tableFunction: useSadeModalData,
  },
  {
    buttonText: "Renkli Taş Ekle",
    headerColumns: [
      { title: "Ürün Kodu", accessor: "code" },
      { title: "Adı", accessor: "name" },
      { title: "Kesim", accessor: "kesim" },
      { title: "Karat", accessor: "carat" },
      { title: "Renk", accessor: "renk" },
      { title: "Adet", accessor: "adet" },
      { title: "Maliyet", accessor: "maliyet" },
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Renkli Taş",
    modalHeaderColumns: ModalHeaders,
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
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Pırlanta",
    modalHeaderColumns: ModalHeaders,
    tableFunction: usePirlantaModalData,
  },
];

export default function IsEmriContainer() {
  const router = useRouter();
  const [description, setDescription] = useState<string>("");
  const [isEmriCode, setIsEmriCode] = useState<string>("");
  const [values, setValues] = useState<ProductItemsType[]>(
    UrunGruplari.map((item) => {
      return {
        title: item.title,
        products: [],
      };
    }),
  );

  const resultCode = useMemo(() => {
    const pirlantaArr = values.find((a) => a.title == "Pırlanta")?.products;
    const renkliTasArr = values.find((a) => a.title == "Renkli Taş")?.products;
    const sadeArr = values.find((a) => a.title == "Sade")?.products;
    const result = MucevherCode(pirlantaArr, sadeArr, renkliTasArr);
    return result;
  }, [values]);

  useEffect(() => {
    const process = async () => {
      const result = await WorkOrderQueueApiService({ code: resultCode });
      setIsEmriCode(`${resultCode}-${result}`);
    };
    if (resultCode) {
      process();
    }
  }, [resultCode]);

  const lastItems = values.reduce<WorkOrderProductType[]>((acc, next) => {
    return [...acc, ...next.products];
  }, []);

  const totalPrice = lastItems.reduce<number>((acc, next) => {
    return next.price ? acc + next.price : acc;
  }, 0);

  const lastData: AddWorOrderType = {
    description,
    workorder_products: lastItems,
    product_temp_code: isEmriCode,
  };

  const addWorkOrder = async () => {
    const condition = lastData.workorder_products.some(
      (a: WorkOrderProductType) => a.type == "Sade",
    );
    if (!condition) {
      return toast.error("Üretimde En Az 1 Adet Sade Seçilmesi zorunludur!", {
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
    <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex w-full flex-col items-start justify-start border-b border-stroke pb-4 dark:border-strokedark">
        <div className="float-right flex w-full items-center justify-between">
          <h3 className="p-4 text-lg font-medium text-black dark:text-white">
            İş Emri Bilgileri
          </h3>
          <b className="mr-4 text-black dark:text-white">
            Mücevher Kodu : {isEmriCode}
          </b>
        </div>
        <hr />
        <div className="flex w-full flex-col gap-16 p-3">
          {UrunGruplari.map((item, index) => (
            <UrunGruplariModul setValues={setValues} item={item} key={index} />
          ))}
        </div>
        <div className="flex w-full flex-col items-end self-end p-3">
          <h2 className="h-full self-end text-xl dark:text-white">
            Toplam Malzeme Maliyeti :{" "}
            <span className="font-bold text-black underline dark:text-white">{`${formatToCurrency(totalPrice)} $`}</span>
          </h2>
          <div className="flex w-full flex-col items-start gap-2">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Üretim Açıklaması Giriniz
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Üretim Açıklaması Giriniz..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="flex items-center self-end p-3">
          <button
            type="button"
            onClick={async () => await addWorkOrder()}
            className="w-60 rounded-md bg-primary px-2 py-3 text-center text-white"
          >
            İLERİ
          </button>
        </div>
      </div>
    </div>
  );
}
