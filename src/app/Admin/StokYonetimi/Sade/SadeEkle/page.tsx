import SadeDetayContainer from "@/Containers/SadeDetayContainer";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getGramAltinKuru, getDolarKuru } from "@/utils/Sade.Utils";

const SadeEklePage = async () => {
  const gramAltiKuru = await getGramAltinKuru();
  const dolarKuru = await getDolarKuru();

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Sade Stok Listesi",
            url: "/Admin/StokYonetimi/Sade/SadeStokListesi",
          },
        ]}
        pageName="Sade Ekle"
      />
      <SadeDetayContainer
        isAdd={true}
        gramAltinKur={gramAltiKuru}
        dolarKuru={dolarKuru}
        sadeItemData={null}
      />
    </DefaultLayout>
  );
};

export default SadeEklePage;
