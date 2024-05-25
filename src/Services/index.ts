"use server";
import { cookies } from "next/headers";
export const BaseService = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body: object | null;
}): Promise<any> => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt") || null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // Authorization: `Bearer ${jwt}`,
      },
      body: body ? JSON.stringify(body) : null,
    });
    const result = await response.json();
    return result;
  } catch (err: unknown) {
    console.log("hata is ", err);
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
