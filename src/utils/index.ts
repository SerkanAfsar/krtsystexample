import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

import { CustomOptionType } from "../../types/inputTypes";
import { ResponseResult } from "../../types/responseTypes";
import { toast } from "react-toastify";

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

export const PirlantaBoyKodlari: CustomOptionType[] = [
  {
    titleVal: "00",
    valueVal: "00",
    extraValue: "CR",
  },
  {
    titleVal: "0.01-0.03",
    valueVal: "0.01-0.03",
    extraValue: "ST",
  },
  {
    titleVal: "0.03-0.07",
    valueVal: "0.03-0.07",
    extraValue: "ML",
  },
  {
    titleVal: "0.08-0.13",
    valueVal: "0.08-0.13",
    extraValue: "PA",
  },
  {
    titleVal: "0.13-0.17",
    valueVal: "0.13-0.17",
    extraValue: "PB",
  },
  {
    titleVal: "0.18-0.23",
    valueVal: "0.18-0.23",
    extraValue: "PC",
  },
  {
    titleVal: "0.23-0.29",
    valueVal: "0.23-0.29",
    extraValue: "PD",
  },
  {
    titleVal: "0.30-0.39",
    valueVal: "0.30-0.39",
    extraValue: "PE",
  },
  {
    titleVal: "0.40-0.49",
    valueVal: "0.40-0.49",
    extraValue: "PF",
  },
  {
    titleVal: "0.50-0.59",
    valueVal: "0.50-0.59",
    extraValue: "PG",
  },
  {
    titleVal: "0.60-0.69",
    valueVal: "0.60-0.69",
    extraValue: "PH",
  },
  {
    titleVal: "0.70-0.79",
    valueVal: "0.70-0.79",
    extraValue: "PK",
  },
  {
    titleVal: "0.80-0.89",
    valueVal: "0.80-0.89",
    extraValue: "PL",
  },
  {
    titleVal: "0.90-0.99",
    valueVal: "0.90-0.99",
    extraValue: "PM",
  },
  {
    titleVal: "1.00-1.49",
    valueVal: "1.00-1.49",
    extraValue: "UA",
  },
  {
    titleVal: "1.50-1.99",
    valueVal: "1.00-1.49",
    extraValue: "UB",
  },
  {
    titleVal: "2.00-2.99",
    valueVal: "2.00-2.99",
    extraValue: "UC",
  },
  {
    titleVal: "3.00-3.99",
    valueVal: "3.00-3.99",
    extraValue: "UE",
  },
  {
    titleVal: "4.00-4.99",
    valueVal: "4.00-4.99",
    extraValue: "UF",
  },
  {
    titleVal: "5.00-5.99",
    valueVal: "5.00-5.99",
    extraValue: "UG",
  },
  {
    titleVal: "6+",
    valueVal: "6+",
    extraValue: "UU",
  },
];

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
      options: PirlantaKesimKodlari,
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

