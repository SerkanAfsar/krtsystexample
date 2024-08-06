import SadeDetayContainer from "@/Containers/SadeDetayContainer";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ProFormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Ekle" />
      <SadeDetayContainer isAdd={true} sadeItemData={null} />
    </DefaultLayout>
  );
};

export default ProFormLayout;
