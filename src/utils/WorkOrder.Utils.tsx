export type WorkOrderStatusType = "Pending" | "Cancelled" | "Completed";
export const ConvertWorkOrderStatus = (
  value: WorkOrderStatusType,
): React.ReactNode => {
  switch (value) {
    case "Pending": {
      return (
        <button className="inline-flex w-30 cursor-auto justify-center rounded-full border-2 border-yellow-400 px-3 py-1 text-center text-sm font-medium !text-[#f7c849] hover:opacity-80">
          Devam Ediyor
        </button>
      );
    }
    case "Cancelled": {
      return (
        <button className="inline-flex w-30 cursor-auto justify-center rounded-full border-2 !border-[#DC3545] px-3 py-1 text-center text-sm font-medium !text-[#DC3545] hover:opacity-80">
          İptal Edildi
        </button>
      );
    }
    case "Completed": {
      return (
        <button className="inline-flex w-30 cursor-auto justify-center rounded-full border-2 !border-[#58ac58] px-3 py-1 text-center text-sm font-medium !text-[#58ac58] hover:opacity-80">
          Tamamlandı
        </button>
      );
    }
  }
};
