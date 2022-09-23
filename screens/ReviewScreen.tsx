import { View, Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Button } from "@ui-kitten/components";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { endpoints, queryKeys } from "../constants";
import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { theme } from "../theme";
import { Row } from "../components/Row";
import { TouchableStarsContainer } from "../components/TouchableStarsContainer";
import { useLoading } from "../hooks/useLoading";
import { CreateReview } from "../types/review";
import { useCreateReviewMutation } from "../hooks/mutations/useCreateReviewMutation";

export const ReviewScreen = ({
  route,
}: {
  route: { params: { propertyID: number; propertyName: string } };
}) => {
  const { user } = useUser();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();

  const createReview = useCreateReviewMutation();

  if (!user) return <SignUpOrSignInScreen />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        {Platform.OS === "ios" ? <ModalHeader /> : null}
        <View style={styles.container}>
          <Text category={"s1"} style={styles.header}>
            Write a Review for {route.params.propertyName}
          </Text>
          <Formik
            initialValues={{
              title: "",
              body: "",
              stars: 5,
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Required"),
              body: yup.string().min(50).required("Required"),
              stars: yup.number().min(1).max(5).required("Required"),
            })}
            onSubmit={(values) => {
              const createReviewObj: CreateReview = {
                body: values.body,
                stars: values.stars,
                title: values.title,
                userID: user.ID,
              };

              createReview.mutate({
                propertyID: route.params.propertyID,
                review: createReviewObj,
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => {
              return (
                <>
                  <TouchableStarsContainer
                    field="stars"
                    stars={values.stars}
                    setStars={setFieldValue}
                    style={styles.defaultMarginTop}
                  />

                  <Input
                    label={"Title"}
                    onChangeText={handleChange("title")}
                    onBlur={() => setFieldTouched("title")}
                    caption={
                      touched.title && errors.title ? errors.title : undefined
                    }
                    status={touched.title && errors.title ? "danger" : "basic"}
                    style={styles.defaultMarginTop}
                  />

                  <Input
                    value={values.body}
                    onChangeText={handleChange("body")}
                    label="Your Review"
                    multiline
                    numberOfLines={10}
                    onBlur={() => setFieldTouched("body")}
                    textAlignVertical="top"
                    caption={
                      touched.body && errors.body
                        ? errors.body
                        : values.body.length < 50
                        ? "50 character minimum"
                        : undefined
                    }
                    placeholder="Say something nice, or not ..."
                    status={touched.body && errors.body ? "danger" : "basic"}
                    style={styles.defaultMarginTop}
                  />

                  <Row style={styles.buttonContainer}>
                    <Button
                      appearance={"ghost"}
                      style={[styles.cancelButton, styles.button]}
                      onPress={navigation.goBack}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={styles.button}
                      onPress={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                  </Row>
                </>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginVertical: 20,
  },
  defaultMarginTop: { marginTop: 10 },
  buttonContainer: { justifyContent: "space-between", marginTop: 25 },
  button: {
    width: "47%",
  },
  cancelButton: { borderColor: theme["color-primary-500"] },
});
