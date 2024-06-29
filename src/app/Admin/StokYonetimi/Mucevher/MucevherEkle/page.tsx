import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function MucevherEkle() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mücevher Ekle" />
      <div className="grid grid-cols-none gap-9 ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Mücevher Ekle
              </h3>
            </div>
            {/* <CustomForm IFormInput={sadeType} elements={AddSadeFields} /> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
