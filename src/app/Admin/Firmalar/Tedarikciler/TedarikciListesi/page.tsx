import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import TedarikciListesiContainer from "@/Containers/TedarikciListesiContainer";

export default function TedarikciListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tedarikçi Listesi" />
      <TedarikciListesiContainer />
    </DefaultLayout>
  );
}
