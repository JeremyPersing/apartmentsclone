import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { socket } from "../../constants/socket";
import { Conversation, CreateConversation } from "../../types/conversation";

const createConversation = (values: CreateConversation) =>
  axios.post<Conversation>(`${endpoints.createConversation}`, {
    tenantID: values.tenantID,
    ownerID: values.ownerID,
    propertyID: values.propertyID,
    senderID: values.senderID,
    receiverID: values.receiverID,
    text: values.text,
  });

// This will only be called when a potential tenant wants to talk to an owner
export const useCreateConversationMutation = () => {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  return useMutation(
    ({
      ownerID,
      tenantID,
      propertyID,
      propertyName,
      senderName,
      text,
    }: {
      ownerID: number;
      tenantID: number;
      propertyID: number;
      propertyName: string;
      senderName: string;
      text: string;
    }) =>
      createConversation({
        ownerID,
        tenantID,
        propertyID,
        receiverID: ownerID,
        senderID: tenantID,
        text,
      }),
    {
      onSuccess: (
        { data },
        { propertyName, ownerID, text, tenantID, senderName }
      ) => {
        queryClient.invalidateQueries(queryKeys.contactedProperties);
        queryClient.invalidateQueries(queryKeys.conversations);
        socket.emit("sendMessage", {
          senderID: tenantID,
          conversationID: data.ID,
          receiverID: ownerID,
          text,
          senderName,
        });

        navigate("Root", {
          screen: "AccountRoot",
          params: {
            screen: "Messages",
            initial: false,
            params: {
              conversationID: data.ID,
              recipientName: propertyName,
            },
          },
        });
      },
    }
  );
};
