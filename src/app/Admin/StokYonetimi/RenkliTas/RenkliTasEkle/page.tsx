import RenkliTasDetayContainer from "@/Containers/RenkliTasDetayContainer";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function RenkliTaskEkle() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Renkli Taş Ekle" />
      <RenkliTasDetayContainer isAdd={true} renkliTasItemData={null} />
    </DefaultLayout>
  );
}
