import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TedarikciDetayContainer from "@/Containers/TedarikciDetayContainer";
import { ResponseResult } from "../../../../../../types/responseTypes";
import { TedarikciType } from "../../../../../../types/types";
import { GetTedarikciService } from "@/Services/Supplier.Services";
import { notFound } from "next/navigation";

export default async function AtolyeEkle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const result: ResponseResult<TedarikciType> = await GetTedarikciService({
    id: Number(id),
  });
  if (result.success) {
    return (
      <DefaultLayout>
        <Breadcrumb
          pages={[
            {
              name: "Atolye Listesi",
              url: "/Admin/Firmalar/Atolyeler/AtolyeListesi",
            },
          ]}
          pageName="Atolye Güncelle"
        />
        <TedarikciDetayContainer
          isRedirect={true}
          isAdd={false}
          tedarikciItemData={result.data as TedarikciType}
        />
      </DefaultLayout>
    );
  }
  return notFound();
}

export const dynamic = "force-dynamic";
