import RenkliTasDetayContainer from "@/Containers/RenkliTasDetayContainer";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function RenkliTaskEkle() {
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Renkli Taş Stok Listesi",
            url: "/Admin/StokYonetimi/RenkliTas/RenkliTasListesi",
          },
        ]}
        pageName="Renkli Taş Ekle"
      />
      <RenkliTasDetayContainer isAdd={true} renkliTasItemData={null} />
    </DefaultLayout>
  );
}

export const dynamic = "force-dynamic";
