import { FlatList, Pressable, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { useConversationsQuery } from "../hooks/queries/useConversationsQuery";
import { Loading } from "../components/Loading";
import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { theme } from "../theme";
import { Row } from "../components/Row";

export const ConversationsScreen = () => {
  const { user } = useUser();
  const conversations = useConversationsQuery();
  const { navigate } = useNavigation();

  if (!user) return <SignUpOrSignInScreen />;

  if (conversations.isLoading) return <Loading />;

  if (!conversations?.data || conversations.data.length === 0)
    return <Text>You have no messages</Text>;

  const handleMessagePress = (
    conversationID: number,
    recipientName: string
  ) => {
    navigate("Root", {
      screen: "AccountRoot",
      params: {
        screen: "Messages",
        params: {
          conversationID,
          recipientName,
        },
      },
    });
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={conversations.data}
      keyExtractor={(item) => item.ID.toString()}
      renderItem={({ item }) => (
        <Pressable
          style={styles.message}
          onPress={() => handleMessagePress(item.ID, item.recipientName)}
        >
          <Row style={styles.row}>
            <Text style={styles.messageTitle} numberOfLines={1}>
              {item.recipientName}
            </Text>
            <Text appearance="hint">
              {new Date(item.messages[0].CreatedAt).toLocaleDateString()}
            </Text>
          </Row>
          <Text numberOfLines={2} appearance="hint" style={styles.messageText}>
            {item.messages[0].text}
          </Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  message: {
    justifyContent: "center",
    height: 100,
    paddingHorizontal: 30,
    borderBottomColor: theme["color-light-gray"],
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  messageTitle: { fontWeight: "bold", width: "80%" },
  row: { justifyContent: "space-between" },
  messageText: { paddingTop: 10 },
});
