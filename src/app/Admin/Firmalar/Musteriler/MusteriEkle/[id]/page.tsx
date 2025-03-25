import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { MusteriType } from "../../../../../../types/types";

import { notFound } from "next/navigation";
import MusteriDetayContainer from "@/Containers/MusteriDetayContainer";
import { GetMusteriService } from "@/Services/Customer.Service";

export default async function TedarikciEkle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const result: ResponseResult<MusteriType> = await GetMusteriService({
    id: Number(id),
  });

  if (result.success) {
    return (
      <DefaultLayout>
        <Breadcrumb
          pages={[
            {
              name: "Müşteri Listesi",
              url: "/Admin/Firmalar/Musteriler/MusteriListesi",
            },
          ]}
          pageName="Müşteri  Güncelle"
        />
        <MusteriDetayContainer
          isRedirect={true}
          isAdd={false}
          musteriItemData={result.data as MusteriType}
        />
      </DefaultLayout>
    );
  }
  return notFound();
}

export const dynamic = "force-dynamic";
