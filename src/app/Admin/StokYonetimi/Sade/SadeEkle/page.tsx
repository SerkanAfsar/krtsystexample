import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddSadeFields, AddStoneFields } from "@/utils/MockData";
import { ISadeType } from "@/types/formTypes";

const ProFormLayout = () => {
  const sadeType: ISadeType = {};
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Ekle" />

      <div className="grid grid-cols-none gap-9 ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Yeni Sade Ekle
              </h3>
            </div>
            {/* <CustomForm IFormInput={sadeType} elements={AddSadeFields} /> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProFormLayout;
