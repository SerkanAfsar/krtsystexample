import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

import { CustomOptionType } from "@/types/inputTypes";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const setDefaultItemValues = (item: Object) => {
  return Object.keys(item).reduce((acc, next) => {
    return { ...acc, [next]: undefined };
  }, {});
};

export const validateToken = (token: string): boolean => {
  const decoded = jwtDecode(token);

  const isExpired: boolean =
    (decoded.exp && new Date().getTime() / 1000 < decoded.exp) || false;

  return isExpired;
};

export const boyType = (value: string): string => {
  if (value == "00") {
    return "CR";
  } else if (value == "0.01-0.03") {
    return "ST";
  } else if (value == "0.03-0.07") {
    return "ML";
  } else if (value == "0.08-0.13") {
    return "PB";
  } else if (value == "0.13-0.17") {
    return "PC";
  } else if (value == "0.18-0.23") {
    return "PD";
  } else if (value == "0.23-0.29") {
    return "PE";
  } else if (value == "0.30-0.39") {
    return "PF";
  } else if (value == "0.40-0.49") {
    return "PG";
  } else if (value == "0.50-0.59") {
    return "PH";
  } else if (value == "0.60-0.69") {
    return "PK";
  } else if (value == "0.70-0.79") {
    return "PL";
  } else if (value == "0.80-0.89") {
    return "PM";
  } else if (value == "0.90-0.99") {
    return "UA";
  } else if (value == "1.00-1.49") {
    return "UB";
  } else if (value == "2.00-2.99") {
    return "UC";
  } else if (value == "3.00-3.99") {
    return "UE";
  } else if (value == "4.00-4.99") {
    return "UF";
  } else if (value == "5.00-5.99") {
    return "UG";
  } else {
    return "UU";
  }
};

export const caratType = (value: number): string => {
  if (value == 0) {
    return "CR";
  } else if (value >= 0.01 && value < 0.03) {
    return "ST";
  } else if (value >= 0.03 && value < 0.07) {
    return "ML";
  } else if (value >= 0.08 && value < 0.13) {
    return "PA";
  } else if (value >= 0.13 && value < 0.17) {
    return "PB";
  } else if (value >= 0.18 && value < 0.23) {
    return "PC";
  } else if (value >= 0.23 && value < 0.29) {
    return "PD";
  } else if (value >= 0.3 && value < 0.39) {
    return "PE";
  } else if (value >= 0.4 && value < 0.49) {
    return "PF";
  } else if (value >= 0.5 && value < 0.59) {
    return "PG";
  } else if (value >= 0.6 && value < 0.69) {
    return "PH";
  } else if (value >= 0.7 && value < 0.79) {
    return "PK";
  } else if (value >= 0.8 && value < 0.89) {
    return "PL";
  } else if (value >= 0.9 && value < 0.99) {
    return "PM";
  } else if (value >= 1 && value < 1.49) {
    return "UA";
  } else if (value >= 1.5 && value < 1.99) {
    return "UB";
  } else if (value >= 2 && value < 2.99) {
    return "UC";
  } else if (value >= 3 && value < 3.99) {
    return "UE";
  } else if (value >= 4 && value < 4.99) {
    return "UF";
  } else if (value >= 5 && value < 5.99) {
    return "UG";
  } else {
    return "UU";
  }
};

export const selectKesimValue = ({
  selectedValue,
  options,
}: {
  selectedValue: string;
  options: CustomOptionType[] | undefined | null;
}) => {
  return options?.find((a) => a.valueVal == selectedValue)?.extraValue;
};

export const generateDiamondCode = ({
  kesimKodu,
  boyKodu,
}: {
  kesimKodu?: string;
  boyKodu?: string;
}): string => {
  if (kesimKodu && boyKodu) {
    return `${selectKesimValue({ selectedValue: kesimKodu, options: PirlantaKesimKodlari })}${boyType(boyKodu)}`;
  }
  return "Yükleniyor...";
};

