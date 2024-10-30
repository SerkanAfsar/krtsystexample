import { CurrencyType, DovizKurlariType } from "@/types/types";
import { HTMLElement, parse } from "node-html-parser";

export async function GET() {
  try {
    const response = await fetch("https://bigpara.hurriyet.com.tr/altin/", {
      cache: "no-store",
    });
    const result = await response.text();
    const text = parse(result);
    const elems = text.querySelectorAll(".tBody ul");

    const hasAltinElem = elems[19];
    const onsAltinElem = elems[2];
    const gramAltinElem = elems[0];

    const currecyResult: DovizKurlariType = {
      hasAltin: returnResult(hasAltinElem),
      onsAltin: returnResult(onsAltinElem),
      gramAltin: returnResult(gramAltinElem),
    };
    return Response.json(currecyResult);
  } catch {
    return Response.json(null);
  }
}

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
