import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MagazaDetayContainer from "../Containers/MagazaDetayContainer";

const SadeEklePage = async () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Mağaza Listesi",
            url: "/Admin/Magazalar/MagazaListesi",
          },
        ]}
        pageName="Mağaza Ekle"
      />
      <MagazaDetayContainer
        isAdd={true}
        isRedirect={true}
        magazaItemData={null}
      />
    </DefaultLayout>
  );
};

export default SadeEklePage;
