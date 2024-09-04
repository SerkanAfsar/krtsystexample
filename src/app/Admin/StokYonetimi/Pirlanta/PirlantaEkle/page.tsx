import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PirlantaDetayContainer from "@/Containers/PirlantaDetayContainer";

const PirlantaEkle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Pırlanta Stok Listesi",
            url: "/Admin/StokYonetimi/Pirlanta/PirlantaListesi",
          },
        ]}
        pageName="Pırlanta Ekle"
      />
      <PirlantaDetayContainer isAdd={true} pirlantaItemData={null} />
    </DefaultLayout>
  );
};

export default PirlantaEkle;
