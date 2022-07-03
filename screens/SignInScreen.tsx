import { StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { GoogleButton } from "../components/GoogleButton";
import { FacebookButton } from "../components/FacebookButton";
import { AppleButton } from "../components/AppleButton";
import { PasswordInput } from "../components/PasswordInput";
import { OrDivider } from "../components/OrDivider";
import {
  facebookLoginOrRegister,
  googleLoginOrRegister,
  loginUser,
} from "../services/user";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";

export const SignInScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

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

  const nativeLogin = useMutation(
    async (values: { email: string; password: string }) => {
      const user = await loginUser(values.email, values.password);
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  );

  const facebookLogin = useMutation(async () => {
    const response = await fbPromptAsync();
    if (response.type === "success") {
      const { access_token } = response.params;

      const user = await facebookLoginOrRegister(access_token);
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  });

  const googleLogin = useMutation(async () => {
    const response = await googlePromptAsync();
    if (response.type === "success") {
      const { access_token } = response.params;

      const user = await googleLoginOrRegister(access_token);
      if (user) {
        login(user);
        navigation.goBack();
      }
    }
  });

  if (nativeLogin.isLoading || facebookLogin.isLoading || googleLogin.isLoading)
    return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="JPApartments" xShown />
        <Text category={"h5"} style={styles.header}>
          Sign In
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required("Your email is required."),
            password: yup.string().required("A password is required."),
          })}
          onSubmit={(values) => {
            nativeLogin.mutate(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
          }) => {
            return (
              <>
                <Input
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Your Email Address"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  label="Email"
                  onBlur={() => setFieldTouched("email")}
                  caption={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  status={touched.email && errors.email ? "danger" : "basic"}
                />
                <PasswordInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Your Password"
                  label="Password"
                  onBlur={() => setFieldTouched("password")}
                  caption={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  status={
                    touched.password && errors.password ? "danger" : "basic"
                  }
                />

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text category={"c1"} status={"info"}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>

                <Button
                  style={styles.signInButton}
                  onPress={() => handleSubmit()}
                >
                  Sign In
                </Button>

                <OrDivider style={styles.orContainer} />
                <GoogleButton
                  text="Continue with Google"
                  style={styles.button}
                  onPress={() => googleLogin.mutate()}
                />
                <FacebookButton
                  text="Continue with Facebook"
                  style={styles.button}
                  onPress={() => facebookLogin.mutate()}
                />
                <AppleButton
                  type="sign-in"
                  onPress={() => console.log("apple login")}
                />
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { textAlign: "center", marginVertical: 20 },
  input: {
    marginTop: 10,
  },
  forgotPasswordContainer: { alignItems: "flex-end", marginTop: 5 },
  signInButton: { marginTop: 20 },
  orContainer: {
    marginVertical: 30,
  },
  button: { marginBottom: 10 },
});
