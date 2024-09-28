import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MusteriDetayContainer from "@/Containers/MusteriDetayContainer";
// import TedarikciDetayContainer from "@/Containers/TedarikciDetayContainer";

export default function TedarikciEkle() {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Müşteri Listesi",
            url: "/Admin/Firmalar/Musteriler/MusteriListesi",
          },
        ]}
        pageName="Müşteri Ekle"
      />
      {/* <TedarikciDetayContainer isAdd={true} tedarikciItemData={null} /> */}
      <MusteriDetayContainer isAdd={true} musteriItemData={null} />
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
