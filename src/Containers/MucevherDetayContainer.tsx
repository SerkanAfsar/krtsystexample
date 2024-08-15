"use client";
import { cn } from "@/utils";
import { SadeHeaders, SadeModelType } from "@/app/types/Sade.HeaderType";
import { ProductType } from "../../types/types";

import React from "react";

export type MucevherDetayDataType = {
  product: ProductType & { quantity: number; used_carat: number };
};

export default function MucevherDetayContainer({
  productList,
}: {
  productList: MucevherDetayDataType[];
}) {
  const sadeHeaderColSum = SadeHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  const sadeProducts = productList.filter((a) => a.product.type == "Simple");

  return (
    <div className="mb-1 rounded-sm border border-stroke bg-white pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke dark:border-strokedark">
        <div className="flex w-full items-center justify-between">
          <h3 className="p-4 text-lg font-medium text-black dark:text-white">
            Mücevher Bilgileri
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span>Mücevher Kodu:</span>
            <b className="mr-4 text-black"></b>
          </div>
        </div>
      </div>
      <hr />
      <div className="m-4">
        <div className={cn("grid gap-5", `grid-cols-${sadeHeaderColSum}`)}>
          {SadeHeaders.map((column, index) => (
            <div className={`col-span-${column.span} font-bold`} key={index}>
              {column.header}
            </div>
          ))}
        </div>

        {sadeProducts.map((item, index) => {
          const newItem: SadeModelType = {
            modelTuru: item.product.properties?.modelTuru as string,
            ayar: item.product.properties?.ayar as number,
            fiyat: item.product.total_cost as number,
            gram: item.product.properties?.gram as number,
            hasGram: item.product.properties?.hasGrami as number,
            renk: item.product.properties?.altinRengi as string,
          };
          return (
            <div
              key={index}
              className={cn("my-3 grid gap-5", `grid-cols-${sadeHeaderColSum}`)}
            >
              {SadeHeaders.map((column, index2) => {
                return (
                  <div key={index2} className={`col-span-${column.span}`}></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
