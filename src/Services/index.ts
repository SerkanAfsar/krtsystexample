"use server";

import { cookies } from "next/headers";
import { ResponseResult } from "../../types/responseTypes";
type headersType = {
  [key: string]: string;
};
export const BaseService = async ({
  url,
  method,
  bodyData,
  hasToken,
  isResponseList = false,
}: {
  url: string;
  method: string;
  bodyData: any;
  hasToken: boolean;
  isResponseList?: boolean;
}): Promise<ResponseResult<any> | any> => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value || null;

    const headers: headersType = {
      "Content-Type": "application/json; charset=utf-8",
      RequestTypeTest: "baserequest",
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
      body: bodyData ? JSON.stringify(bodyData) : null,
    });

    const result = await response.json();
    if (isResponseList) {
      return result;
    } else {
      return result as ResponseResult<any>;
    }
  } catch (err: unknown) {
    let errMessage;
    console.log(err);
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
