import { cn, formatToCurrency } from "@/utils";
import { ClassValue } from "clsx";

export type KurlarType = {
  title: string;
  data: { [key: string]: string | object }[];
};
export default function Kurlar({
  className,
  item,
}: {
  item: KurlarType;
  className: ClassValue;
}) {
  const objKeys = Object.keys(item.data[0]);
  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-start gap-3 rounded-sm bg-white p-4 shadow-default",
        className,
      )}
    >
      <h2 className="block w-full text-left text-lg font-bold  text-black">
        {item.title}
      </h2>
      <div
        className={`grid w-full font-bold text-black grid-cols-${objKeys.length} gap-3 bg-[#e4e6eb] p-2`}
      >
        {objKeys.map((header: any, index) => {
          return (
            <div className="col-span-1" key={index}>
              {typeof header != "object" ? header : header?.value}
            </div>
          );
        })}
      </div>
      {item.data.map((data: any, index) => (
        <div
          key={index}
          className={`grid w-full p-2 grid-cols-${objKeys.length} gap-3 font-bold text-black`}
        >
          {objKeys.map((keyItem, index) => {
            const item = data[keyItem];
            return (
              <div
                className={cn(
                  "col-span-1",
                  typeof item == "object"
                    ? item.increase
                      ? "text-red"
                      : "text-green-600"
                    : "text-black",
                )}
                key={index}
              >
                {typeof item != "object" ? item : item.value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
