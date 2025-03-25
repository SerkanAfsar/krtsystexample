import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { GetMagazaService } from "@/Services/Magaza.Services";
import { MagazaType } from "@/types/Magaza";
import { ResponseResult } from "@/types/responseTypes";
import { notFound } from "next/navigation";
import MagazaDetayContainer from "../../Containers/MagazaDetayContainer";

export default async function TedarikciEkle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const result: ResponseResult<MagazaType> = await GetMagazaService({
    id: Number(id),
  });
  if (!result.success) {
    if (result.statusCode == 404) {
      return notFound();
    } else {
      throw new Error(result.error ? [0].toString() : "Hata");
    }
  }

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Mağaza Listesi",
            url: "/Admin/Magazalar/MagazaListesi",
          },
        ]}
        pageName="Mağaza Güncelle"
      />

      <MagazaDetayContainer
        isRedirect={true}
        isAdd={false}
        magazaItemData={result.data as MagazaType}
      />
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
