import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const setDefaultItemValues = (item: Object) => {
  return Object.keys(item).reduce((acc, next) => {
    return { ...acc, [next]: undefined };
  }, {});
};

export const validateToken = (token: string): boolean => {
  const decoded = jwtDecode(token);

  const isExpired: boolean =
    (decoded.exp && new Date().getTime() / 1000 < decoded.exp) || false;

  return isExpired;
};
