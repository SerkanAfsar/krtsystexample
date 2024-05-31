import { FormSectionType } from "@/types/formTypes";
import { ElementType } from "@/types/inputTypes";

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

export const AddStoneSections: Array<FormSectionType> = [
  {
    colsLenght: "8",
    sectionTitle: "Pırlanta Bilgileri",
    groupNumber: 0,
    elements: [
      {
        name: "tip",
        type: "customButtonGroup",
        title: "Tip",
        checkBoxList: ["TEK TAŞ", "MIX"],
        required: true,
        requiredMessage: "Karat Değeri Boş Bırakılamaz",
        checkBoxSetValueItem: "tip",
        span: 12,
      },
      {
        name: "kesim",
        type: "select",
        title: "Kesim",
        placeholder: "Kesim Değerini Giriniz...",
        required: true,
        requiredMessage: "Kesim Değerini Boş Bırakılamaz",
        relativeTo: "tip",
        options: [
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
        ],
        span: 2,
      },
      {
        name: "karat",
        type: "number",
        title: "Karat",
        placeholder: "Karat Değerini Giriniz...",
        required: true,
        requiredMessage: "Karat Değeri Boş Bırakılamaz",
        relativeTo: "tip",
        span: 2,
        simgeturu: "caratType",
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
          {
            titleVal: "M",
            valueVal: "M",
          },
          {
            titleVal: "N",
            valueVal: "N",
          },
          {
            titleVal: "O",
            valueVal: "O",
          },
          {
            titleVal: "P",
            valueVal: "P",
          },
          {
            titleVal: "Q",
            valueVal: "Q",
          },
          {
            titleVal: "R",
            valueVal: "R",
          },
          {
            titleVal: "S",
            valueVal: "S",
          },
          {
            titleVal: "T",
            valueVal: "T",
          },
          {
            titleVal: "U",
            valueVal: "U",
          },
          {
            titleVal: "V",
            valueVal: "V",
          },
          {
            titleVal: "W",
            valueVal: "W",
          },
          {
            titleVal: "X",
            valueVal: "X",
          },
          {
            titleVal: "Y",
            valueVal: "Y",
          },
          {
            titleVal: "Z",
            valueVal: "Z",
          },
        ],
        relativeTo: "tip",
        span: 2,
        spesificRelatedItem: "MIX",
      },
      {
        name: "renk2",
        type: "select",
        title: "",
        placeholder: "Renk Değerini Giriniz...",
        required: true,
        requiredMessage: "Renk Değeri Boş Bırakılamaz",
        span: 1,
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
          {
            titleVal: "M",
            valueVal: "M",
          },
          {
            titleVal: "N",
            valueVal: "N",
          },
          {
            titleVal: "O",
            valueVal: "O",
          },
          {
            titleVal: "P",
            valueVal: "P",
          },
          {
            titleVal: "Q",
            valueVal: "Q",
          },
          {
            titleVal: "R",
            valueVal: "R",
          },
          {
            titleVal: "S",
            valueVal: "S",
          },
          {
            titleVal: "T",
            valueVal: "T",
          },
          {
            titleVal: "U",
            valueVal: "U",
          },
          {
            titleVal: "V",
            valueVal: "V",
          },
          {
            titleVal: "W",
            valueVal: "W",
          },
          {
            titleVal: "X",
            valueVal: "X",
          },
          {
            titleVal: "Y",
            valueVal: "Y",
          },
          {
            titleVal: "Z",
            valueVal: "Z",
          },
        ],
        relativeTo: "tip",
        visibleRelative: "MIX",
      },
      {
        name: "berraklik",
        type: "select",
        title: "Berraklık",
        placeholder: "Berraklık Değerini Giriniz...",
        requiredMessage: "Berraklık Değeri Boş Bırakılamaz",
        required: true,
        relativeTo: "tip",
        span: 2,
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
        spesificRelatedItem: "MIX",
      },
      {
        name: "berraklik2",
        type: "select",
        title: "",
        placeholder: "Berraklık Değerini Giriniz...",
        requiredMessage: "Berraklık Değeri Boş Bırakılamaz",
        required: true,
        relativeTo: "tip",
        span: 1,
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
        visibleRelative: "MIX",
      },

      {
        name: "elek",
        type: "select",
        title: "Elek",
        placeholder: "Elek Değerini Giriniz...",
        required: true,
        requiredMessage: "Elek Değeri Boş Bırakılamaz",
        relativeTo: "tip",
        span: 2,
        options: [
          {
            titleVal: "60",
            valueVal: "60",
          },
          {
            titleVal: "70",
            valueVal: "70",
          },
          {
            titleVal: "80",
            valueVal: "80",
          },
          {
            titleVal: "90",
            valueVal: "90",
          },
          {
            titleVal: "100",
            valueVal: "100",
          },
          {
            titleVal: "110",
            valueVal: "110",
          },
          {
            titleVal: "115",
            valueVal: "115",
          },
          {
            titleVal: "120",
            valueVal: "120",
          },
          {
            titleVal: "125",
            valueVal: "125",
          },
          {
            titleVal: "130",
            valueVal: "130",
          },
          {
            titleVal: "135",
            valueVal: "135",
          },
          {
            titleVal: "140",
            valueVal: "140",
          },
          {
            titleVal: "145",
            valueVal: "145",
          },
          {
            titleVal: "150",
            valueVal: "150",
          },
          {
            titleVal: "155",
            valueVal: "155",
          },
          {
            titleVal: "160",
            valueVal: "160",
          },
          {
            titleVal: "170",
            valueVal: "170",
          },
          {
            titleVal: "180",
            valueVal: "180",
          },
          {
            titleVal: "190",
            valueVal: "190",
          },
          {
            titleVal: "200",
            valueVal: "200",
          },
          {
            titleVal: "210",
            valueVal: "210",
          },
          {
            titleVal: "220",
            valueVal: "220",
          },
          {
            titleVal: "230",
            valueVal: "230",
          },
          {
            titleVal: "240",
            valueVal: "240",
          },
          {
            titleVal: "250",
            valueVal: "250",
          },
          {
            titleVal: "260",
            valueVal: "260",
          },
          {
            titleVal: "270",
            valueVal: "270",
          },
          {
            titleVal: "70",
            valueVal: "70",
          },
        ],
      },
      {
        name: "boy",
        type: "select",
        title: "Boy",
        span: 2,
        placeholder: "Boy Değerini Giriniz...",
        required: true,
        requiredMessage: "Boy Değeri Boş Bırakılamaz",
        relativeTo: "tip",
        options: [
          {
            titleVal: "00",
            valueVal: "00",
          },
          {
            titleVal: "0.01-0.03",
            valueVal: "0.01-0.03",
          },
          {
            titleVal: "0.03-0.07",
            valueVal: "0.03-0.07",
          },
          {
            titleVal: "0.08-0.13",
            valueVal: "0.08-0.13",
          },
          {
            titleVal: "0.13-0.17",
            valueVal: "0.13-0.17",
          },
          {
            titleVal: "0.18-0.23",
            valueVal: "0.18-0.23",
          },
          {
            titleVal: "0.23-0.29",
            valueVal: "0.23-0.29",
          },
          {
            titleVal: "0.30-0.39",
            valueVal: "0.30-0.39",
          },
          {
            titleVal: "0.40-0.49",
            valueVal: "0.40-0.49",
          },
          {
            titleVal: "0.50-0.59",
            valueVal: "0.50-0.59",
          },
          {
            titleVal: "0.60-0.69",
            valueVal: "0.60-0.69",
          },
          {
            titleVal: "0.70-0.79",
            valueVal: "0.70-0.79",
          },
          {
            titleVal: "0.80-0.89",
            valueVal: "0.80-0.89",
          },
          {
            titleVal: "0.90-0.99",
            valueVal: "0.90-0.99",
          },
          {
            titleVal: "1.00-1.49",
            valueVal: "1.00-1.49",
          },
          {
            titleVal: "1.50-1.99",
            valueVal: "1.00-1.49",
          },
          {
            titleVal: "2.00-2.99",
            valueVal: "2.00-2.99",
          },
          {
            titleVal: "3.00-3.99",
            valueVal: "3.00-3.99",
          },
          {
            titleVal: "4.00-4.99",
            valueVal: "4.00-4.99",
          },
          {
            titleVal: "5.00-5.99",
            valueVal: "5.00-5.99",
          },
          {
            titleVal: "6+",
            valueVal: "6+",
          },
        ],
      },

      {
        name: "aciklama",
        type: "text",
        title: "Açıklama",
        placeholder: "Açıklama Değerini Giriniz...",
        relativeTo: "tip",
        required: false,
        requiredMessage: "Açıklama Değeri Boş Bırakılamaz",
        span: 4,
      },
    ],
  },
  {
    colsLenght: "12",
    sectionTitle: "Sertifika Bilgileri",
    groupNumber: 1,
    elements: [
      {
        name: "sertifika",
        type: "select",
        title: "Sertifika",
        placeholder: "Sertifika Seçiniz...",
        required: false,
        span: 4,
        requiredMessage: "Kesim Değerini Boş Bırakılamaz",
        options: [
          {
            titleVal: "HRD",
            valueVal: "HRD",
          },
          {
            titleVal: "GIA",
            valueVal: "GIA",
          },
          {
            titleVal: "NONE",
            valueVal: "NONE",
          },
        ],
      },
      {
        name: "sertifikaNo",
        type: "text",
        relativeTo: "sertifika",
        title: "Sertifika No",
        placeholder: "Sertifika No Değerini Giriniz...",
        required: true,
        requiredMessage: "Sertifika No Değeri Boş Bırakılamaz",
        disabled: true,
        span: 4,
      },
      {
        name: "sertifikaTarihi",
        type: "datepicker",
        title: "Sertifika Tarihi",
        placeholder: "Sertifika Tarihi Değerini Giriniz...",
        required: true,
        requiredMessage: "Sertifika Tarihi Değeri Boş Bırakılamaz",
        disabled: true,
        relativeTo: "sertifika",
        span: 4,
      },
      {
        name: "propotion",
        type: "select",
        title: "Propotion",
        placeholder: "Propotion Seçiniz...",
        required: true,
        disabled: true,
        span: 3,
        relativeTo: "sertifika",
        requiredMessage: "Propotion Değerini Boş Bırakılamaz",
        options: [
          {
            titleVal: "EXC",
            valueVal: "EXC",
          },
          {
            titleVal: "VG",
            valueVal: "VG",
          },
          {
            titleVal: "F",
            valueVal: "F",
          },
          {
            titleVal: "P",
            valueVal: "P",
          },
          {
            titleVal: "-",
            valueVal: "-",
          },
        ],
      },
      {
        name: "polish",
        type: "select",
        title: "Polish",
        relativeTo: "sertifika",
        placeholder: "Polish Seçiniz...",
        required: true,
        disabled: true,
        requiredMessage: "Polish Değerini Boş Bırakılamaz",
        span: 3,
        options: [
          {
            titleVal: "EXC",
            valueVal: "EXC",
          },
          {
            titleVal: "VG",
            valueVal: "VG",
          },
          {
            titleVal: "F",
            valueVal: "F",
          },
          {
            titleVal: "P",
            valueVal: "P",
          },
        ],
      },
      {
        name: "symmetry",
        type: "select",
        title: "Symmetry",
        placeholder: "Symmetry Seçiniz...",
        required: true,
        disabled: true,
        relativeTo: "sertifika",
        span: 3,
        requiredMessage: "Symmetry Değerini Boş Bırakılamaz",
        options: [
          {
            titleVal: "EXC",
            valueVal: "EXC",
          },
          {
            titleVal: "VG",
            valueVal: "VG",
          },
          {
            titleVal: "F",
            valueVal: "F",
          },
          {
            titleVal: "P",
            valueVal: "P",
          },
        ],
      },
      {
        name: "fluorescence",
        type: "select",
        title: "Fluorescence",
        placeholder: "Fluorescence Seçiniz...",
        required: true,
        relativeTo: "sertifika",
        span: 3,
        disabled: true,
        requiredMessage: "Fluorescence Değerini Boş Bırakılamaz",
        options: [
          {
            titleVal: "NONE",
            valueVal: "NONE",
          },
          {
            titleVal: "FAINT",
            valueVal: "FAINT",
          },
          {
            titleVal: "MEDIUM",
            valueVal: "MEDIUM",
          },
          {
            titleVal: "STRONG",
            valueVal: "STRONG",
          },
        ],
      },
      {
        name: "min",
        type: "text",
        title: "Min",
        placeholder: "Min  Değerini Giriniz...",
        required: true,
        relativeTo: "sertifika",
        requiredMessage: "Min Değeri Boş Bırakılamaz",
        disabled: true,
        span: 4,
      },
      {
        name: "max",
        type: "text",
        title: "Max",
        placeholder: "Max Değerini Giriniz...",
        required: true,
        requiredMessage: "Max Değeri Boş Bırakılamaz",
        disabled: true,
        relativeTo: "sertifika",
        span: 4,
      },
      {
        name: "height",
        type: "text",
        title: "Height",
        placeholder: "Height Değerini Giriniz...",
        required: true,
        relativeTo: "sertifika",
        requiredMessage: "Height Değeri Boş Bırakılamaz",
        disabled: true,
        span: 4,
      },
      {
        name: "table",
        type: "text",
        title: "Table",
        placeholder: "Table Değerini Giriniz...",
        required: true,
        requiredMessage: "Table Değeri Boş Bırakılamaz",
        disabled: true,
        relativeTo: "sertifika",
        span: 4,
        rightIcon: "%",
      },
      {
        name: "totalDepth",
        type: "text",
        title: "Total Depth",
        placeholder: "Total Depth Değerini Giriniz...",
        required: true,
        requiredMessage: "Total Depth Değeri Boş Bırakılamaz",
        disabled: true,
        relativeTo: "sertifika",
        span: 4,
        rightIcon: "%",
      },
      {
        name: "girdle",
        type: "text",
        title: "Girdle",
        placeholder: "Girdle Değerini Giriniz...",
        required: true,
        relativeTo: "sertifika",
        requiredMessage: "Girdle Değeri Boş Bırakılamaz",
        disabled: true,
        span: 4,
      },
    ],
  },
  {
    colsLenght: "4",
    sectionTitle: "Pırlanta Fiyat Bilgileri",
    groupNumber: 1,
    elements: [
      {
        name: "satinAlmaTarihi",
        type: "datepicker",
        title: "Satin Alma Tarihi",
        placeholder: "Satın Alma Tarihi Değerini Giriniz...",
        required: true,
        requiredMessage: "Satın Alma Tarihi Değerini Boş Bırakılamaz",
        span: 3,
      },
      {
        name: "rapaportPrice",
        type: "text",
        title: "Rapaport Güncel Fiyatı",
        placeholder: "Rapaport Güncel Fiyatı...",
        required: true,
        requiredMessage: "Karat Değeri Boş Bırakılamaz",
        disabled: true,
        rightIcon: "$",
        value: "2500",
        isCurrency: true,
        span: 3,
      },
      {
        name: "iskonto",
        type: "text",
        title: "İskonto",
        placeholder: "İskonto...",
        required: true,
        requiredMessage: "İskonto Boş Bırakılamaz",
        span: 3,
      },
      {
        name: "pricePerCarat",
        type: "text",
        title: "Price Per Carat",
        placeholder: "Price Per Carat...",
        required: false,
        requiredMessage: "İskonto Boş Bırakılamaz",
        disabled: true,
        isCurrency: true,
        rightIcon: "$",
        span: 3,
      },
      {
        name: "toplamFiyat",
        type: "text",
        title: "Toplam Fiyat",
        placeholder: "Toplam Fiyat...",
        required: false,
        requiredMessage: "Toplam Fiyat Bırakılamaz",
        disabled: true,
        isCurrency: true,
        rightIcon: "$",
        colStart: "10",
        colEnd: "13",
        span: 3,
      },
    ],
  },
];
