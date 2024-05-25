import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomForm from "@/components/CustomUI/CustomForm";
import { AddStoneFields } from "@/utils/MockData";
import { IDiamondType } from "@/types/formTypes";

const PirlantaEkle = () => {
  const diamondItem: IDiamondType = {};
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pırlanta Ekle" />

      <div className="grid grid-cols-none gap-9 ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Yeni Pırlanta / Taş Ekle
              </h3>
            </div>
            <CustomForm
              colsLenght={3}
              IFormInput={diamondItem}
              elements={AddStoneFields}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PirlantaEkle;
