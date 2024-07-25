import { ElementType } from "./inputTypes";

export type IRenkliTasType = {
  menstrual_status?: string;
  renkliTas?: string;
  carat?: number;
  renk?: string;
  kesim?: string;
  mensei?: string;
  treatment?: string;
  aciklama?: string;
  fromsingleormixed?: string;
  pricePerCarat?: number;
  frommixedItem?: string;
  total_cost?: number;
  duzenle?: React.ReactNode;
  sil?: React.ReactNode;
};

export type IDiamondType = {
  menstrual_status?: string;
  carat?: number;
  renk?: string;
  berraklik?: string;
  kesim?: string;
  elek?: string;
  boy?: string;
  aciklama?: string;
  fromsingleormixed?: string;
  frommixedItem?: string;
};

export type ISertifikaType = {
  sertifika?: string;
  sertifikaNo?: string;
  sertifikaTarihi?: string;
  propotion?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  min?: string;
  max?: string;
  height?: string;
  table?: string;
  totalDepth?: string;
  girdle?: string;
};

export type IPirlantaPricingType = {
  buy_date?: string;
  rapaportPrice?: number;
  iskonto?: number;
  pricePerCarat?: Number;
  total_cost?: number;
};

export type AddDiamondType = IDiamondType &
  ISertifikaType &
  IPirlantaPricingType;

export type ISadeType = {
  type?: string;
  resim?: File;
  sadeKodu?: string;
  modelTuru?: string;
  modelKodu?: string;
  atolye?: string;
  iscilik?: string;
  altinRengi?: string;
  gram?: string;
  ayar?: string;
  hasGrami?: string;
  aciklama?: string;
  girisTarihi?: string;
  total_cost?: number;
  cost_currency?: string;
  duzenle?: React.ReactNode;
  sil?: React.ReactNode;
};

export type FormSectionType = {
  sectionTitle: string;
  colsLenght: string;
  elements: ElementType[];
  groupNumber: number;
  keyString: string;
  extraElements?: ElementType[];
  extraElementRelativeTo?: string;
  extraElementVisibleRelative?: string;
  visibleRelativeColumn?: string;
  visibleRelativeToValue?: string;
};
