"use client";
import UrunGruplariModul, {
  UrunGruplariModulType,
} from "@/components/IsEmirleri/UrunGruplariModul";
import {
  PirlantaModalHeaders,
  RenkliTasModalHeaders,
  SadeModalHeaders,
} from "../types/types";

import usePirlantaModalData from "@/hooks/ModalDataHooks/usePirlantaModalData";
import useRenkliTasModalData from "@/hooks/ModalDataHooks/useRenkliTasModalData";
import useSadeModalData from "@/hooks/ModalDataHooks/useSadeModalData";
import { useEffect, useState } from "react";
import { formatToCurrency } from "@/utils";
import {
  AddWorkOrderType,
  ProductItemsType,
  WorkOrderProductType,
} from "../types/WorkOrder.types";

import {
  AddWorkOrderService,
  GetWorkOderModels,
} from "@/Services/WorkOrder.Services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { WorkOrderQueueApiService } from "@/ApiServices/WorkOrders.ApiService";
import { MucevherCode } from "@/utils/Mucevher.Utils";

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
      { title: "İşlemler", accessor: "islemler" },
    ],
    title: "Pırlanta",
    modalHeaderColumns: PirlantaModalHeaders,
    tableFunction: usePirlantaModalData,
  },
];

export default function IsEmriContainer() {
  const router = useRouter();
  const [description, setDescription] = useState<string>("");
  const [isEmriCode, setIsEmriCode] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isWomanChecked, setIsWomanChecked] = useState<boolean>(false);
  const [isManChecked, setIsManChecked] = useState<boolean>(false);
  const [modelList, setModelList] = useState<{ name: string; id: number }[]>([]);
  const [model, setModel] = useState<{ name: string; id: number } | null>(null);
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

  const handleCheckboxChange = (type: "Kadın" | "Erkek", checked: boolean) => {
    if (type === "Kadın") {
      setIsWomanChecked(checked);
    } else if (type === "Erkek") {
      setIsManChecked(checked);
    }

    if (checked) {
      if (type === "Kadın" && isManChecked) {
        setGender("Both");
      } else if (type === "Erkek" && isWomanChecked) {
        setGender("Both");
      } else {
        setGender(type === "Kadın" ? "Woman" : "Man");
      }
    } else {
      if (type === "Kadın" && isManChecked) {
        setGender("Man");
      } else if (type === "Erkek" && isWomanChecked) {
        setGender("Woman");
      } else {
        setGender("");
      }
    }
  };

  useEffect(() => {
    GetWorkOderModels().then((resp) => {
      if (resp?.success && Array.isArray(resp.data)) {
        const modelData = resp.data.map((item: any) => ({
          name: item.name,
          id: item.id,
        }));
        setModelList(modelData);
      } else {
        console.log("err:", resp);
      }
    });
  }, []);
  useEffect(() => {
    const resultCode = MucevherCode(pirlantaArr, sadeArr, renkliTasArr);
    const process = async ({ resultCode }: { resultCode: string }) => {
      const result = await WorkOrderQueueApiService({ code: resultCode });
      setIsEmriCode(`${resultCode}-${result}`);
    };
    if (resultCode) {
      process({ resultCode });
    } else {
      setIsEmriCode("");
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

  const lastData: AddWorkOrderType = {
    model_type: model?.id ?? 0,
    total_product_cost: totalPrice.toString(),
    gender,
    description,
    workorder_products: lastItems,
    product_temp_code: isEmriCode,
    current_cost: null,
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
        `/Admin/IsEmirleri/UretimDuzenle/${result.data.id}?isFirst=true`,
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
            {/*<div className="float-right flex w-full items-center justify-between text-black text-sm font-medium border-b-2 py-1 border-stone-200">
            İş Emri ID: {isEmriCode}
        </div>*/}
            <div className="mt-10 flex w-full justify-between">
              {/* model kısmı */}
              <div className="flex w-1/4 flex-col gap-4">
                <label className="text-sm font-medium text-black dark:text-white">
                  Model Türü
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stone-400 bg-white px-3 py-2 text-black outline-none focus:border-primary dark:bg-boxdark dark:text-white dark:focus:border-primary"
                  defaultValue=""
                  onChange={(e) => {
                    const selectedModelId = e.target.value;
                    const selectedModel = modelList.find(
                      (item) => item.id === Number(selectedModelId),
                    );
                    if (selectedModel) {
                      setModel({
                        id: selectedModel.id,
                        name: selectedModel.name,
                      });
                    }
                  }}
                >
                  <option value="" disabled >
                    Model Türü Seçiniz...
                  </option>
                  {modelList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="ml-2 flex items-center gap-4">
                  <label className="flex items-center text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="mr-2"
                      value="Kadın"
                      checked={isWomanChecked}
                      onChange={(e) =>
                        handleCheckboxChange("Kadın", e.target.checked)
                      }
                    />{" "}
                    KADIN
                  </label>
                  <label className="flex items-center text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="mr-2"
                      value="Erkek"
                      checked={isManChecked}
                      onChange={(e) =>
                        handleCheckboxChange("Erkek", e.target.checked)
                      }
                    />{" "}
                    ERKEK
                  </label>
                </div>
              </div>
              {/* maliyet */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black dark:text-white">
                  Maliyetler
                </label>
                <label className="text-sm font-bold text-black dark:text-white">
                  Toplam Malzeme Maliyeti :{" "}
                  <span className="font-bold text-black underline dark:text-white">{`${formatToCurrency(totalPrice)} $`}</span>
                </label>
              </div>
              {/* açıklama */}
              <div className="flex w-1/2 flex-col gap-2">
                <label className="text-sm font-medium text-black dark:text-white">
                  Üretim Müdürü Açıklaması
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Üretim Müdürü Açıklaması..."
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
              <UrunGruplariModul
                setValues={setValues}
                item={item}
                model={model?.name}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between self-end p-3">
          {/* <button
            type="button"
            onClick={async () => {
              setValues([]);
              setDescription("");
              setIsEmriCode("");
            }}
            className="w-50 rounded-md bg-primary px-2 py-2 text-center text-white"
          >
            Temizle
          </button>
          */}
          <button
            type="button"
            onClick={async () => await addWorkOrder()}
            className="ml-5 w-40 rounded-md bg-primary px-2 py-2 text-center text-white"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
