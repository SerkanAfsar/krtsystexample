import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTabs, { TabSectionType } from "@/components/CustomUI/CustomTabs";
import IsEmirDetayLoglari from "@/components/IsEmirleri/IsEmirDetayLoglari";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MucevherDetaySectionOne from "@/components/Mucevher/MucevherDetaySectionOne";
import MucevherDetayContainer, {
  MucevherDetayDataType,
} from "@/Containers/MucevherDetayContainer";
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

  const sections: TabSectionType[] = [
    {
      colName: "Mücevher",
      component: <MucevherDetaySectionOne />,
    },
    {
      colName: "Malzemeler",
      component: (
        <MucevherDetayContainer
          productList={data.inside_products as MucevherDetayDataType[]}
          isEdit={true}
        />
      ),
    },
    {
      colName: "İşçilik",
      component: <IsEmirDetayLoglari workOrderLogs={data.work_order_logs} />,
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Bilgileri" />
      <CustomTabs
        productCode={`Mücevher Kodu : ${data.product_code}`}
        tabs={sections}
      />
    </DefaultLayout>
  );
};

export default MucevherDetay;

export const dynamic = "force-dynamic";
