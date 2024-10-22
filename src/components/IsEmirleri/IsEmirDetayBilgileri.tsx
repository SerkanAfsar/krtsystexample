import React from "react";

import CustomTabs, { TabSectionType } from "../CustomUI/CustomTabs";
import IsEmirleriLoglari from "./IsEmirLoglari";
import IsEmirleriDetayUrunleri from "./IsEmriDetayUrunleri";

export default function IsEmriDetayBilgileri({ id }: { id?: number }) {
  const sections: TabSectionType[] = [
    {
      colName: "Üretim Bilgileri",
      component: <IsEmirleriLoglari id={id as number} />,
    },
    {
      colName: "Üretim Ürünleri",
      component: <IsEmirleriDetayUrunleri id={id as number} />,
    },
  ];

  return <CustomTabs productCode={""} tabs={sections} />;
}
