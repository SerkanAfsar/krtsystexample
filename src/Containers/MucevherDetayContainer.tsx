"use client";

import MucevherSadeSection from "@/components/Mucevher/MucevherSadeSection";
import { ProductType } from "../../types/types";

import React from "react";
import MucevherPirlantaSection from "@/components/Mucevher/MucevherPirlantaSection";
import MucevherRenkliTasSection from "@/components/Mucevher/MucevherRenkliTasSection";
import { formatToCurrency } from "@/utils";

export type MucevherDetayDataType = {
  product: ProductType;
  quantity: number | null;
  used_carat: number | null;
};

export default function MucevherDetayContainer({
  productList,
  code,
  isEdit,
  showTitle = true,
}: {
  productList: MucevherDetayDataType[];
  code?: string;
  isEdit: boolean;
  showTitle?: boolean;
}) {
  const sadeProducts = productList.filter((a) => a.product.type == "Simple");
  const pirlantaProducts = productList.filter(
    (a) => a.product.type == "Diamond",
  );
  const renkliTasProducts = productList.filter(
    (a) => a.product.type == "ColoredStone",
  );

  const sadeTotalPrice = sadeProducts.reduce((acc, next) => {
    return acc + Number(next.product.total_cost || 0);
  }, 0);

  const toplamPirlantaPrice = pirlantaProducts.reduce((acc, next) => {
    return acc + Number(next.product.total_cost || 0);
  }, 0);

  const toplamPirlantaAdet = pirlantaProducts.reduce((acc, next) => {
    return acc + Number(next.quantity || 0);
  }, 0);

  const toplamRenkliTasPrice = renkliTasProducts.reduce((acc, next) => {
    return acc + Number(next.product.total_cost || 0);
  }, 0);

  const toplamRenkliTasAdet = renkliTasProducts.reduce((acc, next) => {
    return acc + Number(next.quantity || 0);
  }, 0);

  return (
    <div className="mb-1 rounded-sm border border-stroke bg-white pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {showTitle && (
        <>
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
        </>
      )}
      <div className="grid w-full grid-cols-6  p-4">
        {/* <div className="col-span-1 flex"></div> */}
        <div className="col-span-6 flex flex-col">
          <MucevherSadeSection sadeProducts={sadeProducts} isEdit={isEdit} />
          <MucevherPirlantaSection
            toplamAdet={toplamPirlantaAdet}
            toplamMaliyet={toplamPirlantaPrice}
            pirlantaProducts={pirlantaProducts}
            isEdit={isEdit}
          />
          <MucevherRenkliTasSection
            toplamAdet={toplamRenkliTasAdet}
            toplamMaliyet={toplamRenkliTasPrice}
            renkliTasProducts={renkliTasProducts}
            isEdit={isEdit}
          />
        </div>
        <div className="col-span-6 mt-4 flex">
          <h2 className=" h-full w-full justify-end text-right  text-xl dark:text-white">
            Toplam Malzeme Maliyeti :{" "}
            <span className="text-right font-bold text-black underline dark:text-white">{`${formatToCurrency(toplamPirlantaPrice + toplamRenkliTasPrice + sadeTotalPrice)} $`}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
