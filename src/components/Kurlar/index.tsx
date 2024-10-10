"use client";

import { DovizKurlariType } from "@/types";
import { cn } from "@/utils";
import { ClassValue } from "clsx";
import React, { useEffect, useState } from "react";

export default function Kurlar({
  className,
  title,
  apiUrl,
  subTitle,
}: {
  className: ClassValue;
  title: string;
  apiUrl: string;
  subTitle: string;
}) {
  const [stateItem, setStateItem] = useState<DovizKurlariType>();
  useEffect(() => {
    const process = async () => {
      const response = await fetch(apiUrl, { cache: "no-store" });
      const result = await response.json();

      setStateItem(result);
    };

    const timer = setInterval(() => {
      process();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [apiUrl]);

  if (!stateItem) {
    return <div>Yükleniyor...</div>;
  }
  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-start gap-3 rounded-sm bg-white p-4 shadow-default",
        className,
      )}
    >
      <h2 className="block w-full text-left text-lg font-bold  text-black">
        {title}
      </h2>
      <div
        className={`grid w-full grid-cols-5 gap-3 bg-[#e4e6eb] p-2 font-bold text-black`}
      >
        <div className="col-span-1">{subTitle}</div>
        <div className="col-span-1">Alış</div>
        <div className="col-span-1">Satış</div>
        <div className="col-span-1">Fark</div>
        <div className="col-span-1">Güncelleme</div>
      </div>
      <div
        className={`text-md grid w-full grid-cols-5 gap-3 p-2 font-normal text-black`}
      >
        {Object.entries(stateItem).map(([key, value], index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-span-1">{value.isim}</div>
              <div className="col-span-1">{value.alis} TL</div>
              <div className="col-span-1">{value.satis} TL</div>
              <div
                className={cn(
                  value.degisim?.toString().includes("-")
                    ? "text-red"
                    : "text-green-700",
                )}
              >
                {value.degisim} %
              </div>
              <div className="col-span-1">{value.zaman}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
