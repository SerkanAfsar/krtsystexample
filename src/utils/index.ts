import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ResponseResult } from "../../types/responseTypes";
import { toast } from "react-toastify";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const formatToCurrency = (currency: number) => {
  if (currency) {
    return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  return 0;
};

export const hasDecimal = (val: number): boolean => {
  return val - Math.floor(val) !== 0;
};

export const formatDate = (value: string): string => {
  const date = new Date(value);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleDateString("tr-TR", options);
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
    const err =
      result.error && Array.isArray(result.error)
        ? result.error[0]
        : result.error
          ? result.error
          : result?.detail || "Hata";
    return toast.error(err, {
      position: "top-right",
    });
  }
};
