import SadeDetayContainer from "@/Containers/SadeDetayContainer";
import { GetProductService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ProductType } from "../../../../../../../types/types";
import { notFound } from "next/navigation";

export default async function SadeDetay({
  params,
}: {
  params: { id: string };
}) {
  const result = await GetProductService({ id: Number(params.id) });
  if (result.success) {
    const data = result.data as ProductType;
    const props = data.properties;
    delete data.properties;
    const realData = { ...data, ...props };

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Sade Güncelle" />
        <SadeDetayContainer isAdd={false} sadeItemData={realData} />
      </DefaultLayout>
    );
  } else {
    return notFound();
  }
}

export const dynamic = "force-dynamic";
