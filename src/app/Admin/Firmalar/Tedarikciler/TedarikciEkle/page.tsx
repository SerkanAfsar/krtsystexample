import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TedarikciDetayContainer from "@/Containers/TedarikciDetayContainer";

export default function TedarikciEkle() {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Tedarikçi Listesi",
            url: "/Admin/Firmalar/Tedarikciler/TedarikciListesi",
          },
        ]}
        pageName="Tedarikçi Ekle"
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
