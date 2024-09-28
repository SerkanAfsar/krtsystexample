import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TedarikciDetayContainer from "@/Containers/TedarikciDetayContainer";
import { ResponseResult } from "../../../../../../../types/responseTypes";
import { TedarikciType } from "../../../../../../../types/types";
import { GetTedarikciService } from "@/Services/Supplier.Services";
import { notFound } from "next/navigation";

export default async function TedarikciEkle({
  params,
}: {
  params: { id: string };
}) {
  const result: ResponseResult<TedarikciType> = await GetTedarikciService({
    id: Number(params.id),
  });
  if (result.success) {
    return (
      <DefaultLayout>
        <Breadcrumb
          pages={[
            {
              name: "Tedarikçi Listesi",
              url: "/Admin/Firmalar/Tedarikciler/TedarikciListesi",
            },
          ]}
          pageName="Tedarikçi Güncelle"
        />
        <TedarikciDetayContainer
          isAdd={false}
          tedarikciItemData={result.data as TedarikciType}
        />
      </DefaultLayout>
    );
  }
  return notFound();
}

export const dynamic = "force-dynamic";
