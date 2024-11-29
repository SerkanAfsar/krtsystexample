import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { GetCustomersListForSalesService } from "@/Services/Customer.Service";

import SatisEkleDetayContainer, {
  CustomSearchSelectType,
} from "../../Containers/SatisEkleDetayContainer";
import { MusteriType } from "@/types/types";
import {
  GetRefundedProductList,
  GetSimpleSatisById,
} from "@/Services/Satis.Services";
import { SaleType, SimpleSaleType } from "@/types/Satis";
import { ProductTypesIntl } from "@/utils";

export type SatisItemType = {
  product_id: number;
  used_carat: number;
  sales_price: number;
  codeName?: string;
  hasCarat?: boolean;
};
export default async function SatisEklePage({ params: { id } }: any) {
  const musteriResult = await GetCustomersListForSalesService({
    search: undefined,
  });
  if (!musteriResult.success) {
    throw new Error(musteriResult.error ? musteriResult?.error[0] : "Hata");
  }

  const musteriResultData = musteriResult.data as MusteriType[];
  const customers: CustomSearchSelectType[] =
    musteriResultData?.map((item: MusteriType) => ({
      label: item.name as string,
      value: item.id as number,
    })) || [];

  const satisResult = await GetSimpleSatisById({ id: Number(id) });

  if (!satisResult.success) {
    throw new Error(satisResult.error ? satisResult?.error[0] : "Hata");
  }

  const arr = satisResult.data as SimpleSaleType[];
  const data = arr[0];

  const refundedProducts = await GetRefundedProductList({
    customer_order_id: Number(id),
  });

  if (!refundedProducts.success) {
    throw new Error(
      refundedProducts.error ? refundedProducts?.error[0] : "Hata",
    );
  }

  const refundedProductIdList = [...(refundedProducts?.data as any[])].map(
    (item: any) => {
      return item?.product?.pk as number;
    },
  );

  const initialData: SaleType = {
    payments: Object.entries(data.payment_details).map(([key, value]) => ({
      payment_type: key as "Nakit" | "Kredi Kartı",
      payment_price: Number(value),
      isExist: true,
    })),
    products: data.products.map((item) => ({
      sales_price: Number(item.sales_price),
      used_carat: item.used_carat,
      total_cost: Number(item.product.total_cost),
      code: item.product.code as string,
      product_id: item.product.pk as number,
      type: ProductTypesIntl(
        item.product.type as "Diamond" | "Simple" | "ColoredStone" | "Gem",
      ),
    })),
    customer_id: data.customer_id,
    total_nonpayed: Number(data.total_remaining_amount),
    total_payment: Number(data.total_paid_amount),
  };

  const selectedCustomer = {
    value: data.customer_id,
    label: data.customer_name,
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Satış Listesi",
            url: "/Admin/Satislar/SatisListesi",
          },
        ]}
        pageName="Satış Detay "
      />
      <div className="flex w-full flex-col gap-4 ">
        <SatisEkleDetayContainer
          initialData={initialData}
          customers={customers}
          isEdit={true}
          id={id}
          refundedProductIdList={refundedProductIdList}
          selectedCustomer={selectedCustomer}
        />
      </div>
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
