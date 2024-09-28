import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PirlantaDetayContainer from "@/Containers/PirlantaDetayContainer";
import { GetProductService } from "@/Services/Product.Services";
import { AddDiamondType } from "../../../../../../../types/formTypes";
import { ProductType } from "../../../../../../../types/types";
import { notFound } from "next/navigation";

const PirlantaGuncelle = async ({ params }: { params: { id: string } }) => {
  const result = await GetProductService({ id: Number(params.id) });
  if (result?.success) {
    const data = result.data as ProductType;
    const properties = data.properties;
    const product_certificate = data.product_certificate;
    const product_cost = data.product_cost;
    delete data.properties;
    delete data.product_certificate;
    delete data.product_cost;
    const resultData: AddDiamondType = {
      ...data,
      ...properties,
      ...product_certificate,
      ...product_cost,
    };
    return (
      <DefaultLayout>
        <Breadcrumb
          pages={[
            {
              name: "Pırlanta Stok Listesi",
              url: "/Admin/StokYonetimi/Pirlanta/PirlantaListesi",
            },
          ]}
          pageName="Pırlanta Güncelle"
        />
        <PirlantaDetayContainer isAdd={false} pirlantaItemData={resultData} />
      </DefaultLayout>
    );
  }
  return notFound();
};

export default PirlantaGuncelle;

export const dynamic = "force-dynamic";
