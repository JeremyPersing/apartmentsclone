import axios from "axios";

import { endpoints } from "../constants";
import { User } from "../types/user";
import { handleError } from "../utils/handleError";

type DataRes = { data: User };

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.register, {
      email,
      password,
      firstName,
      lastName,
    });
    if (data) return data;
    return null;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.login, {
      email,
      password,
    });
    if (data) return data;

    return null;
  } catch (error) {
    handleError(error);
  }
};

export const facebookLoginOrRegister = async (accessToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.facebook, {
      accessToken,
    });
    if (data) return data;
    return null;
  } catch (error) {
    handleError(error);
  }
};

export const googleLoginOrRegister = async (accessToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.google, {
      accessToken,
    });
    if (data) return data;
    return null;
  } catch (error) {
    handleError(error);
  }
};
