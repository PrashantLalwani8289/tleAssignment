import axios from "axios";
import endpoints from "../constants/endpoints";
import {
  IUserSignInSchema,
  IUserSignUpSchema,
} from "../interface/userInterface";
import ApiResponse from "../resources/entity/IApiResponse";

export const SignUpUser = async (
  signupData: IUserSignUpSchema
): Promise<ApiResponse> => {
  const { data } = await axios.post(endpoints.User.SIGNUP, signupData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const LoginUser = async (
  loginData: IUserSignInSchema
): Promise<ApiResponse> => {
  const { data } = await axios.post(endpoints.User.LOGIN, loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

