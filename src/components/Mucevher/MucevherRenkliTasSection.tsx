import { cn } from "@/utils";
import { MucevherDetayDataType } from "@/Containers/MucevherDetayContainer";

import {
  RenkliTasHeaders,
  RenkliTasModelType,
} from "@/app/types/RenkliTas.HeaderType";
import MucevherRenkliTasRow from "./MucevherRenkliTasRow";

export default function MucevherRenkliTasSection({
  renkliTasProducts,
  isEdit,
}: {
  renkliTasProducts: MucevherDetayDataType[];
  isEdit: boolean;
}) {
  const renkliTasHeaderColSum = RenkliTasHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);
  return (
    <div className="my-3 w-full">
      <b className="mb-1 block text-black">Renkli Taş Bilgileri</b>
      <div
        className={cn(
          "grid w-full gap-5 rounded-sm bg-gray p-1 text-black",
          `grid-cols-${renkliTasHeaderColSum}`,
        )}
      >
        {RenkliTasHeaders.map((column, index) => (
          <div className={`col-span-${column.span} font-bold`} key={index}>
            {column.header}
          </div>
        ))}
      </div>
      <div
        className={cn("my-3 grid gap-5", `grid-cols-${renkliTasHeaderColSum}`)}
      >
        {renkliTasProducts.map((item, index) => {
          const newItem: RenkliTasModelType = {
            renkliTas: item.product.properties?.renkliTas as string,
            kesim: item.product.properties?.kesim as string,
            karat: item.product.properties?.carat as number,

            adet: item.product.remaining_count as number,
            mensei: item.product.properties?.mensei as string,
            fiyat: item.product.total_cost as number,
            renk: item.product.properties?.renk as string,
          };

          return (
            <MucevherRenkliTasRow isEdit={isEdit} key={index} model={newItem} />
          );
        })}
      </div>
    </div>
  );
}
