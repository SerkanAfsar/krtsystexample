"use server";

import { cookies } from "next/headers";
type headersType = {
  "Content-Type": string;
  Authorization?: string;
};
export const BaseService = async ({
  url,
  method,
  bodyData,
  hasToken,
}: {
  url: string;
  method: string;
  bodyData: any;
  hasToken: boolean;
}): Promise<any> => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value || null;

    const headers: headersType = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${jwt}`,
    };
    if (!hasToken) {
      delete headers.Authorization;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: method || "GET",
      headers: headers,
      body: bodyData ? JSON.stringify(bodyData) : null,
    });

    const result = await response.json();
    return result;
  } catch (err: unknown) {
    let errMessage;
    if (typeof err === "string") {
      errMessage = err.toUpperCase();
    } else if (err instanceof Error) {
      errMessage = err.message;
    }
    return {
      error: errMessage,
      statusCode: "500",
    };
  }
};
