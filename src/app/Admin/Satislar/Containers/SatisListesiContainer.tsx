"use client";
import CustomErrorAlert from "@/components/CustomUI/Alerts/CustomErrorAlert";
import CustomDatatable from "@/components/CustomUI/CustomDatatable";
import useSatisListData from "@/hooks/CustomDataHooks/useSatisListData";
import { SatisListesiHeaderColumns } from "@/types/Satis";

export default function SatisListesiContainer() {
  const { activeData, activePage, totalPageCount, setActivePage, error } =
    useSatisListData({ customer_id: undefined });

  return (
    <>
      {error ? (
        <CustomErrorAlert title="Hata" description={error} />
      ) : (
        <>
          <CustomDatatable
            totalPageCount={totalPageCount}
            columns={SatisListesiHeaderColumns}
            data={activeData}
            activePage={activePage}
            isFirstLarge={false}
            setActivePage={setActivePage}
          />
        </>
      )}
    </>
  );
}
