import ECommerce from "@/components/Dashboard/E-commerce";
import Kurlar from "@/components/Kurlar";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DovizKurlari } from "@/utils/MockData";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
