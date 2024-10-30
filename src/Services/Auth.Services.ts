import { LoginType } from "../types/inputTypes";
import { BaseService } from ".";
import { ResponseResult } from "../types/responseTypes";
import { AuthMeType, AuthType } from "../types/types";

export const LoginService = async ({
  data,
}: {
  data: LoginType;
}): Promise<ResponseResult<AuthType>> => {
  const result = await BaseService({
    url: "user/login/",
    bodyData: data,
    method: "Post",
    hasToken: false,
  });
  return result as ResponseResult<AuthType>;
};

export const AuthMeService = async (): Promise<ResponseResult<AuthMeType>> => {
  const result = await BaseService({
    url: "user/me/",
    bodyData: null,
    method: "GET",
    hasToken: true,
  });
  return result as ResponseResult<AuthMeType>;
};
