import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { LogBox } from "react-native";
import * as Notifications from "expo-notifications";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { theme } from "./theme";
import { AuthContext, LoadingContext } from "./context";
import { User } from "./types/user";
import { socket } from "./constants/socket";
import { queryKeys } from "./constants";
import { refreshTokens } from "./services/tokens";

const queryClient = new QueryClient();
LogBox.ignoreAllLogs();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) {
        const userObj: User = JSON.parse(user);
        const newTokens = await refreshTokens(userObj.refreshToken);
        if (newTokens) {
          userObj.accessToken = newTokens.accessToken;
          userObj.refreshToken = newTokens.refreshToken;
          SecureStore.setItemAsync("user", JSON.stringify(userObj));
        }
        setUser(userObj);

        socket.auth = {
          userID: userObj.ID,
          username:
            userObj.firstName && userObj.lastName
              ? `${userObj.firstName} ${userObj.lastName}`
              : `${userObj.email}`,
          accessToken: userObj.accessToken,
        };

        socket.connect();
      }
    }
    getUser().then(() => {
      socket.on(
        "getMessage",
        (data: {
          senderID: number;
          senderName: string;
          conversationID: number;
          text: string;
        }) => {
          queryClient.invalidateQueries(queryKeys.conversations);
          queryClient.invalidateQueries(queryKeys.selectedConversation);

          Notifications.scheduleNotificationAsync({
            content: {
              title: data.senderName,
              body: data.text,
              data: {
                // will need to change url in prod build (use process.ENV && eas.json)
                url: `exp://192.168.30.24:19000/--/messages/${data.conversationID}/${data.senderName}`,
              },
            },
            trigger: null,
          });
        }
      );
      socket.on("session", (data: { sessionID: string }) => {
        socket.auth = { sessionID: data.sessionID };
        if (user) {
          const updatedUser = { ...user };
          updatedUser.sessionID = data.sessionID;
          setUser(updatedUser);
          SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
        }
      });

      socket.on("connect_error", (err) => {
        if (err.message === "Invalid userID" && user) {
          socket.auth = {
            userID: user?.ID,
            username:
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : `${user.email}`,
          };
          socket.connect();
        }
      });
    });

    return () => {
      socket.off("getMesssage");
      socket.off("session");
      socket.off("connect_error");
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <QueryClientProvider client={queryClient}>
            <ApplicationProvider {...eva} theme={theme}>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </ApplicationProvider>
          </QueryClientProvider>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    );
  }
}
