import RenkliTasDetayContainer from "@/Containers/RenkliTasDetayContainer";
import { GetProductService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IRenkliTasType } from "../../../../../../../types/formTypes";
import { ProductType } from "../../../../../../../types/types";
import { notFound } from "next/navigation";

export default async function RenkliTaskGuncelle({
  params,
}: {
  params: { id: string };
}) {
  const result = await GetProductService({ id: Number(params.id) });
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
        <Breadcrumb pageName="Renkli Taş Güncelle" />
        <RenkliTasDetayContainer isAdd={false} renkliTasItemData={resultData} />
      </DefaultLayout>
    );
  }
  return notFound();
}

export const dynamic = "force-dynamic";
