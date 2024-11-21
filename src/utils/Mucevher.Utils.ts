import { CustomOptionType } from "@/types/inputTypes";
import { sadeModelIlkHarf } from "@/utils/Sade.Utils";

export const MucevherCode = (
  pirlantaArr: any[] | undefined,
  sadeArr: any[] | undefined,
  renkliTasArr: any[] | undefined,
) => {
  let code = "";
  if (pirlantaArr && pirlantaArr.length) {
    if (pirlantaArr && pirlantaArr.some((a) => a.renk == "BLACK")) {
      code = "B";
    } else {
      code = "D";
    }
  }

  if (
    pirlantaArr &&
    pirlantaArr?.length &&
    pirlantaArr.some((a) => a.renk == "BLACK")
  ) {
    code = "B";
  } else if (
    pirlantaArr &&
    pirlantaArr.length &&
    renkliTasArr &&
    renkliTasArr.length
  ) {
    code = "M";
  } else if (
    renkliTasArr &&
    renkliTasArr.length &&
    (renkliTasArr[0]?.renkliTas || renkliTasArr[0]?.name)
  ) {
    const item = renkliTasArr[0]?.renkliTas || renkliTasArr[0]?.name;

    if (item == "Ruby") {
      code = "R";
    } else if (item == "Emerald") {
      code = "E";
    } else if (item == "Sapphire") {
      code = "S";
    } else {
      code = "Y";
    }
  }

  if (sadeArr && sadeArr.length && sadeArr[0].modelTuru) {
    const item = sadeArr[0];
    if (item.ayar) {
      code += item?.ayar;
    }
    if (item.modelTuru) {
      code += sadeModelIlkHarf(item?.modelTuru);
    }
  }
  return code;
};

export const MucevherYazdirmaList: CustomOptionType[] = [
  { titleVal: "6'lı Rapor", valueVal: "6'lı Rapor" },
  { titleVal: "24'lü Rapor", valueVal: "24'lü Rapor" },
  { titleVal: "Ana Maliyet", valueVal: "Ana Maliyet" },
  { titleVal: "P2", valueVal: "P2" },
];
