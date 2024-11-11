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

import { WorkOrderType } from "../../types/WorkOrder.types";
import { LiaRingSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";

const ECommerce = ({
  pirlantaCount,
  renkliTasCount,
  sadeCount,
  mucevherCount,
  workorderCount,
  musteriCount,
  tedarikciCount,
  magazaCount,
  isEmriData,
}: {
  pirlantaCount?: any;
  renkliTasCount?: any;
  sadeCount?: any;
  mucevherCount?: any;
  workorderCount?: any;
  musteriCount?: any;
  tedarikciCount?: any;
  magazaCount?: any;
  isEmriData: WorkOrderType[];
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="İş Emiri"
          total={workorderCount?.toString() || undefined}
        >
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Tamamlanmış İş Emiri"
          total={isEmriData
            ?.filter((a) => a.status == "Completed")
            .length.toString()}
        >
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Aktif İş Emiri"
          total={isEmriData
            ?.filter((a) => a.status == "Pending")
            .length.toString()}
        >
          <GiStakeHammer size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="İptal Edilmiş İş Emiri"
          total={isEmriData
            ?.filter((a) => a.status == "Cancelled")
            .length.toString()}
        >
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

        <CardDataStats title="Pırlanta" total={pirlantaCount?.toString()}>
          <GiDiamondTrophy size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Renkli Taş" total={renkliTasCount?.toString()}>
          <GiGems size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Sade" total={sadeCount?.toString()}>
          <LiaRingSolid size={"25px"} />
        </CardDataStats>
        <CardDataStats title="Mücevher" total={mucevherCount?.toString()}>
          <GiCrystalEarrings size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Müşteri"
          total={musteriCount?.toString() || undefined}
        >
          <FaUserFriends size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Tedarikçi"
          total={tedarikciCount?.toString() || undefined}
        >
          {/* <FaUserFriends size={"25px"} /> */}
          <BsBuildings size={"25px"} />
        </CardDataStats>
        <CardDataStats
          title="Mağaza"
          total={magazaCount?.toString() || undefined}
        >
          {/* <FaUserFriends size={"25px"} /> */}
          <BsBuildings size={"25px"} />
        </CardDataStats>

        <Kurlar
          className="col-span-2"
          apiUrl="/api/kurlar/doviz"
          title="Döviz Kurları"
          subTitle="Döviz"
        />
        <Kurlar
          className="col-span-2"
          apiUrl="/api/kurlar/altin"
          title="Altın Kurları"
          subTitle="Altın"
        />
      </div>
    </>
  );
};

export default ECommerce;
