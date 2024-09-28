"use client";
import Link from "next/link";
import { useState } from "react";

export type TabSectionType = {
  colName: string;
  component: React.ReactNode;
};
export default function CustomTabs({
  tabs,
  productCode,
}: {
  tabs: TabSectionType[];
  productCode?: string;
}) {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = "text-primary border-primary";
  const inactiveClasses = "border-transparent";

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-6 flex items-center justify-between border-b border-stroke dark:border-strokedark">
        <div className=" flex flex-wrap gap-5 sm:gap-10">
          {tabs.map((item, index) => (
            <Link
              key={index}
              href="#"
              className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                openTab === index + 1 ? activeClasses : inactiveClasses
              }`}
              onClick={() => setOpenTab(index + 1)}
            >
              {item.colName}
            </Link>
          ))}
        </div>
        {productCode && (
          <span className="text-md font-bold text-black">{productCode}</span>
        )}
      </div>

      <div>
        {tabs.map((item, index) => (
          <div
            key={index}
            className={`leading-relaxed ${openTab === index + 1 ? "block" : "hidden"}`}
          >
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
}
