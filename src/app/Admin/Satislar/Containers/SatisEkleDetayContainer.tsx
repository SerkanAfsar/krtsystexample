"use client";

import { AddSatisService } from "@/Services/Satis.Services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { SalePayment, SaleType, SaleTypeFormResult } from "@/types/Satis";
import SatisDetayMusteri from "../SatisEkle/Components/SatisDetayMusteri";
import SatisDetayUrunler from "../SatisEkle/Components/SatisDetayUrunler";
import SatisDetayOdeme from "../SatisEkle/Components/SatisDetayOdeme";

export type CustomSearchSelectType = {
  label: string;
  value: number;
};

export default function SatisEkleDetayContainer({
  customers,
}: {
  customers: CustomSearchSelectType[];
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
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
    products?.reduce((acc: any, next: any) => {
      return (
        acc +
        Number(
          next.total_cost?.toString().replace(".", "").replace(",", ".") || 0,
        )
      );
    }, 0) || 0;

  const toplamMaliyet =
    products?.reduce((acc: any, next: any) => {
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

  const onSubmit = async () => {
    const data = getValues();
    if (!data.customer_id) {
      return toast.error("Müşteri Seçiniz", {
        position: "top-right",
      });
    }
    if (data.products.length == 0) {
      return toast.error("Ürün Seçiniz", {
        position: "top-right",
      });
    }
    if (data.products.some((a) => !a.sales_price)) {
      return toast.error("Ürün Satış Fiyatlarını Eksiksiz Giriniz", {
        position: "top-right",
      });
    }
    if (
      data.payments.length > 0 &&
      data.payments.some((a) => !a.payment_price)
    ) {
      return toast.error("Ödeme Tutarları Eksiksiz Giriniz", {
        position: "top-right",
      });
    }
    const requestData: SaleTypeFormResult = {
      customer_id: data.customer_id,
      total_remaining_amount: Number(toplamKalanTutar),
      total: toplamTutar,
      total_paid_amount: toplamOdenenTutar,
      products: data.products.map((item: any) => ({
        ...item,
        sales_price: Number(
          item.sales_price.toString().replace(".", "").replace(",", "."),
        ),
      })),
      payment_details: data.payments.reduce((acc: any, next: any) => {
        return { ...acc, [next.payment_type]: next.payment_price };
      }, {}),
    };
    const response = await AddSatisService({ data: requestData });
    if (response.success) {
      toast.success("Satiş Eklendi", { position: "top-right" });
      return router.push("/Admin/Satislar/SatisListesi");
    } else {
      return toast.error("Hata", { position: "top-right" });
    }
  };

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
        onSubmit={onSubmit}
      />
    </>
  );
}