const PirlantaKesimKodlari = [
  {
    titleVal: "ROUND",
    valueVal: "ROUND",
    extraValue: "BR",
  },
  {
    titleVal: "HEART",
    valueVal: "HEART",
    extraValue: "HS",
  },
  {
    titleVal: "PEAR",
    valueVal: "PEAR",
    extraValue: "PS",
  },
  {
    titleVal: "MARQUISE",
    valueVal: "MARQUISE",
    extraValue: "MQ",
  },
  {
    titleVal: "OVAL",
    valueVal: "OVAL",
    extraValue: "OV",
  },
  {
    titleVal: "BAGET",
    valueVal: "BAGET",
    extraValue: "BG",
  },
  {
    titleVal: "TRAPEZ",
    valueVal: "TRAPEZ",
    extraValue: "TP",
  },
  {
    titleVal: "TRIANGLE",
    valueVal: "TRIANGLE",
    extraValue: "TR",
  },
  {
    titleVal: "PRENSES",
    valueVal: "PRENSES",
    extraValue: "PR",
  },
  {
    titleVal: "RADIANT",
    valueVal: "RADIANT",
    extraValue: "RD",
  },
  {
    titleVal: "EMERALD",
    valueVal: "EMERALD",
    extraValue: "EM",
  },
  {
    titleVal: "CUSHION",
    valueVal: "CUSHION",
    extraValue: "CS",
  },
];

