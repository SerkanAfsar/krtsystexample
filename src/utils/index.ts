import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResponseResult } from "../types/responseTypes";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const formatToCurrency = (currency: number): string => {
  if (currency) {
    return new Intl.NumberFormat().format(currency);
  }
  return "0";
};

export const hasDecimal = (val: number): boolean => {
  return val - Math.floor(val) !== 0;
};

export const formatDate = (value: string) => {
  return {
    primary: format(new Date(value), "dd MMM yyyy", {
      locale: tr,
    }),
    secondary: format(new Date(value), "p", {
      locale: tr,
    }),
  };
};

export const formatTarih = (value: string) => {
  const tarih = new Date(value);
  const gun = tarih.getDate().toString().padStart(2, '0');
  const ay = (tarih.getMonth() + 1).toString().padStart(2, '0'); 
  const yil = tarih.getFullYear();
  const saat = tarih.getHours().toString().padStart(2, '0');
  const dakika = tarih.getMinutes().toString().padStart(2, '0');

  return `${gun}.${ay}.${yil} ${saat}:${dakika}`;
}

export const stringToMoney = (value: string | number): number => {
  if (value) {
    return Number(value.toString().replace(".", "").replace(",", "."));
  }
  return 0;
};

export const dolarFormat = (value: number) => {
  if (value) {
    return (
      new Intl.NumberFormat("us-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value) + " $"
    );
  }
  return "0 $";
};

export const ApiServiceResult = ({
  result,
  message,
  callBack,
  toastType = "success",
}: {
  result: ResponseResult<any>;
  message: string;
  callBack?: any;
  toastType?: "success" | "warning" | "error";
}) => {
  if (result?.success) {
    switch (toastType) {
      default:
      case "success": {
        toast.success(message, { position: "top-right" });
        break;
      }
      case "warning": {
        toast.warn(message, { position: "top-right" });
        break;
      }
      case "error": {
        toast.error(message, { position: "top-right" });
        break;
      }
    }

    callBack && callBack();
  } else {
    const err = result.error ? result.error.at(0) : "Hata";
    return toast.error(err || "Hata", {
      position: "top-right",
    });
  }
};

export const ProductTypesIntl = (
  type: "Diamond" | "Simple" | "ColoredStone" | "Gem",
): string => {
  switch (type) {
    case "ColoredStone":
    default:
      return "Renkli Taş";
    case "Diamond":
      return "Pırlanta";
    case "Gem":
      return "Mücevher";
    case "Simple":
      return "Sade";
  }
};
