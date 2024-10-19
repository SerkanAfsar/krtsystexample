"use client";

import MucevherDetaySectionOne from "@/components/Mucevher/MucevherDetaySectionOne";
import { AddMucevherExternalType } from "@/types/Mucevher";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MucevherDetayContainer from "./MucevherDetayContainer";

import { WorkOrderQueueApiService } from "@/ApiServices/WorkOrders.ApiService";
import { PostGemProductService } from "@/Services/Product.Services";
import { toast } from "react-toastify";
import { MucevherCode } from "@/utils/Mucevher.Utils";
import { formatToCurrency } from "@/utils";
import { SadeHasGramHesapla } from "@/utils/Sade.Utils";

export default function MucevherEkleContainer() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddMucevherExternalType>({});

  const onSubmit: SubmitHandler<AddMucevherExternalType> = async (data) => {
    if (activeStep == 0) {
      setActiveStep(1);
    } else {
      if (isValid) {
        const total_carat =
          [
            ...(data?.products?.renkliTas || []),
            ...(data?.products?.pirlanta || []),
          ].reduce((acc, next) => {
            return acc + Number(next.carat);
          }, 0) || 0;

        const total_number_of_stones =
          [
            ...(data?.products?.renkliTas || []),
            ...(data?.products?.pirlanta || []),
          ].reduce((acc, next) => {
            return acc + Number(next.adet);
          }, 0) || 0;

        const reqData: any = {
          ...data,
          code,
          model: data?.products?.sade?.[0]?.modelTuru || null,
          total_carat,
          entry_date: "01/01/2025",
          sale_date: "02/01/2025",
          total_number_of_stones,
          products: [
            ...(data?.products?.pirlanta || []),
            ...(data?.products?.renkliTas || []),
            ...(data?.products?.sade || []),
          ],
        };
        const response = await PostGemProductService({ body: reqData });

        if (response.statusCode == 200) {
          return toast.success("Mücevher Eklendi", { position: "top-right" });
        } else {
          return toast.error("Bir Hata Oluştu", { position: "top-right" });
        }
      }
    }
  };

  const [pirlanta, sade, renkliTas] = watch([
    "products.pirlanta",
    "products.sade",
    "products.renkliTas",
  ]);

  useEffect(() => {
    const resultCode = MucevherCode(pirlanta, sade, renkliTas);
    const process = async () => {
      const result = await WorkOrderQueueApiService({ code: resultCode });
      setCode(`${resultCode}-${result}`);
    };
    if (resultCode) {
      process();
    }
  }, [pirlanta, sade, renkliTas]);

  const [labor_cost, purchase_price] = watch(["labor_cost", "purchase_price"]);

  useEffect(() => {
    if (labor_cost && purchase_price) {
      setValue(
        "price_tag",
        formatToCurrency(Number(Number(labor_cost)) + Number(purchase_price)),
      );
    } else {
      setValue("price_tag", null);
    }
  }, [labor_cost, purchase_price, setValue]);

  const sadeProducts = watch("products.sade");

  const sadeProductsString = JSON.stringify(sadeProducts);

  useEffect(() => {
    if (sadeProducts) {
      for (let index = 0; index < sadeProducts.length; index++) {
        const { gram, ayar } = sadeProducts[index];

        if (gram) {
          setValue(
            `products.sade.${index}.hasGram`,
            SadeHasGramHesapla({ ayar: ayar as string, gram: gram as number }),
          );
        }
      }
      const { gram, ayar } = sadeProducts[0];
      if (gram && ayar) {
        setValue("simple", `${gram}gr ${ayar}k`);
      }
    }
  }, [sadeProductsString, sadeProducts, setValue]);

  const components: any[] = [
    <MucevherDetaySectionOne
      errors={errors}
      register={register}
      isEdit={false}
      key={0}
      setValue={setValue}
    />,
    <MucevherDetayContainer
      productList={null}
      isEdit={false}
      showTitle={false}
      key={1}
      errors={errors}
      register={register}
      setActiveStep={setActiveStep}
    />,
  ];
  return (
    <div className="mb-5 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex w-full flex-col items-start justify-start border-b border-stroke pb-4 dark:border-strokedark">
        <div className="float-right flex w-full items-center justify-between">
          <div></div>
          <b className="mr-4 text-black dark:text-white">
            Mücevher Kodu : {code}
          </b>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3"
        >
          {components[activeStep]}
        </form>
      </div>
    </div>
  );
}
