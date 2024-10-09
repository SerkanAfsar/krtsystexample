import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Kurlar from "@/components/Kurlar";

export default function KurlarSayfasi() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Kurlar" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Kurlar
          className="col-span-2"
          apiUrl="/api/kurlar/doviz"
          title="Döviz Kurları"
          key={"0"}
          subTitle="Döviz"
        />
        <Kurlar
          className="col-span-2"
          apiUrl="/api/kurlar/altin"
          title="Altın Kurları"
          key={"1"}
          subTitle="Altın"
        />
      </div>
    </DefaultLayout>
  );
}
