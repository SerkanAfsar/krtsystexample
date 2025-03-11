import { CustomOptionType } from "@/types/inputTypes";
import { sadeModelIlkHarf } from "@/utils/Sade.Utils";

export const MucevherCode = (
  pirlantaArr: any[] | undefined,
  sadeArr: any[] | undefined,
  renkliTasArr: any[] | undefined,
) => {
  let code = "";
  if (!(renkliTasArr && renkliTasArr.length) && pirlantaArr && pirlantaArr.length) {
    const blackPirlanta = pirlantaArr.some((a) => a.renk?.toUpperCase().includes("BLACK"));
    const fancyPirlanta = pirlantaArr.some((a) => a.renk?.toUpperCase().includes("FANCY"));
  
    if (blackPirlanta && fancyPirlanta) {
      code = "M";
    } else if (blackPirlanta) {
      code = "B";
    } else if (fancyPirlanta) {
      code = "F";
    } else {
      code = "D";
    }
  } else if (!(pirlantaArr && pirlantaArr.length) && renkliTasArr && renkliTasArr.length) {
    const specialStones = ["Ruby", "Emerald", "Sapphire"];
    const specialStoneCount = renkliTasArr.filter((t) => specialStones.includes(t?.renkliTas || t?.name)).length;
    const rubyCount = renkliTasArr.filter((t) => t?.renkliTas === "Ruby" || t?.name === "Ruby").length;
    const emeraldCount = renkliTasArr.filter((t) => t?.renkliTas === "Emerald" || t?.name === "Emerald").length;
    const sapphireCount = renkliTasArr.filter((t) => t?.renkliTas === "Sapphire" || t?.name === "Sapphire").length;
  
    if (rubyCount > 0 && emeraldCount === 0 && sapphireCount === 0) {
      code = "R";
    } else if (emeraldCount > 0 && rubyCount === 0 && sapphireCount === 0) {
      code = "E";
    } else if (sapphireCount > 0 && rubyCount === 0 && emeraldCount === 0) {
      code = "S";
    } else if (specialStoneCount > 1 || (rubyCount > 0 && (emeraldCount > 0 || sapphireCount > 0)) || (emeraldCount > 0 && sapphireCount > 0)) {
      code = "M";
    } else {
      code = "N";
    }
  } else if (pirlantaArr && pirlantaArr.length && renkliTasArr && renkliTasArr.length) {
    const stoneCounts = {
      ruby: renkliTasArr.filter((t) => t?.renkliTas === "Ruby" || t?.name === "Ruby").length,
      emerald: renkliTasArr.filter((t) => t?.renkliTas === "Emerald" || t?.name === "Emerald").length,
      sapphire: renkliTasArr.filter((t) => t?.renkliTas === "Sapphire" || t?.name === "Sapphire").length,
      blackPirlanta: pirlantaArr.filter((a) => a.renk?.toUpperCase().includes("BLACK")).length,
      fancyPirlanta: pirlantaArr.filter((a) => a.renk?.toUpperCase().includes("FANCY")).length
    };
  
    const specialStoneCount = [
      stoneCounts.ruby,
      stoneCounts.emerald,
      stoneCounts.sapphire,
      stoneCounts.blackPirlanta,
      stoneCounts.fancyPirlanta
    ];
  
    const specialStoneWithCount = specialStoneCount.filter(count => count > 0);
  
    if (specialStoneWithCount.length === 1) {
      if (stoneCounts.ruby > 0) {
        code = "R";
      } else if (stoneCounts.emerald > 0) {
        code = "E";
      } else if (stoneCounts.sapphire > 0) {
        code = "S";
      } else if (stoneCounts.blackPirlanta > 0) {
        code = "B";
      } else if (stoneCounts.fancyPirlanta > 0) {
        code = "F";
      }
    } else if (specialStoneWithCount.length > 1) {
      code = "M";
    } else {
      code = "M";
    }
  }
  

  if (sadeArr && sadeArr.length && sadeArr[0].modelTuru) {
    const item = sadeArr[0];
    if (item.ayar) {
      if (item.ayar == 750) {
        code += "18";
      } else if (item.ayar == 585) {
        code += "14";
      } else {
        code += item?.ayar;
      }
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
