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
    return data;
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
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const facebookLoginOrRegister = async (accessToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.facebook, {
      accessToken,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const googleLoginOrRegister = async (accessToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.google, {
      accessToken,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const appleLoginOrRegister = async (identityToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.apple, {
      identityToken,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axios.post<{ emailSent: boolean }>(
      endpoints.forgotPassword,
      { email }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const { data } = await axios.post(
      endpoints.resetPassword,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error.response.status === 401) return alert("Invalid or Expired Token");

    alert("Unable to reset password.");
  }
};

export const alterPushToken = (
  userID: number,
  op: "add" | "remove",
  pushToken: string,
  accessToken: string
) =>
  axios.patch(
    endpoints.alterPushToken(userID),
    {
      op,
      token: pushToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

export const alterAllowsNotifications = (
  userID: number,
  allowsNotifications: boolean,
  accessToken: string
) =>
  axios.patch(
    endpoints.allowsNotifications(userID),
    { allowsNotifications },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
