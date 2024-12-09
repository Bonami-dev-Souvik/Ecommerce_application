import axios from "axios";
import { SignupRequest, SignupResponse, ApiError } from "../types/auth";
import { LoginRequest, LoginResponse } from "../types/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  console.log("This is the base url", BASE_URL);
  try {
    const response = await axios.post<SignupResponse>(
      `${BASE_URL}/signUp`,
      data,
      {withCredentials:true}
    );
    console.log(
      "This is the response here from the axios call to the signup route---",
      response
    );

    if (response.status === 201) {
      const login = await axios.post<LoginResponse>(`${BASE_URL}/login`, {
        email: data.email,
        password: data.password,
      },
    {withCredentials:true});
      return login.data;
    } else {
      throw new Error("Signup Failed");
    }
  } catch (error) {
    const apiError = error as ApiError;
    const errorMessage = apiError.response?.data?.error || "Signup Failed";
    throw new Error(errorMessage);
  }
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, data, {withCredentials: true});

    if(response.status === 200){
      return response.data;
    } else {
      throw new Error("Login Failed");
    }
  } catch (error: unknown) {
    const apiError = error as { message: string };
    throw new Error(apiError.message || "Login failed");
  }
};
