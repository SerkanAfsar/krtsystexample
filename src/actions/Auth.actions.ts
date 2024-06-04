"use server";
import { cookies } from "next/headers";
import { LoginType } from "@/types/inputTypes";
import { LoginService } from "@/Services/Auth.Services";
import { redirect } from "next/navigation";

export const loginServer = async (data: LoginType) => {
  const result = await LoginService({ data });

  if (result.result && result.payload.token) {
    await cookies().set({
      name: "jwt",
      value: result.payload.token?.toString(),
      httpOnly: true,
    });
    return redirect("/Admin/Dashboard");
  }
  const errString: string =
    result.message ||
    (result?.payload?.password && result?.payload?.password[0]) ||
    (result?.payload?.username && result?.payload?.username[0]) ||
    "Giriş Bilgileri Yanlış";

  return errString || null;
};
