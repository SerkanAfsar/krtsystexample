"use server";
import { cookies } from "next/headers";
import { LoginType } from "../../types/inputTypes";
import { LoginService } from "@/Services/Auth.Services";
import { redirect } from "next/navigation";
import { AuthType } from "../../types/types";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const loginServer = async (data: LoginType) => {
  const result = await LoginService({ data });
  const cookieStore = cookies();

  if (result?.success) {
    const data = result.data as AuthType;
    await cookieStore.set({
      name: "jwt",
      value: data.token,
      sameSite: true,
      expires: new Date().setFullYear(new Date().getFullYear() + 1),
    });

    await cookieStore.set({
      name: "user_groups",
      value: JSON.stringify(data.user_groups),
      sameSite: true,
      expires: new Date().setFullYear(new Date().getFullYear() + 1),
    });

    return redirect("/Admin/Dashboard");
  }
  const errString: string = result.error
    ? result.error[0]
    : "Giriş Bilgileri Yanlış";

  return errString || null;
};

export const getLoggedUserId = async () => {
  "use server";
  const token = cookies().get("jwt")?.value;
  if (token) {
    const { user_id } = jwtDecode(token) as JwtPayload & { user_id: number };
    return user_id;
  }
  return 0;
};
