import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const MucevherEkle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Yeni Mücevher Ekle " />
      {/* <MucevherDetayContainer /> */}
    </DefaultLayout>
  );
};

export default MucevherEkle;

export const dynamic = "force-dynamic";
