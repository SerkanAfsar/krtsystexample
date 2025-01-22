import { CustomOptionType } from "../types/inputTypes";

export const SadeModelTurleri: CustomOptionType[] = [
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
].sort((a, b) => {
  if (a.titleVal < b.titleVal) {
    return -1;
  }
  if (a.titleVal > b.titleVal) {
    return 1;
  }
  return 0;
});

export const AltinRengiData: CustomOptionType[] = [
  {
    titleVal: "Beyaz",
    valueVal: "Beyaz",
    extraValue: "W",
  },
  {
    titleVal: "Yeşil",
    valueVal: "Yeşil",
    extraValue: "G",
  },
  {
    titleVal: "Rose",
    valueVal: "Rose",
    extraValue: "R",
  },
  {
    titleVal: "Yeşil Beyaz",
    valueVal: "Yeşil Beyaz",
    extraValue: "GW",
  },
  {
    titleVal: "Beyaz Rose",
    valueVal: "Beyaz Rose",
    extraValue: "WR",
  },
  {
    titleVal: "Yeşil Rose",
    valueVal: "Yeşil Rose",
    extraValue: "GR",
  },
  {
    titleVal: "Çok Renkli",
    valueVal: "Çok Renkli",
    extraValue: "WGR",
  },
];

export const AltinAyarData: CustomOptionType[] = [
  { titleVal: "24", valueVal: "24" },
  { titleVal: "22", valueVal: "22" },
  { titleVal: "18", valueVal: "18" },
  { titleVal: "14", valueVal: "14" },
  { titleVal: "8", valueVal: "8" },
];

export const MilyemData: CustomOptionType[] = [
  { titleVal: "Milyem Seçiniz", valueVal: "0" }
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
].sort((a, b) => {
  if (a.titleVal < b.titleVal) {
    return -1;
  }
  if (a.titleVal > b.titleVal) {
    return 1;
  }
  return 0;
});
