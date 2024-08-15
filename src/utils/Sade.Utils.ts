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
