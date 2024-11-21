"use client";

import MucevherDetaySectionOne from "@/components/Mucevher/MucevherDetaySectionOne";
import { AddMucevherExternalType } from "@/types/Mucevher";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import MucevherDetayContainer from "./MucevherDetayContainer";

import { WorkOrderQueueApiService } from "@/ApiServices/WorkOrders.ApiService";
import { PostGemProductService } from "@/Services/Product.Services";
import { toast } from "react-toastify";
import { MucevherCode } from "@/utils/Mucevher.Utils";
import { stringToMoney } from "@/utils";
import { SadeHasGramHesapla } from "@/utils/Sade.Utils";

export default function MucevherEkleContainer() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm<AddMucevherExternalType>({});

  const {
    fields: fieldsPirlanta,
    append: appendPirlanta,
    remove: removePirlanta,
  } = useFieldArray({
    control,
    name: "products.pirlanta",
  });

  const {
    fields: fieldsRenkliTas,
    append: appendRenkliTas,
    remove: removeRenkliTas,
  } = useFieldArray({
    control,
    name: "products.renkliTas",
  });

  const {
    fields: fieldsSade,
    append: appendSade,
    remove: removeSade,
  } = useFieldArray({
    control,
    name: "products.sade",
  });

  const onSubmit: SubmitHandler<AddMucevherExternalType> = async (data) => {
    if (activeStep == 0) {
      setActiveStep(1);
    } else {
      if (isValid) {
        if (!sade.length) {
          return toast.error("Sade Eklemeden Mücevher Ekleyemezsiniz!", {
            position: "top-right",
          });
        }
        const total_carat =
          [
            ...(data?.products?.renkliTas || []),
            ...(data?.products?.pirlanta || []),
          ].reduce((acc, next) => {
            return acc + Number(next?.carat || 0);
          }, 0) || 0;

        const total_number_of_stones =
          [
            ...(data?.products?.renkliTas || []),
            ...(data?.products?.pirlanta || []),
          ].reduce((acc, next) => {
            return acc + Number(next?.adet || 0);
          }, 0) || 0;

        const reqData: any = {
          ...data,
          code,
          store_id: Number(data.store_id),
          price_tag: stringToMoney(priceTag.toString()),
          model: data?.products?.sade?.[0]?.modelTuru || null,
          total_carat: Number(total_carat.toFixed(3)),
          entry_date: "01/01/2025",
          sale_date: "02/01/2025",
          total_number_of_stones,
          purchase_price: stringToMoney(purchase_price.toString()),
          labor_cost: stringToMoney(labor_cost.toString()),
          products: [
            ...(data?.products?.pirlanta?.map((item) => ({
              ...item,
              fiyat: stringToMoney(item.fiyat as string),
            })) || []),
            ...(data?.products?.renkliTas?.map((item) => ({
              ...item,
              fiyat: stringToMoney(item.fiyat as string),
            })) || []),
            ...(data?.products?.sade?.map((item) => ({
              ...item,
              fiyat: stringToMoney(item.fiyat as string),
            })) || []),
          ],
        };

        const response = await PostGemProductService({ body: reqData });

        if (response.statusCode == 200) {
          return toast.success("Mücevher Eklendi", { position: "top-right" });
        } else {
          return toast.error(
            response.error ? response.error.at(0) : "Bir Hata Oluştu",
            {
              position: "top-right",
            },
          );
        }
      }
    }
  };

  const [pirlanta, sade, renkliTas] = watch([
    "products.pirlanta",
    "products.sade",
    "products.renkliTas",
  ]);

  const { ayar, modelTuru } = sade?.length ? sade[0] : {};
  const { renkliTas: type } = renkliTas?.length ? renkliTas[0] : {};

  const isCondition = pirlanta?.some((a) => a.renk == "BLACK");

  useEffect(() => {
    const resultCode = MucevherCode(pirlanta, sade, renkliTas);
    const process = async () => {
      const result = await WorkOrderQueueApiService({ code: resultCode });
      setCode(`${resultCode}-${result}`);
    };
    if (resultCode) {
      process();
    } else {
      setCode("");
    }
  }, [pirlanta?.length, ayar, modelTuru, renkliTas?.length, type, isCondition]);

  const [labor_cost, purchase_price] = watch(["labor_cost", "purchase_price"]);

  const priceTag =
    stringToMoney(labor_cost?.toString()) +
    stringToMoney(purchase_price?.toString());

  const sadeProducts = watch("products.sade");
  const sadeProductsString = JSON.stringify(sadeProducts);

  useEffect(() => {
    if (sadeProducts && sadeProducts[0]) {
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
      getValues={getValues}
      priceTag={priceTag}
      labor_cost={labor_cost}
      purchase_price={purchase_price}
    />,
    <MucevherDetayContainer
      isEdit={false}
      showTitle={false}
      productList={null}
      key={1}
      fieldsPirlanta={fieldsPirlanta}
      appendPirlanta={appendPirlanta}
      removePirlanta={removePirlanta}
      fieldsRenkliTas={fieldsRenkliTas}
      appendRenkliTas={appendRenkliTas}
      removeRenkliTas={removeRenkliTas}
      fieldsSade={fieldsSade}
      appendSade={appendSade}
      removeSade={removeSade}
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
