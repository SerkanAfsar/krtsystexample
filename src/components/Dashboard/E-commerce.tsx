"use client";
import React from "react";

import CardDataStats from "../CardDataStats";

import {
  GiCrystalEarrings,
  GiCutDiamond,
  GiDiamondTrophy,
  GiGems,
  GiStakeHammer,
} from "react-icons/gi";

import { FaUserFriends } from "react-icons/fa";
import Kurlar from "../Kurlar";
import { AltinKurlari, DovizKurlari } from "@/utils/MockData";
import { WorkOrderType } from "../../../types/WorkOrder.types";
import { LiaRingSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";

const ECommerce = ({
  pirlantaCount,
  renkliTasCount,
  sadeCount,
  mucevherCount,
  workorderCount,
  isEmriData,
}: {
  pirlantaCount: number;
  renkliTasCount: number;
  sadeCount: number;
  mucevherCount: number;
  workorderCount: number;
  isEmriData: WorkOrderType[];
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="İş Emiri" total={workorderCount.toString()}>
          {/* <MdWork size={"25px"} /> */}
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Tamamlanmış İş Emiri"
          total={isEmriData
            .filter((a) => a.status == "Completed")
            .length.toString()}
        >
          {/* <MdWork size={"25px"} /> */}
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Aktif İş Emiri"
          total={isEmriData
            .filter((a) => a.status == "Pending")
            .length.toString()}
        >
          {/* <MdWork size={"25px"} /> */}
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="İptal Edilmiş İş Emiri"
          total={isEmriData
            .filter((a) => a.status == "Cancelled")
            .length.toString()}
        >
          {/* <MdWork size={"25px"} /> */}
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Toplam Ürün"
          total={(
            pirlantaCount +
            renkliTasCount +
            sadeCount +
            mucevherCount
          ).toString()}
        >
          <GiCutDiamond size={"25px"} />
        </CardDataStats>

        <CardDataStats title="Pırlanta" total={pirlantaCount.toString()}>
          <GiDiamondTrophy size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Renkli Taş" total={renkliTasCount.toString()}>
          {/* <GiStonePile size={"25px"} /> */}
          <GiGems size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Sade" total={sadeCount.toString()}>
          {/* <GiDiamondTrophy size={"25px"} /> */}
          {/* <FaRing size={"25px"} /> */}
          <LiaRingSolid size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Mücevher" total={mucevherCount.toString()}>
          {/* <GiDiamondTrophy  /> */}
          {/* <GiStonePile size={"25px"} /> */}
          <GiCrystalEarrings size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Müşteri" total="0">
          <FaUserFriends size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Tedarikçi" total="0">
          {/* <FaUserFriends size={"25px"} /> */}
          <BsBuildings size={"25px"} />
        </CardDataStats>
        <div></div>
        <Kurlar className="col-span-2" item={DovizKurlari} />
        <Kurlar className="col-span-2" item={AltinKurlari} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
