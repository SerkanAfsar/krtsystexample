import { CustomOptionType } from "@/types/inputTypes";
import { sadeModelIlkHarf } from "@/utils/Sade.Utils";

export const MucevherCode = (
  pirlantaArr: any[] | undefined,
  sadeArr: any[] | undefined,
  renkliTasArr: any[] | undefined,
) => {
  let code = "";
  if (pirlantaArr && pirlantaArr?.length > 0 && renkliTasArr?.length == 0) {
    code = "D";
  }
  if (
    pirlantaArr &&
    pirlantaArr.length > 0 &&
    renkliTasArr &&
    renkliTasArr.length > 0
  ) {
    code = "M";
  }
  if (
    pirlantaArr &&
    pirlantaArr.length == 0 &&
    renkliTasArr &&
    renkliTasArr.length > 0
  ) {
    code = "M";
  }
  if (
    pirlantaArr &&
    pirlantaArr.length == 0 &&
    renkliTasArr &&
    renkliTasArr.length == 1
  ) {
    const item = renkliTasArr[0]?.type;
    code = `${item}`;
  }
  if (sadeArr && sadeArr.length > 0) {
    const item = sadeArr[0];
    code += item?.ayar;
    code += sadeModelIlkHarf(item?.modelTuru);
  }
  return code;
};

export const MucevherYazdirmaList: CustomOptionType[] = [
  { titleVal: "6'lı Rapor", valueVal: "6'lı Rapor" },
  { titleVal: "24'lü Rapor", valueVal: "24'lü Rapor" },
  { titleVal: "Ana Maliyet", valueVal: "Ana Maliyet" },
  { titleVal: "P2", valueVal: "P2" },
];
