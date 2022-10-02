import { StyleSheet } from "react-native";
import { Text, Toggle } from "@ui-kitten/components";

import { Screen } from "../components/Screen";
import { useUser } from "../hooks/useUser";
import { Row } from "../components/Row";
import { useNotifications } from "../hooks/useNotifications";

export const AccountSettingsScreen = () => {
  const { user, setAllowsNotifications } = useUser();
  const { registerForPushNotificationsAsync } = useNotifications();

  const notificationsChanged = async (checked: boolean) => {
    try {
      if (!checked) return setAllowsNotifications(checked);

      setAllowsNotifications(checked);
      await registerForPushNotificationsAsync(true);
    } catch (error) {
      setAllowsNotifications(!checked);
    }
  };

  return (
    <Screen style={styles.container}>
      <Row style={styles.row}>
        <Text>Notifications</Text>
        <Toggle
          checked={user?.allowsNotifications}
          onChange={notificationsChanged}
        />
      </Row>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  header: {
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginTop: 15,
  },
});
