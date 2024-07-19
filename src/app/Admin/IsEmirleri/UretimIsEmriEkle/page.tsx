import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import IsEmriContainer from "@/Containers/IsEmriContainer";

const UretimIsEmriEkle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Yeni İş Emri " />
      <IsEmriContainer />
    </DefaultLayout>
  );
};

export default UretimIsEmriEkle;
