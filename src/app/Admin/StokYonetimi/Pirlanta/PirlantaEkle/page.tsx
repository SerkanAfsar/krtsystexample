import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PirlantaDetayContainer from "@/Containers/PirlantaDetayContainer";

const PirlantaEkle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pırlanta Ekle" />
      <PirlantaDetayContainer isAdd={true} pirlantaItemData={null} />
    </DefaultLayout>
  );
};

export default PirlantaEkle;
