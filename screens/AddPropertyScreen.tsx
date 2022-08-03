import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { useQuery } from "react-query";
import axios from "axios";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { useAuth } from "../hooks/useAuth";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { CreateManagerScreen } from "./CreateManagerScreen";
import { endpoints } from "../constants";
import { Loading } from "../components/Loading";

export const AddPropertyScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const { user } = useAuth();
  const managerQuery = useQuery(
    "manager",
    () => {
      if (user) return axios.get(endpoints.getManagersByUserID + user.ID);
    },
    {
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );

  if (!user) return <SignUpOrSignInScreen />;

  if (managerQuery.isLoading) return <Loading />;

  if (managerQuery.data?.data.managers.length === 0 || !managerQuery.data)
    return <CreateManagerScreen refetchManagers={managerQuery.refetch} />;

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
