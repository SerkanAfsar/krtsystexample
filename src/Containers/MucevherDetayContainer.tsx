"use client";

import MucevherSadeSection from "@/components/Mucevher/MucevherSadeSection";
import { ProductType } from "../../types/types";

import React from "react";
import MucevherPirlantaSection from "@/components/Mucevher/MucevherPirlantaSection";
import MucevherRenkliTasSection from "@/components/Mucevher/MucevherRenkliTasSection";

export type MucevherDetayDataType = {
  product: ProductType & { quantity: number; used_carat: number };
};

export default function MucevherDetayContainer({
  productList,
  code,
  isEdit,
}: {
  productList: MucevherDetayDataType[];
  code?: string;
  isEdit: boolean;
}) {
  const sadeProducts = productList.filter((a) => a.product.type == "Simple");
  const pirlantaProducts = productList.filter(
    (a) => a.product.type == "Diamond",
  );
  const renkliTasProducts = productList.filter(
    (a) => a.product.type == "ColoredStone",
  );

  console.log("renkliler", renkliTasProducts);

  return (
    <div className="mb-1 rounded-sm border border-stroke bg-white pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke dark:border-strokedark">
        <div className="flex w-full items-center justify-between">
          <h3 className="p-4 text-lg font-medium text-black dark:text-white">
            Mücevher Bilgileri
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span>Mücevher Kodu:</span>
            <b className="mr-4 text-black">{code}</b>
          </div>
        </div>
      </div>
      <hr />
      <div className="grid w-full grid-cols-6  p-4">
        <div className="col-span-1 flex"></div>
        <div className="col-span-5 flex flex-col">
          <MucevherSadeSection sadeProducts={sadeProducts} isEdit={isEdit} />
          <MucevherPirlantaSection
            pirlantaProducts={pirlantaProducts}
            isEdit={isEdit}
          />
          <MucevherRenkliTasSection
            renkliTasProducts={renkliTasProducts}
            isEdit={isEdit}
          />
        </div>
      </div>
    </div>
  );
}
