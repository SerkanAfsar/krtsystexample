"use client";
import { SalePayment, SaleType } from "../../../../../types/Satis";
import { useFieldArray, useForm } from "react-hook-form";
import SatisDetayUrunler from "../Components/SatisDetayUrunler";
import SatisDetayMusteri from "../Components/SatisDetayMusteri";
import SatisDetayOdeme from "../Components/SatisDetayOdeme";

export type CustomSearchSelectType = {
  label: string;
  value: number;
};

export default function SatisEkleDetayContainer({
  customers,
}: {
  customers: CustomSearchSelectType[];
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm<SaleType>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: paymentFields,
    append: paymentAppend,
    remove: paymentRemove,
  } = useFieldArray({
    control,
    name: "payments",
  });

  const [products, payments] = watch(["products", "payments"]);

  const toplamTutar =
    products?.reduce((acc, next) => {
      return (
        acc +
        Number(
          next.total_cost?.toString().replace(".", "").replace(",", ".") || 0,
        )
      );
    }, 0) || 0;

  const toplamMaliyet =
    products?.reduce((acc, next) => {
      return (
        acc +
        Number(
          next.sales_price?.toString().replace(".", "").replace(",", ".") || 0,
        )
      );
    }, 0) || 0;

  const toplamOdenenTutar =
    payments?.reduce((acc: number, next: SalePayment) => {
      return (
        acc +
        Number(
          next.payment_price?.toString().replace(".", "").replace(",", ".") ||
            0,
        )
      );
    }, 0) || 0;

  const toplamKalanTutar = Number(toplamMaliyet - toplamOdenenTutar).toFixed(2);

  return (
    <>
      <SatisDetayMusteri setValue={setValue} customers={customers} />
      <SatisDetayUrunler
        append={append}
        remove={remove}
        fields={fields}
        register={register}
        toplamTutar={toplamTutar}
        toplamMaliyet={toplamMaliyet}
        products={products}
      />
      <SatisDetayOdeme
        fields={paymentFields}
        append={paymentAppend}
        remove={paymentRemove}
        register={register}
        setValue={setValue}
        toplamOdenenTutar={toplamOdenenTutar}
        toplamKalanTutar={toplamKalanTutar}
        toplamMaliyet={toplamMaliyet}
      />
    </>
  );
}
