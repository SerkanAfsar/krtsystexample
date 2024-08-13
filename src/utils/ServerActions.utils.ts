"use server";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";

export const getLoggedUserId = async () => {
  "use server";
  const token = cookies().get("jwt")?.value;
  if (token) {
    const { user_id } = jwtDecode(token) as JwtPayload & { user_id: number };
    return user_id;
  }
  return 0;
};
