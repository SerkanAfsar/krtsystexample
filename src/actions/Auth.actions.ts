"use server";
import { cookies } from "next/headers";
import { LoginType } from "../../types/inputTypes";
import { LoginService } from "@/Services/Auth.Services";
import { redirect } from "next/navigation";
import { AuthType } from "../../types/types";

export const loginServer = async (data: LoginType) => {
  const result = await LoginService({ data });

  if (result.success) {
    const data = result.data as AuthType;
    await cookies().set({
      name: "jwt",
      value: data.token,
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