export const RenkliTasRenkListesi: CustomOptionType[] = [
  { titleVal: "Red", valueVal: "Red" },
  { titleVal: "Blue", valueVal: "Blue" },
  { titleVal: "Green", valueVal: "Green" },
  { titleVal: "Purple", valueVal: "Purple" },
  { titleVal: "Yellow", valueVal: "Yellow" },
  { titleVal: "Pink", valueVal: "Pink" },
  { titleVal: "Blue-Green", valueVal: "Blue-Green" },
  { titleVal: "Multi-colored", valueVal: "Multi-colored" },
  { titleVal: "Violet", valueVal: "Violet" },
  { titleVal: "Peach", valueVal: "Peach" },
  { titleVal: "White", valueVal: "White" },
  { titleVal: "Black", valueVal: "Black" },
  { titleVal: "Brown", valueVal: "Brown" },
  { titleVal: "Orange", valueVal: "Orange" },
  { titleVal: "Aqua", valueVal: "Aqua" },
  { titleVal: "Teal", valueVal: "Teal" },
  { titleVal: "Maroon", valueVal: "Maroon" },
  { titleVal: "Coral", valueVal: "Coral" },
  { titleVal: "Coral", valueVal: "Coral" },
  { titleVal: "Lavender", valueVal: "Lavender" },
  { titleVal: "Magenta", valueVal: "Magenta" },
  { titleVal: "Olive", valueVal: "Olive" },
  { titleVal: "Champagne", valueVal: "Champagne" },
  { titleVal: "Chocolate", valueVal: "Chocolate" },
  { titleVal: "Charcoal", valueVal: "Charcoal" },
  { titleVal: "Crimson", valueVal: "Crimson" },
  { titleVal: "Burgundy", valueVal: "Burgundy" },
  { titleVal: "Ivory", valueVal: "Ivory" },
  { titleVal: "Mint", valueVal: "Mint" },
  { titleVal: "Mustard", valueVal: "Mustard" },
  { titleVal: "Cyan", valueVal: "Cyan" },
  { titleVal: "Fuchsia", valueVal: "Fuchsia" },
  { titleVal: "Amber", valueVal: "Amber" },
  { titleVal: "Slate", valueVal: "Slate" },
  { titleVal: "Tan", valueVal: "Tan" },
  { titleVal: "Lime", valueVal: "Lime" },
  { titleVal: "Rose", valueVal: "Rose" },
  { titleVal: "Turquoise", valueVal: "Turquoise" },
  { titleVal: "Indigo", valueVal: "Indigo" },
  { titleVal: "Cobalt", valueVal: "Cobalt" },
  { titleVal: "Cobalt", valueVal: "Cobalt" },
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

export const SadeModelTurleriData: CustomOptionType[] = [
  {
    titleVal: "Alyans",
    valueVal: "Alyans",
    extraValue: "ALY",
  },
  {
    titleVal: "Bileklik",
    valueVal: "Bileklik",
    extraValue: "BL",
  },
  {
    titleVal: "Kelepçe",
    valueVal: "Kelepçe",
    extraValue: "BNG",
  },
  {
    titleVal: "Broş",
    valueVal: "Broş",
    extraValue: "BRS",
  },
  {
    titleVal: "Kol Düğmesi",
    valueVal: "Kol Düğmesi",
    extraValue: "CF",
  },
  {
    titleVal: "Küpe",
    valueVal: "Küpe",
    extraValue: "E",
  },
  {
    titleVal: "Anturaj Küpe",
    valueVal: "Anturaj Küpe",
    extraValue: "EA",
  },
  {
    titleVal: "Küpe Arkalığı",
    valueVal: "Küpe Arkalığı",
    extraValue: "EK",
  },
  {
    titleVal: "Tektaş Küpe",
    valueVal: "Tektaş Küpe",
    extraValue: "ES",
  },
  {
    titleVal: "Bilezik",
    valueVal: "Bilezik",
    extraValue: "FBR",
  },
  {
    titleVal: "Kilit",
    valueVal: "Kilit",
    extraValue: "KLT",
  },
  {
    titleVal: "Erkek Yüzüğü",
    valueVal: "Erkek Yüzüğü",
    extraValue: "MR",
  },
  {
    titleVal: "Gerdanlık",
    valueVal: "Gerdanlık",
    extraValue: "NEC",
  },
  {
    titleVal: "Zincirli Kolye",
    valueVal: "Zincirli Kolye",
    extraValue: "NZ",
  },
  {
    titleVal: "Kolye Ucu",
    valueVal: "Kolye Ucu",
    extraValue: "P",
  },
  {
    titleVal: "Anturaj Kolye Ucu",
    valueVal: "Anturaj Kolye Ucu",
    extraValue: "PA",
  },
  {
    titleVal: "Tektaş Kolye ucu",
    valueVal: "Tektaş Kolye ucu",
    extraValue: "PS",
  },
  {
    titleVal: "Anturaj Yüzük",
    valueVal: "Anturaj Yüzük",
    extraValue: "RA",
  },
  {
    titleVal: "Genel Fantazi Yüzük",
    valueVal: "Genel Fantazi Yüzük",
    extraValue: "RF",
  },
  {
    titleVal: "Tektaş Yüzük",
    valueVal: "Tektaş Yüzük",
    extraValue: "RS",
  },
  {
    titleVal: "Tamtur Yüzük",
    valueVal: "Tamtur Yüzük",
    extraValue: "RTT",
  },
  {
    titleVal: "Zincirler",
    valueVal: "Zincirler",
    extraValue: "RULO",
  },
  {
    titleVal: "Rozet",
    valueVal: "Rozet",
    extraValue: "RZ",
  },

  {
    titleVal: "Takım Bileklik",
    valueVal: "Takım Bileklik",
    extraValue: "TKB",
  },
  {
    titleVal: "Takım Küpe",
    valueVal: "Takım Küpe",
    extraValue: "TKY",
  },
  {
    titleVal: "Takım Kolye",
    valueVal: "Takım Kolye",
    extraValue: "TKP",
  },
  {
    titleVal: "Takım Yüzük",
    valueVal: "Takım Yüzük",
    extraValue: "TKR",
  },
  {
    titleVal: "Tespih",
    valueVal: "Tespih",
    extraValue: "TS",
  },
  {
    titleVal: "Beş Taş Yüzük",
    valueVal: "Beş Taş Yüzük",
    extraValue: "WR",
  },

  {
    titleVal: "Zincir",
    valueVal: "Zincir",
    extraValue: "ZN",
  },
];

export const AtolyeListesi: CustomOptionType[] = [
  {
    titleVal: "HERMAN (ASKER)",
    valueVal: "HERMAN (ASKER)",
    extraValue: "201",
  },
  {
    titleVal: "HOSEP YAYLA",
    valueVal: "HOSEP YAYLA",
    extraValue: "202",
  },
  {
    titleVal: "ILYAS",
    valueVal: "ILYAS",
    extraValue: "203",
  },
  {
    titleVal: "ARAM USTA",
    valueVal: "ARAM USTA",
    extraValue: "204",
  },
  {
    titleVal: "OZCAN OCAL",
    valueVal: "OZCAN OCAL",
    extraValue: "205",
  },
  {
    titleVal: " ASPET CAKAN",
    valueVal: "ASPET CAKAN",
    extraValue: "206",
  },
  {
    titleVal: "GAREN",
    valueVal: "GAREN",
    extraValue: "207",
  },
  {
    titleVal: "BARET KESEN",
    valueVal: "BARET KESEN",
    extraValue: "208",
  },
  {
    titleVal: "SEVAN CAVDAR",
    valueVal: "SEVAN CAVDAR",
    extraValue: "209",
  },
  {
    titleVal: "ALEN (TAVSAN) FICICI",
    valueVal: "ALEN (TAVSAN) FICICI",
    extraValue: "210",
  },
  {
    titleVal: "HASAN AKAN",
    valueVal: "HASAN AKAN",
    extraValue: "211",
  },
  {
    titleVal: "ARET BAHAR",
    valueVal: "ARET BAHAR",
    extraValue: "212",
  },
  {
    titleVal: "SEVAN GOKBAS",
    valueVal: "SEVAN GOKBAS",
    extraValue: "213",
  },
  {
    titleVal: "YETO",
    valueVal: "YETO",
    extraValue: "214",
  },
  {
    titleVal: "MURAT ZEYFIYAN",
    valueVal: "MURAT ZEYFIYAN",
    extraValue: "215",
  },
  {
    titleVal: "KARNIK USTA",
    valueVal: "KARNIK USTA",
    extraValue: "216",
  },
  {
    titleVal: "HAZAROS",
    valueVal: "HAZAROS",
    extraValue: "217",
  },
  {
    titleVal: "MURAT SIROPYAN",
    valueVal: "MURAT SIROPYAN",
    extraValue: "218",
  },
  {
    titleVal: "TANER TUMER",
    valueVal: "TANER TUMER",
    extraValue: "219",
  },
  {
    titleVal: "ROBER YESILTEPE",
    valueVal: "ROBER YESILTEPE",
    extraValue: "220",
  },
  {
    titleVal: "ARMENAK USTA",
    valueVal: "ARMENAK USTA",
    extraValue: "221",
  },
  {
    titleVal: "KARAT MIHLAMA ATOLYESI (ARI GOKBAS)",
    valueVal: "KARAT MIHLAMA ATOLYESI (ARI GOKBAS)",
    extraValue: "222",
  },
  {
    titleVal: "SAHAN BOYNUKALIN",
    valueVal: "SAHAN BOYNUKALIN",
    extraValue: "223",
  },
  {
    titleVal: "OHAN OLCER",
    valueVal: "OHAN OLCER",
    extraValue: "224",
  },
  {
    titleVal: "GARO",
    valueVal: "GARO",
    extraValue: "225",
  },
  {
    titleVal: "ALEN AKFICICI",
    valueVal: "ALEN AKFICICI",
    extraValue: "226",
  },
  {
    titleVal: "ARMAN TEZCAN",
    valueVal: "ARMAN TEZCAN",
    extraValue: "227",
  },
  {
    titleVal: "MIRZA EMIRZEOGLU",
    valueVal: "MIRZA EMIRZEOGLU",
    extraValue: "228",
  },
  {
    titleVal: "ROBER",
    valueVal: "ROBER",
    extraValue: "229",
  },
  {
    titleVal: "ARMAN BILIR",
    valueVal: "ARMAN BILIR",
    extraValue: "230",
  },
  {
    titleVal: "UMIT FISTIKCI",
    valueVal: "UMIT FISTIKCI",
    extraValue: "231",
  },
  {
    titleVal: "LEVON",
    valueVal: "LEVON",
    extraValue: "232",
  },
  {
    titleVal: "ARTO BAGBAN",
    valueVal: "ARTO BAGBAN",
    extraValue: "233",
  },
  {
    titleVal: "AVEDIS YASTANGECKAL",
    valueVal: "AVEDIS YASTANGECKAL",
    extraValue: "234",
  },
  {
    titleVal: "AREK AYDIN",
    valueVal: "AREK AYDIN",
    extraValue: "235",
  },
  {
    titleVal: "SERDAR KARADERE",
    valueVal: "SERDAR KARADERE",
    extraValue: "236",
  },
  {
    titleVal: "MIRAN KALUSTYAN",
    valueVal: "MIRAN KALUSTYAN",
    extraValue: "237",
  },
  {
    titleVal: "KOKOR YAKICIOGLU",
    valueVal: "KOKOR YAKICIOGLU",
    extraValue: "238",
  },
  {
    titleVal: "SEVAN BICAKCI",
    valueVal: "SEVAN BICAKCI",
    extraValue: "239",
  },
  {
    titleVal: "RAFI VEZIROGLU",
    valueVal: "RAFI VEZIROGLU",
    extraValue: "240",
  },
  {
    titleVal: "KUBILAY",
    valueVal: "KUBILAY",
    extraValue: "241",
  },
  {
    titleVal: "HACIK",
    valueVal: "HACIK",
    extraValue: "242",
  },
  {
    titleVal: "ERMAN VE ALEN",
    valueVal: "ERMAN VE ALEN",
    extraValue: "243",
  },
  {
    titleVal: "GSJ",
    valueVal: "GSJ",
    extraValue: "244",
  },
  {
    titleVal: "VOLKAN DINC",
    valueVal: "VOLKAN DINC",
    extraValue: "245",
  },
  {
    titleVal: "SIMON BOSTANCI",
    valueVal: "SIMON BOSTANCI",
    extraValue: "246",
  },
  {
    titleVal: "ARMAN MIHCIYAN",
    valueVal: "ARMAN MIHCIYAN",
    extraValue: "247",
  },
  {
    titleVal: "AA_KAKA",
    valueVal: "AA_KAKA",
    extraValue: "248",
  },
  {
    titleVal: "JEWELMARK",
    valueVal: "JEWELMARK",
    extraValue: "249",
  },
  {
    titleVal: "SITA",
    valueVal: "SITA",
    extraValue: "250",
  },
  {
    titleVal: "ARMAN GULUKOGLU",
    valueVal: "ARMAN GULUKOGLU",
    extraValue: "251",
  },
  {
    titleVal: "SAYAT",
    valueVal: "SAYAT",
    extraValue: "252",
  },
  {
    titleVal: "ROY",
    valueVal: "ROY",
    extraValue: "253",
  },
  {
    titleVal: "HARUT TOROSOGLU",
    valueVal: "HARUT TOROSOGLU",
    extraValue: "254",
  },
  {
    titleVal: "ARDA GULBAHAR",
    valueVal: "ARDA GULBAHAR",
    extraValue: "255",
  },
  {
    titleVal: "TAVSAN",
    valueVal: "TAVSAN",
    extraValue: "256",
  },
  {
    titleVal: "ARET TEKNECI",
    valueVal: "ARET TEKNECI",
    extraValue: "257",
  },
  {
    titleVal: "MATYOS GOZUKUCUK",
    valueVal: "MATYOS GOZUKUCUK",
    extraValue: "258",
  },
  {
    titleVal: "ATK-MICRO (RAFI OHANNES SARIOGLU)",
    valueVal: "ATK-MICRO (RAFI OHANNES SARIOGLU)",
    extraValue: "260",
  },
  {
    titleVal: "VREJ",
    valueVal: "VREJ",
    extraValue: "259",
  },
  {
    titleVal: "ATAKAN",
    valueVal: "ATAKAN",
    extraValue: "262",
  },
  {
    titleVal: "ARMAN ERKAN",
    valueVal: "ARMAN ERKAN",
    extraValue: "263",
  },
  {
    titleVal: "BEDO (ATK)",
    valueVal: "BEDO (ATK)",
    extraValue: "261",
  },
  {
    titleVal: "ARTEN (ATK)",
    valueVal: "ARTEN (ATK)",
    extraValue: "265",
  },
  {
    titleVal: "GARNIK (ATK)",
    valueVal: "GARNIK (ATK)",
    extraValue: "264",
  },
  {
    titleVal: "AREL ISLER",
    valueVal: "AREL ISLER",
    extraValue: "267",
  },
  {
    titleVal: "MUSTAFA (CAN MIH.)",
    valueVal: "MUSTAFA (CAN MIH.)",
    extraValue: "268",
  },
  {
    titleVal: "AREV DURSUN",
    valueVal: "AREV DURSUN",
    extraValue: "269",
  },
  {
    titleVal: "YUSUF YALCIN SAMANOGLU",
    valueVal: "YUSUF YALCIN SAMANOGLU",
    extraValue: "270",
  },
  {
    titleVal: "VARUJAN",
    valueVal: "VARUJAN",
    extraValue: "271",
  },
  {
    titleVal: "PENYAMIN",
    valueVal: "PENYAMIN",
    extraValue: "272",
  },
  {
    titleVal: "ARAS HANRY",
    valueVal: "ARAS HANRY",
    extraValue: "273",
  },
  {
    titleVal: "MURAT KAYA",
    valueVal: "MURAT KAYA",
    extraValue: "274",
  },
  {
    titleVal: "ARET TEKNECI",
    valueVal: "ARET TEKNECI",
    extraValue: "275",
  },
  {
    titleVal: "YEPREM",
    valueVal: "YEPREM",
    extraValue: "276",
  },
  {
    titleVal: "SERDAR ESKICI",
    valueVal: "SERDAR ESKICI",
    extraValue: "277",
  },
  {
    titleVal: "RAFI SARAFYAN",
    valueVal: "RAFI SARAFYAN",
    extraValue: "278",
  },
  {
    titleVal: "AGOP (ATK)",
    valueVal: "AGOP (ATK)",
    extraValue: "279",
  },
  {
    titleVal: "MURAT GUNDUZ",
    valueVal: "MURAT GUNDUZ",
    extraValue: "280",
  },
  {
    titleVal: "ARAS MARAZYAN",
    valueVal: "ARAS MARAZYAN",
    extraValue: "281",
  },
  {
    titleVal: "RUDI BULGAN",
    valueVal: "RUDI BULGAN",
    extraValue: "282",
  },
  {
    titleVal: "MURAT DAĞTEKİN",
    valueVal: "MURAT DAĞTEKİN",
    extraValue: "283",
  },
  {
    titleVal: "ARCAN",
    valueVal: "ARCAN",
    extraValue: "284",
  },
  {
    titleVal: "SAYGILAR ALYANS",
    valueVal: "SAYGILAR ALYANS",
    extraValue: "285",
  },
  {
    titleVal: "OSMAN (ATK)",
    valueVal: "OSMAN (ATK)",
    extraValue: "286",
  },
];

export const formatToCurrency = (currency: number) => {
  if (currency) {
    return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  return 0;
};

export const hasDecimal = (val: number): boolean => {
  return val - Math.floor(val) !== 0;
};

export const ApiServiceResult = ({
  result,
  message,
  callBack,
}: {
  result: ResponseResult<any>;
  message: string;
  callBack?: any;
}) => {
  if (result?.success) {
    toast.success(message, { position: "top-right" });
    callBack && callBack();
  } else {
    const err =
      result.error && Array.isArray(result.error)
        ? result.error[0]
        : result.error
          ? result.error
          : result?.detail || "Hata";
    return toast.error(err, {
      position: "top-right",
    });
  }
};

export const SadeAltinKarsiliklari = (ayar: string): string => {
  switch (ayar) {
    case "18":
    case "750": {
      return "18";
    }
    case "14":
    case "585": {
      return "14";
    }
    default:
    case "8": {
      return "08";
    }
  }
};
