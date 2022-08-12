import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { useQuery } from "react-query";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { useAuth } from "../hooks/useAuth";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { CreateManagerScreen } from "./CreateManagerScreen";
import { endpoints } from "../constants";
import { Loading } from "../components/Loading";
import { AddPropertySection } from "../components/AddPropertySection";

export const AddPropertyScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const { user } = useAuth();
  const managerQuery = useQuery(
    "manager",
    () => {
      if (user) return axios.get(endpoints.getManagerByUserID + user.ID);
    },
    {
      cacheTime: 24 * 60 * 60 * 1000,
      retry: false,
    }
  );

  useFocusEffect(
    useCallback(() => {
      if (!managerQuery.data) managerQuery.refetch();
    }, [])
  );

  if (!user) return <SignUpOrSignInScreen />;

  if (managerQuery.isLoading || managerQuery.isFetching) return <Loading />;

  if (!managerQuery.data?.data)
    return <CreateManagerScreen refetchManagers={managerQuery.refetch} />;

  return <AddPropertySection />;
};
