import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SatisEkleContainer, {
  CustomSearchSelectType,
} from "@/Containers/SatisEkleContainer";
import { GetCustomersListForSalesService } from "@/Services/Customer.Service";
import { MusteriType } from "../../../../../types/types";

export type SatisItemType = {
  product_id: number;
  used_carat: number;
  sales_price: number;
  codeName?: string;
  hasCarat?: boolean;
};
export default async function SatisEklePage() {
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

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Satış Listesi",
            url: "/Admin/Satislar/SatisListesi",
          },
        ]}
        pageName="Yeni Satış Ekle "
      />
      <div className="flex w-full flex-col gap-4 bg-white p-6">
        <SatisEkleContainer customers={customers} />
      </div>
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
