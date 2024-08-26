import { SadeModelTurleri } from "@/data/Sade.data";

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
export const sadeModelIlkHarf = (modelTuru: string): string => {
  return (
    SadeModelTurleri.find(
      (a) => a.titleVal == modelTuru,
    )?.extraValue?.substring(0, 1) || "Not Exists"
  );
};
