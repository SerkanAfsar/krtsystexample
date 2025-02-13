import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AtolyeListesiContainer from "@/Containers/AtolyeListesiContainer";

export default function AtolyeListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Atölye Listesi" />
      <AtolyeListesiContainer />
    </DefaultLayout>
  );
}
