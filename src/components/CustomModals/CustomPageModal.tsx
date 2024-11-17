import { cn } from "@/utils";

export default function CustomModalPage({
  title,
  children,
  modalDataValue,
  setModalDataValue,
  className,
}: {
  title: string;
  children: React.ReactNode;
  modalDataValue: boolean;
  setModalDataValue: any;
  className?: string;
}) {
  if (!modalDataValue) {
    return null;
  }
  return (
    <div
      className={cn(" fixed inset-0 z-999  bg-black/70", className)}
      // onClick={() => setModalDataValue()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadown-md pointer-events-auto absolute left-[50%] top-[50%]  h-[90%] w-[90%] -translate-x-[50%] -translate-y-[50%]  rounded-md  bg-white "
      >
        <div className="flex h-full w-full flex-col">
          <div className="border-b p-4 shadow-md">
            <div
              onClick={() => setModalDataValue()}
              className="absolute right-5 top-4 z-999999 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#000] p-3 font-bold text-white"
            >
              X
            </div>
            <h1 className="block w-full  text-lg font-bold text-[#000]">
              {title}
            </h1>
          </div>

          <div className="m-4 block flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
