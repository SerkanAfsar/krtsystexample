"use client";

import CustomDatatable from "../CustomUI/CustomDatatable";

export default function IsEmirleriModal({
  title,
  modalOpen,
  setModalOpen,
  modalHeaderColumns,
  tableFunction,
}: {
  title: string;
  modalOpen: boolean;
  modalHeaderColumns: any;
  setModalOpen: React.Dispatch<boolean>;
  tableFunction?: any;
}) {
  if (!tableFunction) {
    return null;
  }
  const { totalPageCount, activeData, activePage, setActivePage } =
    tableFunction();

  if (modalOpen) {
    return (
      <div className="fixed inset-0 z-999 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
        <div className="flex h-[90%] w-9/12 flex-col items-center justify-start gap-3 rounded-lg bg-white p-3">
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
  return null;
}
