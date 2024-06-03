import { ElementType } from "./inputTypes";

export type IDiamondType = {
  menstrual_status?: string;
  karat?: string;
  renk?: string;
  berraklik?: string;
  kesim?: string;
  elek?: string;
  boy?: string;
  aciklama?: string;
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
  satinAlmaTarihi?: string;
  rapaportPrice?: string;
  iskonto?: string;
  pricePerCarat?: string;
  total_cost?: string;
};

export type AddDiamondStep1Type = IDiamondType &
  ISertifikaType &
  IPirlantaPricingType;

export type ISadeType = {
  sadeKodu?: string;
  altinRengi?: string;
  altinAyari?: string;
  sadeGrami?: string;
  hasGrami?: string;
  mensei?: string;
  toplamIscilik?: string;
};

export type FormSectionType = {
  sectionTitle: string;
  colsLenght: string;
  elements: ElementType[];
  groupNumber: number;
  keyString: string;
};
