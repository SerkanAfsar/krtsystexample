import RenkliTasDetayContainer from "@/Containers/RenkliTasDetayContainer";
import { GetProductService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IRenkliTasType } from "../../../../../../types/formTypes";
import { ProductType } from "../../../../../../types/types";
import { notFound } from "next/navigation";

export default async function RenkliTaskGuncelle({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; 
  const result = await GetProductService({ id: Number(id) });
  if (result?.success) {
    const data = result.data as ProductType;
    const properties = data.properties;
    delete data.properties;
    const resultData: IRenkliTasType = {
      ...data,
      ...properties,
    };
    return (
      <DefaultLayout>
        <Breadcrumb
          pages={[
            {
              name: "Renkli Taş Stok Listesi",
              url: "/Admin/StokYonetimi/RenkliTas/RenkliTasListesi",
            },
          ]}
          pageName="Renkli Taş Güncelle"
        />
        <RenkliTasDetayContainer isAdd={false} renkliTasItemData={resultData} />
      </DefaultLayout>
    );
  }
  return notFound();
}

export const dynamic = "force-dynamic";
