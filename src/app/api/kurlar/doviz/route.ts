import { CurrencyType, DovizKurlariType } from "@/types";
import { HTMLElement, parse } from "node-html-parser";

export async function GET() {
  const response = await fetch("https://bigpara.hurriyet.com.tr/doviz/", {
    cache: "no-store",
  });
  const result = await response.text();
  const text = parse(result);
  const elems = text.querySelectorAll(".tBody ul");

  const dolarElem = elems[0];
  const euroElem = elems[1];
  const sterlinElem = elems[2];

  const currecyResult: DovizKurlariType = {
    dolar: returnResult(dolarElem),
    euro: returnResult(euroElem),
    sterlin: returnResult(sterlinElem),
  };

  return Response.json(currecyResult);
}

const returnResult = (elem: HTMLElement): CurrencyType => {
  const liItem = elem.querySelectorAll("li");

  return {
    isim: liItem[0].innerText,
    alis: liItem[2].innerText,
    satis: liItem[3].innerText,
    degisim: liItem[4].innerText.replace("%", ""),
    zaman: liItem[5].innerText,
  };
};

export const dynamic = "force-dynamic";
