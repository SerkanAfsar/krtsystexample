import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MucevherDetayContainer, {
  MucevherDetayDataType,
} from "@/Containers/MucevherDetayContainer";
import { GetGemProductService } from "@/Services/Product.Services";
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
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Bilgileri" />
      <MucevherDetayContainer
        productList={result.data as MucevherDetayDataType[]}
        isEdit={true}
      />
    </DefaultLayout>
  );
};

export default MucevherDetay;

export const dynamic = "force-dynamic";
