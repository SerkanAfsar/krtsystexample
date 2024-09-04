import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MucevherDetayTabsContainer from "@/Containers/MucevherDetayTabsContainer";
import { GetGemProductService } from "@/Services/Product.Services";
import { MucevherDetayType } from "@/types/Mucevher";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const MucevherDetay = async ({ params }: { params: Params }) => {
  const result = await GetGemProductService({ product_id: Number(params.id) });

  if (!result.success) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Mücevher Bilgileri" />
        <div>
          {result.error && Array.isArray(result.error)
            ? result.error[0]
            : "Hata"}
        </div>
      </DefaultLayout>
    );
  }
  const data = result.data as MucevherDetayType;

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Mücevher Stok Listesi",
            url: "/Admin/StokYonetimi/Mucevher/MucevherStokListesi",
          },
        ]}
        pageName="Mücevher Bilgileri"
      />
      <MucevherDetayTabsContainer isEdit={true} data={data} />
    </DefaultLayout>
  );
};

export default MucevherDetay;

export const dynamic = "force-dynamic";
