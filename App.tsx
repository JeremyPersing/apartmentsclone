import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { theme } from "./theme";
import { AuthContext } from "./context";
import { User } from "./types/user";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user));
    }
    getUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
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
    );
  }
}
