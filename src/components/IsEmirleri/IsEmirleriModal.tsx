"use client";

import CustomDatatable from "../CustomUI/CustomDatatable";
import { SeciliUrunType } from "./UrunGruplariModul";

export default function IsEmirleriModal({
  title,

  setModalOpen,
  modalHeaderColumns,
  tableFunction,
  setSelectedValues,
  selectedValues,
}: {
  title: string;

  modalHeaderColumns: any;
  setModalOpen: React.Dispatch<boolean>;
  setSelectedValues: any;
  tableFunction?: any;
  selectedValues?: any;
}) {
  if (!tableFunction) {
    return null;
  }
  const { totalPageCount, activeData, activePage, setActivePage } =
    tableFunction({ setSelectedValues, selectedValues });

  return (
    <div className="fixed inset-0 z-999 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
      <div className="flex h-[90%] w-9/12 animate-modalAnimation flex-col items-center justify-start gap-3 rounded-lg bg-white p-3">
        <h3 onClick={() => setModalOpen(false)} className="text-lg font-bold">
          {title}
        </h3>
        {activeData ? (
          <CustomDatatable
            className={"block shadow-none"}
            totalPageCount={totalPageCount}
            columns={modalHeaderColumns}
            dataOne={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            Yükleniyor...
          </div>
        )}
      </div>
    </div>
  );
}
