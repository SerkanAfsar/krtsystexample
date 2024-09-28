import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MucevherEkleContainer from "@/Containers/MucevherEkleContainer";

const MucevherEkle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Mücevher Stok Listesi",
            url: "/Admin/StokYonetimi/Mucevher/MucevherStokListesi",
          },
        ]}
        pageName="Yeni Mücevher Ekle "
      />
      <MucevherEkleContainer />
    </DefaultLayout>
  );
};

export default MucevherEkle;

export const dynamic = "force-dynamic";
