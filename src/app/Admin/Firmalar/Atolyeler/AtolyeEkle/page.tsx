import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TedarikciDetayContainer from "@/Containers/TedarikciDetayContainer";

export default function AtolyeEkle() {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Tedarikçi Listesi",
            url: "/Admin/Firmalar/Atolyeler/AtolyeListesi",
          },
        ]}
        pageName="Atolye Ekle"
      />
      <TedarikciDetayContainer
        isRedirect={true}
        isAdd={true}
        tedarikciItemData={null}
      />
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