export const RenkliTasListesiData: CustomOptionType[] = [
  {
    titleVal: "Ruby",
    valueVal: "Ruby",
    extraValue: "RB",
  },
  {
    titleVal: "Emerald",
    valueVal: "Emerald",
    extraValue: "EM",
  },
  {
    titleVal: "Sapphire",
    valueVal: "Sapphire",
    extraValue: "SP",
  },
  {
    titleVal: "Alexandrite",
    valueVal: "Alexandrite",
    extraValue: "YD",
  },
  {
    titleVal: "Amazonite",
    valueVal: "Amazonite",
    extraValue: "YD",
  },
  {
    titleVal: "Amber",
    valueVal: "Amber",
    extraValue: "YD",
  },
  {
    titleVal: "Amethyst",
    valueVal: "Amethyst",
    extraValue: "YD",
  },
  {
    titleVal: "Apatite",
    valueVal: "Apatite",
    extraValue: "YD",
  },
  {
    titleVal: "Aquamarine",
    valueVal: "Aquamarine",
    extraValue: "YD",
  },
  {
    titleVal: "Benitoite",
    valueVal: "Benitoite",
    extraValue: "YD",
  },
  {
    titleVal: "Bloodstone",
    valueVal: "Bloodstone",
    extraValue: "YD",
  },
  {
    titleVal: "Carnelian",
    valueVal: "Carnelian",
    extraValue: "YD",
  },
  {
    titleVal: "Chrysoberyl",
    valueVal: "Chrysoberyl",
    extraValue: "YD",
  },
  {
    titleVal: "Chrysoprase",
    valueVal: "Chrysoprase",
    extraValue: "YD",
  },
  {
    titleVal: "Citrine",
    valueVal: "Citrine",
    extraValue: "YD",
  },
  {
    titleVal: "Clinohumite",
    valueVal: "Clinohumite",
    extraValue: "YD",
  },
  {
    titleVal: "Diopside",
    valueVal: "Diopside",
    extraValue: "YD",
  },
  {
    titleVal: "Fluorite",
    valueVal: "Fluorite",
    extraValue: "YD",
  },
  {
    titleVal: "Garnet",
    valueVal: "Garnet",
    extraValue: "YD",
  },
  {
    titleVal: "Heliodor",
    valueVal: "Heliodor",
    extraValue: "YD",
  },
  {
    titleVal: "Hematite",
    valueVal: "Hematite",
    extraValue: "YD",
  },
  {
    titleVal: "Howlite",
    valueVal: "Howlite",
    extraValue: "YD",
  },
  {
    titleVal: "Iolite",
    valueVal: "Iolite",
    extraValue: "YD",
  },
  {
    titleVal: "Jade",
    valueVal: "Jade",
    extraValue: "YD",
  },
  {
    titleVal: "Jet",
    valueVal: "Jet",
    extraValue: "YD",
  },
  {
    titleVal: "Kunzite",
    valueVal: "Kunzite",
    extraValue: "YD",
  },
  {
    titleVal: "Kyanite",
    valueVal: "Kyanite",
    extraValue: "YD",
  },
  {
    titleVal: "Labradorite",
    valueVal: "Labradorite",
    extraValue: "YD",
  },
  {
    titleVal: "Lapis Lazuli",
    valueVal: "Lapis Lazuli",
    extraValue: "YD",
  },
  {
    titleVal: "Larimar",
    valueVal: "Larimar",
    extraValue: "YD",
  },
  {
    titleVal: "Malachite",
    valueVal: "Malachite",
    extraValue: "YD",
  },
  {
    titleVal: "Moonstone",
    valueVal: "Moonstone",
    extraValue: "YD",
  },
  {
    titleVal: "Morganite",
    valueVal: "Morganite",
    extraValue: "YD",
  },
  {
    titleVal: "Obsidian",
    valueVal: "Obsidian",
    extraValue: "YD",
  },
  {
    titleVal: "Onyx",
    valueVal: "Onyx",
    extraValue: "YD",
  },
  {
    titleVal: "Opal",
    valueVal: "Opal",
    extraValue: "YD",
  },
  {
    titleVal: "Peridot",
    valueVal: "Peridot",
    extraValue: "YD",
  },
  {
    titleVal: "Pietersite",
    valueVal: "Pietersite",
    extraValue: "YD",
  },
  {
    titleVal: "Prehnite",
    valueVal: "Prehnite",
    extraValue: "YD",
  },
  {
    titleVal: "Rhodochrosite",
    valueVal: "Rhodochrosite",
    extraValue: "YD",
  },
  {
    titleVal: "Rhodolite",
    valueVal: "Rhodolite",
    extraValue: "YD",
  },
  {
    titleVal: "Serpentine",
    valueVal: "Serpentine",
    extraValue: "YD",
  },
  {
    titleVal: "Smoky Quartz",
    valueVal: "Smoky Quartz",
    extraValue: "YD",
  },
  {
    titleVal: "Sodalite",
    valueVal: "Sodalite",
    extraValue: "YD",
  },
  {
    titleVal: "Spessartite",
    valueVal: "Spessartite",
    extraValue: "YD",
  },
  {
    titleVal: "Spinel",
    valueVal: "Spinel",
    extraValue: "YD",
  },
  {
    titleVal: "Sugilite",
    valueVal: "Sugilite",
    extraValue: "YD",
  },
  {
    titleVal: "Sunstone",
    valueVal: "Sunstone",
    extraValue: "YD",
  },
  {
    titleVal: "Tanzanite",
    valueVal: "Tanzanite",
    extraValue: "YD",
  },
  {
    titleVal: "Tigers Eye",
    valueVal: "Tigers Eye",
    extraValue: "YD",
  },
  {
    titleVal: "Topaz",
    valueVal: "Topaz",
    extraValue: "YD",
  },
  {
    titleVal: "Tourmaline",
    valueVal: "Tourmaline",
    extraValue: "YD",
  },
  {
    titleVal: "Tremolite",
    valueVal: "Tremolite",
    extraValue: "YD",
  },
  {
    titleVal: "Turquoise",
    valueVal: "Turquoise",
    extraValue: "YD",
  },
  {
    titleVal: "Uvarovite",
    valueVal: "Uvarovite",
    extraValue: "YD",
  },
  {
    titleVal: "Variscite",
    valueVal: "Variscite",
    extraValue: "YD",
  },
  {
    titleVal: "Zoisite",
    valueVal: "Zoisite",
    extraValue: "YD",
  },
];
