import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { AddProductType } from "@/types/responseTypes";
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
  caratKodu,
}: {
  kesimKodu?: string;
  caratKodu?: number;
}): string => {
  if (kesimKodu && caratKodu) {
    return `${selectKesimValue({ selectedValue: kesimKodu, options: PirlantaKesimKodlari })}${caratType(caratKodu)}`;
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
