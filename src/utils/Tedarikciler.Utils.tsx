import { GetAllTedarikciService } from "@/Services/Supplier.Services";
import { TedarikciType } from "../../types/types";
import { CustomOptionType } from "../../types/inputTypes";

export const TedarikciCustomListType = (): Promise<CustomOptionType[]> => {
  return GetAllTedarikciService()
    .then((result: any) => {
      const customOptions = result.data.results.map((item: TedarikciType) => ({
        titleVal: item.name as string,
        valueVal: String(item.id),
      }));

      return customOptions;
    })
    .catch((err) => console.log(err));
};
