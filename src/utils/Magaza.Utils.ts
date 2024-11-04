import { GetAllMagazaService } from "@/Services/Magaza.Services";
import { CustomOptionType } from "@/types/inputTypes";
import { MagazaType } from "@/types/Magaza";

export const MagazaSorumluListData: CustomOptionType[] = [
  { titleVal: "altan", valueVal: "altan → zorlu mağaza" },
  {
    titleVal: "sibel",
    valueVal: "sibel → zorlu anlı mağaza",
  },
  {
    titleVal: "duran",
    valueVal: "duran -> onlyone mağaza",
  },
  { titleVal: "nurettin", valueVal: "nurettin-> yeni mağaza" },
  {
    titleVal: "mazlum",
    valueVal: "mazlum → merkez mücevher ",
  },
  { titleVal: "ozan", valueVal: "ozan → merkez sade" },
  {
    titleVal: "mahmut",
    valueVal: "mahmut → merkez pırlanta",
  },
  {
    titleVal: "volkan",
    valueVal: "volkan → merkez renkli taş",
  },
];

export const MagazaCustomListType = (): Promise<CustomOptionType[]> => {
  return GetAllMagazaService()
    .then((result: any) => {
      const customOptions = result.data.results.map((item: MagazaType) => ({
        titleVal: item.name as string,
        valueVal: String(item.id),
      }));

      return customOptions;
    })
    .catch((err) => console.log(err));
};
