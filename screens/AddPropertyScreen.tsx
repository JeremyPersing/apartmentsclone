import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { useAuth } from "../hooks/useAuth";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { CreateManagerScreen } from "./CreateManagerScreen";

export const AddPropertyScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const { user } = useAuth();
  const manager = false;

  if (!user) return <SignUpOrSignInScreen />;

  if (!manager) return <CreateManagerScreen />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="JPApartments" xShown />
        <View style={styles.container}>
          <Text category={"h5"} style={styles.header}>
            Add a Property
          </Text>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { marginVertical: 20 },
});
