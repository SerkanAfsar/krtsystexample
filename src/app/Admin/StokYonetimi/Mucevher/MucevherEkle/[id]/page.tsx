import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MucevherDetayTabsContainer from "@/Containers/MucevherDetayTabsContainer";
import { GetGemProductService } from "@/Services/Product.Services";
import { MucevherDetayType } from "@/types/Mucevher";

type Params = {
  [key: string]: string;
};

const MucevherDetay = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; 
  const result = await GetGemProductService({ product_id: Number(id) });

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
