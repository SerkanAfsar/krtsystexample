import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function MusteriListesi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Müşteri Listesi" />
      <div className="mb-5 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        Müşteri Listesi Ekranı Geliştirilmeye Devam Ediliyor...
      </div>
    </DefaultLayout>
  );
}
