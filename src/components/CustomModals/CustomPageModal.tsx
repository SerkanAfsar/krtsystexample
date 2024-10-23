export default function CustomModalPage({
  title,
  children,
  modalDataValue,
  setModalDataValue,
}: {
  title: string;
  children: React.ReactNode;
  modalDataValue: boolean;
  setModalDataValue: any;
}) {
  if (!modalDataValue) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 z-9999  bg-black/70"
      onClick={() => setModalDataValue()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadown-md absolute left-[50%] top-[50%] h-[90%] w-[90%] -translate-x-[50%] -translate-y-[50%] overflow-auto rounded-md bg-white p-4"
      >
        <div
          onClick={() => setModalDataValue()}
          className="absolute right-5 top-4 z-999999 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#000] p-3 font-bold text-white"
        >
          X
        </div>
        <h1 className="block w-full text-lg font-bold text-[#000]">{title}</h1>
        <br />
        {children}
      </div>
    </div>
  );
}
