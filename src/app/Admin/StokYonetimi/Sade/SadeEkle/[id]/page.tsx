import SadeDetayContainer from "@/Containers/SadeDetayContainer";
import { GetProductService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ProductType } from "../../../../../../types/types";
import { notFound } from "next/navigation";
import { getGramAltinKuru, getDolarKuru } from "@/utils/Sade.Utils";

export default async function SadeDetay({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; 
  const result = await GetProductService({ id: Number(id) });
  if (result?.success) {
    const data = result.data as ProductType;

    const gramAltiKuru = await getGramAltinKuru();
    const dolarKuru = await getDolarKuru();

    const props = data.properties;
    delete data.properties;
    const realData = { ...data, ...props };

    return (
      <DefaultLayout>
        <Breadcrumb
          pages={[
            {
              name: "Sade Stok Listesi",
              url: "/Admin/StokYonetimi/Sade/SadeStokListesi",
            },
          ]}
          pageName="Sade Güncelle"
        />
        <SadeDetayContainer
          gramAltinKur={gramAltiKuru}
          isAdd={false}
          sadeItemData={realData}
          dolarKuru={dolarKuru}
        />
      </DefaultLayout>
    );
  } else {
    return notFound();
  }
}

export const dynamic = "force-dynamic";
