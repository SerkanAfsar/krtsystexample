import { SadeModelTurleri } from "@/data/Sade.data";
import { CurrencyType } from "@/types/types";
import { HTMLElement, parse } from "node-html-parser";

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

export const SadeHasGramHesapla = ({
  ayar,
  gram,
}: {
  ayar: string;
  gram: number;
}): string => {
  if (ayar && gram) {
    switch (ayar) {
      default:
      case "18":
      case "750": {
        const result = (18 / 24) * gram;
        return result.toFixed(2);
      }
      case "14":
      case "585": {
        const result = (14 / 24) * gram;
        return result.toFixed(2);
      }
      case "8": {
        const result = (8 / 24) * gram;
        return result.toFixed(2);
      }
      case "22": {
        const result = (22 / 24) * gram;
        return result.toFixed(2);
      }
      case "24": {
        const result = (24 / 24) * gram;
        return result.toFixed(2);
      }
    }
  } else {
    return "Not Exists";
  }
};

export const getGramAltinKuru = async () => {
  const response = await fetch("https://bigpara.hurriyet.com.tr/altin/", {
    cache: "no-store",
  });
  const result = await response.text();
  const text = parse(result);
  const elems = text.querySelectorAll(".tBody ul");

  const gramAltinElem = elems[0];

  const gramAltinLi = returnResult(gramAltinElem);

  return gramAltinLi?.satis
    ? Number(gramAltinLi?.satis?.toString().replace(".", "").replace(",", "."))
    : 2200;
};

export const getDolarKuru = async () => {
  const response = await fetch("https://bigpara.hurriyet.com.tr/dolar/", {
    cache: "no-store",
  });
  const result = await response.text();
  const text = parse(result);
  const elems = text.querySelectorAll(".tBody ul");

  const dolarKuruElem = elems[0];

  const dolarKuruLi = returnResult(dolarKuruElem);

  return dolarKuruLi?.alis
    ? Number(dolarKuruLi?.alis?.toString().replace(".", "").replace(",", "."))
    : 35;
};

const returnResult = (elem: HTMLElement): CurrencyType => {
  const liItem = elem.querySelectorAll("li");

  return {
    isim: liItem[0].innerText,
    alis: liItem[1].innerText,
    satis: liItem[2].innerText,
    degisim: liItem[3].innerText.replace("%", ""),
    zaman: liItem[4].innerText,
  };
};
