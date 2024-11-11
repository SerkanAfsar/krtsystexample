"use server";

import { cookies } from "next/headers";
import { ResponseResult } from "../types/responseTypes";

type headersType = {
  [key: string]: string;
};
export const BaseService = async ({
  url,
  method,
  bodyData,
  hasToken,
  isResponseList = false,
  isFormData = false,
}: {
  url: string;
  method: string;
  bodyData: any;
  hasToken: boolean;
  isResponseList?: boolean;
  isFormData?: boolean;
}): Promise<ResponseResult<any> | any> => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value || null;

    const headers: headersType = {
      "Content-Type": !isFormData
        ? "application/json; charset=utf-8"
        : "multipart/form-data",
    };

    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
    if (!hasToken) {
      delete headers?.Authorization;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: method || "GET",
      headers: headers,
      body: isFormData ? bodyData : bodyData ? JSON.stringify(bodyData) : null,
    });
    const result = await response.json();
    if (response.ok) {
      if (isResponseList) {
        return result;
      } else {
        return result as ResponseResult<any>;
      }
    } else {
      const errResponse: ResponseResult<any> = {
        statusCode: response.status,
        success: false,
        data: null,
        error:
          result && result.error
            ? [result.error[0]]
            : [Object.values(result).at(0)],
      };
      return errResponse;
    }
  } catch (err: unknown) {
    let errMessage;
    if (typeof err === "string") {
      errMessage = err.toUpperCase();
    } else if (err instanceof Error) {
      errMessage = err.message;
    }
    return {
      statusCode: 500,
      data: null,
      error: errMessage ? [errMessage] : null,
      success: false,
    };
  }
};
