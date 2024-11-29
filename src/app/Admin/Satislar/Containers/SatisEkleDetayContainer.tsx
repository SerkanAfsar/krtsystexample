"use client";

import {
  AddSatisService,
  SaleMakePaymentEdit,
  UpdateSatisService,
} from "@/Services/Satis.Services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import {
  SalePayment,
  SaleType,
  SaleTypeFormResult,
  UpdateSaleService,
} from "@/types/Satis";
import SatisDetayMusteri from "../SatisEkle/Components/SatisDetayMusteri";
import SatisDetayUrunler from "../SatisEkle/Components/SatisDetayUrunler";
import SatisDetayOdeme from "../SatisEkle/Components/SatisDetayOdeme";
import { cn, stringToMoney } from "@/utils";
import SatisDetayIade from "../SatisEkle/Components/SatisDetayIade";
import { useState } from "react";

export type CustomSearchSelectType = {
  label: string;
  value: number;
};

export default function SatisEkleDetayContainer({
  customers,
  initialData,
  isEdit = false,
  id,
  refundedProductIdList,
  selectedCustomer,
}: {
  customers: CustomSearchSelectType[];
  initialData?: SaleType;
  isEdit?: boolean;
  id?: number;
  refundedProductIdList?: number[];
  selectedCustomer?: CustomSearchSelectType;
}) {
  const router = useRouter();
  const [editIadeProductIdList, setEditIadeProductIdList] = useState<number[]>(
    [],
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<SaleType>({ defaultValues: initialData ?? {} });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: refundFields,
    append: refundAppend,
    remove: refundRemove,
  } = useFieldArray({
    control,
    name: "refund_details",
  });

  const {
    fields: paymentFields,
    append: paymentAppend,
    remove: paymentRemove,
  } = useFieldArray({
    control,
    name: "payments",
  });

  const [products, payments, refunds] = watch([
    "products",
    "payments",
    "refund_details",
  ]);

  const toplamTutar =
    products?.reduce((acc: any, next: any) => {
      return acc + Number(next.total_cost || 0);
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
  const toplamKarat =
    products?.reduce((acc: any, next: any) => {
      return acc + Number(next.used_carat);
    }, 0) || 0;

  const toplamKalanTutar = Number(toplamMaliyet - toplamOdenenTutar).toFixed(2);

  // const toplamEtiketFiyati =
  //   products?.reduce((acc: any, next: any) => {
  //     return (
  //       acc +
  //       Number(
  //         next.sales_price?.toString().replace(".", "").replace(",", ".") || 0,
  //       ) *
  //         4.55
  //     );
  //   }, 0) || 0;

  const onSubmit = async () => {
    const data = getValues();
    if (isEdit) {
      const toplamIade = data.refund_details?.reduce<number>(
        (acc: number, next: any) => {
          return acc + stringToMoney(next.payment_price || 0);
        },
        0,
      );

      if (Number(toplamIade) > toplamMaliyet) {
        return toast.error("İade Toplam Tutardan Fazla", {
          position: "top-right",
        });
      }

      const requestData: UpdateSaleService = {
        customer_order_id: Number(id),
        products: editIadeProductIdList.map((item) => ({
          product_id: Number(item),
        })),
        refund_details: data.refund_details?.reduce((acc: any, next: any) => {
          return {
            ...acc,
            [next.payment_type]: stringToMoney(next.payment_price),
          };
        }, {}),
      };

      const response = await UpdateSatisService({ data: requestData });

      const paymentBody: any = {
        customer_order_id: Number(id),
        payment_details:
          data.payments
            .filter((a) => a.isExist == false)
            .reduce((acc: any, next: any) => {
              return {
                ...acc,
                [next.payment_type]: stringToMoney(next.payment_price),
              };
            }, {}) || [],
      };

      const paymentResponse = await SaleMakePaymentEdit({
        data: paymentBody,
      });

      if (response.success && paymentResponse.success) {
        toast.warning("Satış Güncellendi", { position: "top-right" });
        return router.push("/Admin/Satislar/SatisListesi");
      } else {
        return toast.error(
          response.error || paymentResponse.error?.at(0) || "Hata",
          {
            position: "top-right",
          },
        );
      }
    } else {
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
        total: stringToMoney(toplamTutar),
        total_paid_amount: toplamOdenenTutar,
        products: data.products.map((item: any) => ({
          ...item,
          sales_price: stringToMoney(item.sales_price),
        })),
        payment_details: data.payments.reduce((acc: any, next: any) => {
          return {
            ...acc,
            [next.payment_type]: stringToMoney(next.payment_price),
          };
        }, {}),
      };
      const response = await AddSatisService({ data: requestData });

      if (response.success) {
        toast.success("Satiş Eklendi", { position: "top-right" });
        return router.push("/Admin/Satislar/SatisListesi");
      } else {
        return toast.error(response.error?.at(0) || "Hata", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      <SatisDetayMusteri
        isEdit={isEdit}
        setValue={setValue}
        customers={customers}
        selectedVal={selectedCustomer}
      />
      <SatisDetayUrunler
        append={append}
        remove={remove}
        fields={fields}
        register={register}
        toplamTutar={toplamTutar}
        toplamMaliyet={toplamMaliyet}
        products={products}
        toplamKarat={toplamKarat}
        isEdit={isEdit}
        editIadeProductIdList={editIadeProductIdList}
        setEditIadeProductIdList={setEditIadeProductIdList}
        refundedProductIdList={refundedProductIdList}
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
        isEdit={isEdit}
      />
      {isEdit && (
        <SatisDetayIade
          append={refundAppend}
          register={register}
          remove={refundRemove}
          setValue={setValue}
          fields={refundFields}
        />
      )}
      <button
        type="button"
        onClick={async () => await onSubmit()}
        className={cn(
          "mr-6 mt-3 w-[260px] self-end rounded-md  p-3 font-bold text-white",
          isEdit ? "bg-warning" : "bg-success",
        )}
      >
        {isEdit ? "Satış Güncelle" : "Satış Kaydet"}
      </button>
    </>
  );
}
