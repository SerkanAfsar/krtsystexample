import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AltinKurlari, DovizKurlari } from "@/utils/MockData";
import Kurlar from "@/components/Kurlar";

export default function KurlarSayfasi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Kurlar" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Kurlar className="col-span-2" item={DovizKurlari} />
        <Kurlar className="col-span-2" item={AltinKurlari} />
      </div>
    </DefaultLayout>
  );
}
