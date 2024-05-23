import { ElementType } from "@/types/inputTypes";

export const AddStoneFields: Array<ElementType> = [
  {
    name: "karat",
    type: "text",
    title: "Karat",
    placeholder: "Karat Değerini Giriniz...",
    required: true,
    requiredMessage: "Karat Değeri Boş Bırakılamaz",
  },
  {
    name: "renk",
    type: "select",
    title: "Renk",
    placeholder: "Renk Değerini Giriniz...",
    required: true,
    requiredMessage: "Renk Değeri Boş Bırakılamaz",
    options: [
      {
        titleVal: "D",
        valueVal: "D",
      },
      {
        titleVal: "E",
        valueVal: "E",
      },
      {
        titleVal: "F",
        valueVal: "F",
      },
      {
        titleVal: "G",
        valueVal: "G",
      },
      {
        titleVal: "H",
        valueVal: "H",
      },
      {
        titleVal: "I",
        valueVal: "I",
      },
      {
        titleVal: "J",
        valueVal: "J",
      },
      {
        titleVal: "K",
        valueVal: "K",
      },
      {
        titleVal: "L",
        valueVal: "L",
      },
    ],
  },
  {
    name: "berraklik",
    type: "select",
    title: "Berraklık",
    placeholder: "Berraklık Değerini Giriniz...",
    requiredMessage: "Berraklık Değeri Boş Bırakılamaz",
    required: true,
    options: [
      {
        titleVal: "FL",
        valueVal: "FL",
      },
      {
        titleVal: "IF",
        valueVal: "IF",
      },
      {
        titleVal: "VVS1",
        valueVal: "VVS1",
      },
      {
        titleVal: "VVS2",
        valueVal: "VVS2",
      },
      {
        titleVal: "VS1",
        valueVal: "VS1",
      },
      {
        titleVal: "VS2",
        valueVal: "VS2",
      },
      {
        titleVal: "SI1",
        valueVal: "SI1",
      },
      {
        titleVal: "SI2",
        valueVal: "SI2",
      },
      {
        titleVal: "I1",
        valueVal: "I1",
      },
      {
        titleVal: "I2",
        valueVal: "I2",
      },
      {
        titleVal: "I3",
        valueVal: "I3",
      },
    ],
  },
  {
    name: "kesim",
    type: "select",
    title: "Kesim",
    placeholder: "Kesim Değerini Giriniz...",
    required: true,
    requiredMessage: "Kesim Değerini Boş Bırakılamaz",
    options: [
      {
        titleVal: "ROUND",
        valueVal: "ROUND",
      },
      {
        titleVal: "HEART",
        valueVal: "HEART",
      },
      {
        titleVal: "PEAR",
        valueVal: "PEAR",
      },
      {
        titleVal: "MARQUISE",
        valueVal: "MARQUISE",
      },
      {
        titleVal: "OVAL",
        valueVal: "OVAL",
      },
      {
        titleVal: "BAGET",
        valueVal: "BAGET",
      },
      {
        titleVal: "TRAPEZ",
        valueVal: "TRAPEZ",
      },
      {
        titleVal: "TRIANGLE",
        valueVal: "TRIANGLE",
      },
      {
        titleVal: "PRENSES",
        valueVal: "PRENSES",
      },
      {
        titleVal: "RADIANT",
        valueVal: "RADIANT",
      },
      {
        titleVal: "EMERALD",
        valueVal: "EMERALD",
      },
      {
        titleVal: "CUSHION",
        valueVal: "CUSHION",
      },
    ],
  },
];

// sadeKodu?: string;
// altinRengi?: string;
// altinAyari?: string;
// sadeGrami?: string;
// hasGrami?: string;
// mensei?: string;
// toplamIscilik?: string;
export const AddSadeFields: Array<ElementType> = [
  {
    name: "sadeKodu",
    type: "text",
    title: "Sade Kodu",
    placeholder: "Sade Kodunu Giriniz...",
    required: true,
    requiredMessage: "Karat Kodu Boş Bırakılamaz",
  },
  {
    name: "altinRengi",
    type: "select",
    title: "Altın Rengi",
    placeholder: "Altın Rengini Giriniz...",
    required: true,
    requiredMessage: "Altın Rengi Boş Bırakılamaz",
    options: [
      {
        titleVal: "W - Beyaz",
        valueVal: "W - Beyaz",
      },
      {
        titleVal: "G - Yeşil",
        valueVal: "G - Yeşil",
      },
      {
        titleVal: "R - Rose",
        valueVal: "R - Rose",
      },
      {
        titleVal: "GW - Yeşil Beyaz",
        valueVal: "GW - Yeşil Beyaz",
      },
      {
        titleVal: "WR - Beyaz Rose",
        valueVal: "WR - Beyaz Rose",
      },
      {
        titleVal: "GR - Yeşil Rose",
        valueVal: "GR - Yeşil Rose",
      },
      {
        titleVal: "WGR - Çok Renkli",
        valueVal: "WGR - Çok Renkli",
      },
    ],
  },
  {
    name: "altinAyari",
    type: "select",
    title: "Altın Ayarı",
    placeholder: "Altın Ayarını Giriniz...",
    required: true,
    requiredMessage: "Altın Ayarı Boş Bırakılamaz",
    options: [
      {
        titleVal: "24K",
        valueVal: "24K",
      },
      {
        titleVal: "22K",
        valueVal: "22K",
      },
      {
        titleVal: "21K",
        valueVal: "21K",
      },
      {
        titleVal: "20K",
        valueVal: "20K",
      },
      {
        titleVal: "18K",
        valueVal: "18K",
      },
      {
        titleVal: "18K",
        valueVal: "18K",
      },
    ],
  },
  {
    name: "sadeGrami",
    type: "text",
    title: "Sade Gramı",
    placeholder: "Sade Gramını Giriniz...",
    required: true,
    requiredMessage: "Sade Gramı Boş Bırakılamaz",
  },
  {
    name: "hasGrami",
    type: "text",
    title: "Has Gramı",
    placeholder: "Has Gramını Giriniz...",
    required: true,
    requiredMessage: "Has Gramı Boş Bırakılamaz",
  },
  {
    name: "mensei",
    type: "select",
    title: "Menşei",
    placeholder: "Menşei Giriniz...",
    required: true,
    requiredMessage: "Menşei Boş Bırakılamaz",
    options: [
      {
        titleVal: "D-Yerli",
        valueVal: "D-Yerli",
      },
      {
        titleVal: "F-Yabancı",
        valueVal: "F-Yabancı",
      },
    ],
  },
  {
    name: "toplamIscilik",
    type: "text",
    title: "Toplam İşçilik ($)",
    placeholder: "Toplam İşçilik Giriniz...",
    required: true,
    requiredMessage: "Toplam İşçilik Boş Bırakılamaz",
  },
];
