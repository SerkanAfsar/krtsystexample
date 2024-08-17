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
    let code = "";
    if (pirlantaArr && pirlantaArr?.length > 0 && renkliTasArr?.length == 0) {
      code = "D";
    }
    if (
      pirlantaArr &&
      pirlantaArr.length > 0 &&
      renkliTasArr &&
      renkliTasArr.length > 0
    ) {
      code = "M";
    }
    if (
      pirlantaArr &&
      pirlantaArr.length == 0 &&
      renkliTasArr &&
      renkliTasArr.length > 0
    ) {
      code = "M";
    }
    if (
      pirlantaArr &&
      pirlantaArr.length == 0 &&
      renkliTasArr &&
      renkliTasArr.length == 1
    ) {
      const item = renkliTasArr[0]?.type;
      code = `${item}`;
    }
    if (sadeArr && sadeArr.length > 0) {
      const item = sadeArr[0];
      code += item?.ayar;
      code += item?.modelTuru;
    }
    return code;
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
          <b className="mr-4 text-black">Mücevher Kodu : {isEmriCode}</b>
        </div>
        <hr />
        <div className="flex w-full flex-col gap-16 p-3">
          {UrunGruplari.map((item, index) => (
            <UrunGruplariModul setValues={setValues} item={item} key={index} />
          ))}
        </div>
        <div className="flex w-full flex-col items-end self-end p-3">
          <h2 className="h-full self-end text-xl">
            Toplam Malzeme Maliyeti :{" "}
            <span className="font-bold text-[red] underline">{`${formatToCurrency(totalPrice)} $`}</span>
          </h2>
          <div className="flex w-full flex-col items-start gap-2">
            <label className="font-bold text-black">
              Üretim Açıklaması Giriniz
            </label>
            <textarea
              cols={10}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" w-full rounded-md border border-[#ccc] px-3 py-2 text-black"
              placeholder="Üretim Açıklaması Giriniz..."
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
