import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import IsEmriContainer from "@/Containers/IsEmriContainer";

const UretimIsEmriEkle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Üretim İş Emirleri Listesi",
            url: "/Admin/IsEmirleri/UretimIsEmirleriListesi",
          },
        ]}
        pageName="Yeni İş Emri "
      />
      <IsEmriContainer />
    </DefaultLayout>
  );
};

export default UretimIsEmriEkle;

export const dynamic = "force-dynamic";
