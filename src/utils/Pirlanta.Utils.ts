import {
  PirlantaBoyKodlari,
  PirlantaKesimKodlariData,
} from "@/data/Pirlanta.data";
import { CustomOptionType } from "../types/inputTypes";
import { UseFormGetValues } from "react-hook-form";

export const selectKesimValue = ({
  selectedValue,
  options,
}: {
  selectedValue: string;
  options: CustomOptionType[] | undefined | null;
}) => {
  return options?.find((a) => a.valueVal == selectedValue)?.extraValue;
};

export const boyType = (value: string): string => {
  return (
    PirlantaBoyKodlari.find((a) => a.titleVal == value)?.extraValue || "UU"
  );
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

export const generateDiamondCode = ({
  kesimKodu,
  boyKodu,
  caratValue,
}: {
  kesimKodu?: string;
  boyKodu?: string;
  caratValue?: number;
}): string => {
  let code = "";

  if (kesimKodu) {
    code += selectKesimValue({
      selectedValue: kesimKodu,
      options: PirlantaKesimKodlariData,
    });
  }

  if (boyKodu) {
    code += boyType(boyKodu);
  }

  if (caratValue) {
    code += caratType(caratValue);
  }

  return code;
};

export const GenerateSertificateUrl = (
  getValues: UseFormGetValues<any>,
): string => {
  const { sertifika, sertifikaNo } = getValues();
  if (sertifika == "GIA") {
    return `https://www.gia.edu/report-check?reportno=${sertifikaNo}`;
  } else if (sertifika == "HRD") {
    return `https://my.hrdantwerp.com/?record_number=${sertifikaNo}`;
  } else {
    return "#testyok";
  }
};
