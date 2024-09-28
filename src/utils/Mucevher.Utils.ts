import { sadeModelIlkHarf } from "@/utils/Sade.Utils";

export const MucevherCode = (
  pirlantaArr: any[] | undefined,
  sadeArr: any[] | undefined,
  renkliTasArr: any[] | undefined,
) => {
  let code = "";
  if (pirlantaArr && pirlantaArr?.length > 0 && renkliTasArr?.length == 0) {
    code = "D";
  }
  if (
    pirlantaArr &&
    pirlantaArr.length > 0 &&
    renkliTasArr &&
    renkliTasArr.length > 0
  ) {
    code = "M";
  }
  if (
    pirlantaArr &&
    pirlantaArr.length == 0 &&
    renkliTasArr &&
    renkliTasArr.length > 0
  ) {
    code = "M";
  }
  if (
    pirlantaArr &&
    pirlantaArr.length == 0 &&
    renkliTasArr &&
    renkliTasArr.length == 1
  ) {
    const item = renkliTasArr[0]?.type;
    code = `${item}`;
  }
  if (sadeArr && sadeArr.length > 0) {
    const item = sadeArr[0];
    code += item?.ayar;
    code += sadeModelIlkHarf(item?.modelTuru);
  }
  return code;
};
