import { ElementType } from "./inputTypes";

export type IDiamondType = {
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
  colsLenght: number;
  elements: ElementType[];
  groupNumber: number;
};
