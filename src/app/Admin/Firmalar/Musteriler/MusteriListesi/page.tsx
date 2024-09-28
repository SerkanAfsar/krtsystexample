import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MusteriListesiContainer from "@/Containers/MusteriListesiContainer";

export default function TedarikciListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Müşteri Listesi" />
      <MusteriListesiContainer />
    </DefaultLayout>
  );
}
