import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IsEmirleriListesiContainer from "@/Containers/IsEmirleriListesiContainer";

export default function UretimIsEmirleriListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Üretim İş Emirleri Listesi" />
      <IsEmirleriListesiContainer />
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
