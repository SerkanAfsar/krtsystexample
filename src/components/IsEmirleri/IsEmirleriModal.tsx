"use client";

import CustomErrorAlert from "../CustomUI/Alerts/CustomErrorAlert";
import CustomDatatable from "../CustomUI/CustomDatatable";
import { IoMdCloseCircle } from "react-icons/io";

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
  const { totalPageCount, activeData, activePage, error, setActivePage } =
    tableFunction({ setSelectedValues, selectedValues });

  return (
    <div className="fixed inset-0 z-999 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
      <div className="flex h-[90%] w-[90%] animate-modalAnimation flex-col items-center justify-start gap-3 rounded-lg bg-white p-3 dark:bg-graydark">
        <div className="flex w-full items-center justify-center">
          <h3 className="ml-auto text-lg font-bold dark:text-white">{title}</h3>
          <IoMdCloseCircle
            className="ml-auto mr-4 cursor-pointer"
            size={30}
            onClick={() => setModalOpen(false)}
          />
        </div>

        {error ? (
          <CustomErrorAlert title="Hata" description={error} />
        ) : (
          <CustomDatatable
            isFirstLarge={false}
            className={"block shadow-none"}
            totalPageCount={totalPageCount}
            columns={modalHeaderColumns}
            data={activeData}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}
      </div>
    </div>
  );
}
