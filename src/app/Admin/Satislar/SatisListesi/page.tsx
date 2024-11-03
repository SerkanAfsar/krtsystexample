import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SatisListesiContainer from "../Containers/SatisListesiContainer";

export default function SatisListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Satış Listesi" />
      <SatisListesiContainer />
    </DefaultLayout>
  );
}
