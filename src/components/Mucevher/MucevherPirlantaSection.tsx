import { cn } from "@/utils";
import { MucevherDetayDataType } from "@/Containers/MucevherDetayContainer";
import {
  PirlantaHeaders,
  PirlantaModelType,
} from "@/app/types/Pirlanta.HeaderType";
import MucevherPirlantaRow from "./MucevherPirlantaRow";

export default function MucevherPirlantaSection({
  pirlantaProducts,
  isEdit,
}: {
  pirlantaProducts: MucevherDetayDataType[];
  isEdit: boolean;
}) {
  const pirlantaHeaderColSum = PirlantaHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);
  return (
    <div className="my-3 w-full">
      <b className="mb-1 block text-black">Pırlanta Bilgileri</b>
      <div
        className={cn(
          "grid w-full gap-5 rounded-sm bg-gray p-1 text-black",
          `grid-cols-${pirlantaHeaderColSum}`,
        )}
      >
        {PirlantaHeaders.map((column, index) => (
          <div className={`col-span-${column.span} font-bold`} key={index}>
            {column.header}
          </div>
        ))}
      </div>
      <div
        className={cn("my-3 grid gap-5", `grid-cols-${pirlantaHeaderColSum}`)}
      >
        {pirlantaProducts.map((item, index) => {
          const newItem: PirlantaModelType = {
            karat: item.product.properties?.carat as number,
            mensei: item.product.properties?.mensei as string,
            berraklik: item.product.properties?.berraklik as string,
            adet: item.product.remaining_count as number,
            kesim: item.product.properties?.kesim as string,
            renk: item.product.properties?.renk as string,
            fiyat: item.product.total_cost as number,
          };

          return (
            <MucevherPirlantaRow isEdit={isEdit} key={index} model={newItem} />
          );
        })}
      </div>
    </div>
  );
}
