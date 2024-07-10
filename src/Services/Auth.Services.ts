import { LoginType } from "../../types/inputTypes";
import { BaseService } from ".";
import { LoginResultType, ResponseResult } from "../../types/responseTypes";
import { AuthType } from "../../types/types";

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
