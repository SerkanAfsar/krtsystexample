import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MusteriDetayContainer from "@/Containers/MusteriDetayContainer";

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

      <MusteriDetayContainer isAdd={true} musteriItemData={null} />
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
