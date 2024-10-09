export type CurrencyType = {
  isim?: string;
  alis?: string;
  satis?: string;
  degisim?: string;
  zaman?: string;
};

export type DovizKurlariType = Record<string, CurrencyType>;
