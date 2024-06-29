import SadeDetayContainer from "@/Containers/SadeDetayContainer";
import { GetProductService } from "@/Services/Product.Services";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { notFound } from "next/navigation";

const ProFormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sade Ekle" />
      <SadeDetayContainer isAdd={true} sadeItemData={null} />
    </DefaultLayout>
  );
};

export default ProFormLayout;
