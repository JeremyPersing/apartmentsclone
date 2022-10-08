import { useNavigation } from "@react-navigation/native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { useEffect } from "react";

import {
  appleLoginOrRegister,
  facebookLoginOrRegister,
  googleLoginOrRegister,
  loginUser,
  registerUser,
} from "../services/user";
import { User } from "../types/user";
import { useUser } from "./useUser";
import { useLoading } from "./useLoading";

export const useAuth = () => {
  const [_, googleResponse, googleAuth] = Google.useAuthRequest({
    expoClientId:
      "1080382822276-eqklp58m1q9fl85m7aj89n1ofp8bdj7p.apps.googleusercontent.com",
    iosClientId:
      "1080382822276-a0ms51p5cfc523bivhchs8nk04u2scq0.apps.googleusercontent.com",
    androidClientId:
      "1080382822276-dqohv9donltabnijor1uun2765hstr4v.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    selectAccount: true,
  });

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "723313165600806",
  });

  useEffect(() => {
    async function loginUserWithGoogle(access_token: string) {
      try {
        setLoading(true);

        const user = await googleLoginOrRegister(access_token);
        handleSignInUser(user);
      } catch (error) {
        handleAuthError();
      } finally {
        setLoading(false);
      }
    }

    if (googleResponse?.type === "success") {
      const { access_token } = googleResponse.params;
      loginUserWithGoogle(access_token);
    }
  }, [googleResponse]);

  const { login } = useUser();
  const { goBack } = useNavigation();
  const { setLoading } = useLoading();

  const handleSignInUser = (user?: User | null) => {
    if (user) {
      login(user);
      goBack();
    }
  };

  const handleAuthError = () => alert("Unable to authorize");

  const nativeRegister = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const user = await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      handleSignInUser(user);
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const nativeLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);

      const user = await loginUser(values.email, values.password);
      handleSignInUser(user);
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const facebookAuth = async () => {
    try {
      const response = await fbPromptAsync();
      if (response.type === "success") {
        setLoading(true);
        const { access_token } = response.params;

        const user = await facebookLoginOrRegister(access_token);
        handleSignInUser(user);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const appleAuth = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (identityToken) {
        setLoading(true);

        const user = await appleLoginOrRegister(identityToken);
        handleSignInUser(user);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  return { nativeRegister, nativeLogin, facebookAuth, googleAuth, appleAuth };
};
