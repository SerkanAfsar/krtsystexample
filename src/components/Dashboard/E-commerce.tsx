"use client";
import React from "react";

import CardDataStats from "../CardDataStats";

import { GiCutDiamond, GiDiamondTrophy } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Kurlar from "../Kurlar";
import { AltinKurlari, DovizKurlari } from "@/utils/MockData";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Toplam Ürün" total="3500" rate="0.43%" levelUp>
          <GiCutDiamond size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="25 Yeni İş Emiri"
          total="200"
          rate="4.35%"
          levelUp
        >
          <MdWork size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Pırlanta Satışı"
          total="1200"
          rate="2.59%"
          levelDown
        >
          <GiDiamondTrophy size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Müşteri" total="3.456" rate="0.95%" levelUp>
          <FaUserFriends size={"25px"} />
        </CardDataStats>
        <Kurlar className="col-span-2" item={DovizKurlari} />
        <Kurlar className="col-span-2" item={AltinKurlari} />
      </div>
    </>
  );
};

export default ECommerce;
