import { useNavigation } from "@react-navigation/native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";

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
  const [_, __, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "974074584499-unf9vgjb47j4bsccejqi4ekj110c47nf.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "723313165600806",
  });

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

  const googleAuth = async () => {
    try {
      const response = await googlePromptAsync();
      if (response.type === "success") {
        setLoading(true);

        const { access_token } = response.params;

        const user = await googleLoginOrRegister(access_token);
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
