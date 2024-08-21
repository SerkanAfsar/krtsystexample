import { SadeHeaders, SadeModelType } from "@/app/types/Sade.HeaderType";
import MucevherSadeRow from "./MucevherSadeRow";
import { cn, formatToCurrency } from "@/utils";
import { MucevherDetayDataType } from "@/Containers/MucevherDetayContainer";

export default function MucevherSadeSection({
  sadeProducts,
  isEdit,
}: {
  sadeProducts: MucevherDetayDataType[];
  isEdit: boolean;
}) {
  const sadeHeaderColSum = SadeHeaders.reduce((acc, next) => {
    return acc + next.span;
  }, 0);

  const totalPrice = sadeProducts.reduce((acc, next) => {
    return acc + Number(next.product.total_cost || 0);
  }, 0);
  return (
    <div className="my-3 w-full">
      <b className="mb-1 block text-black">Sade Bilgileri</b>
      <div
        className={cn(
          "grid w-full gap-5 rounded-sm bg-gray p-1 text-black",
          `grid-cols-${sadeHeaderColSum}`,
        )}
      >
        {SadeHeaders.map((column, index) => (
          <div className={`col-span-${column.span} font-bold`} key={index}>
            {column.header}
          </div>
        ))}
      </div>
      <div className={cn("my-3 grid gap-5", `grid-cols-${sadeHeaderColSum}`)}>
        {sadeProducts.map((item, index) => {
          const newItem: SadeModelType = {
            modelTuru: item.product.properties?.modelTuru as string,
            gram: item.product.properties?.gram as number,
            ayar: item.product.properties?.ayar as number,
            renk: item.product.properties?.altinRengi as string,
            hasGram: item.product.properties?.hasGrami as number,
            fiyat: item.product.total_cost as number,
          };
          return (
            <MucevherSadeRow key={index} isEdit={isEdit} model={newItem} />
          );
        })}
      </div>
      <div className="w-full text-right font-bold text-black ">
        <span className="underline">Toplam Fiyat</span> :
        {formatToCurrency(totalPrice)} $
      </div>
    </div>
  );
}
