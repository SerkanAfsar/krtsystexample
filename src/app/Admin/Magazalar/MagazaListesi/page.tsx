import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MagazaListesiContainer from "../Containers/MagazaListesiContainer";

export default function MagazaListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mağaza Listesi" />
      <MagazaListesiContainer />
    </DefaultLayout>
  );
}
