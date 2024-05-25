import { LoginType } from "@/types/inputTypes";
import { BaseService } from ".";
import { LoginResultType } from "@/types/responseTypes";

export const LoginService = async ({
  data,
}: {
  data: LoginType;
}): Promise<LoginResultType> => {
  const result = await BaseService({
    url: "user/login/",
    body: data,
    method: "Post",
  });
  return result as LoginResultType;
};
