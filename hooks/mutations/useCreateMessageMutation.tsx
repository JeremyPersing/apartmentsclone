import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

import { endpoints, queryKeys } from "../../constants";
import { socket } from "../../constants/socket";
import {
  SelectedConversation,
  TransformedConversation,
  Author,
} from "../../types/conversation";
import { MessageType } from "@flyerhq/react-native-chat-ui/lib/types";
import { useUser } from "../useUser";

const createMessage = (
  conversationID: number,
  senderID: number,
  receiverID: number,
  text: string,
  token?: string
) =>
  axios.post(
    `${endpoints.createMessage}`,
    {
      conversationID,
      senderID,
      receiverID,
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(
    ({
      conversationID,
      author,
      senderID,
      receiverID,
      text,
    }: {
      conversationID: number;
      author: Author;
      senderID: number;
      receiverID: number;
      text: string;
    }) =>
      createMessage(
        conversationID,
        senderID,
        receiverID,
        text,
        user?.accessToken
      ),
    {
      onMutate: async ({
        author,
        text,
        conversationID,
        receiverID,
        senderID,
      }) => {
        await queryClient.cancelQueries(queryKeys.conversations);
        await queryClient.cancelQueries(queryKeys.selectedConversation);

        const prevConversations: TransformedConversation[] | undefined =
          queryClient.getQueryData(queryKeys.conversations);
        const prevSelectedConversation: SelectedConversation | undefined =
          queryClient.getQueryData(queryKeys.selectedConversation);

        const textMessage: MessageType.Text = {
          author: author,
          createdAt: Date.now(),
          id: Date.now().toString(),
          text: text,
          type: "text",
        };

        if (prevSelectedConversation) {
          const newSelectedConversation = { ...prevSelectedConversation };
          newSelectedConversation.messages.unshift(textMessage);

          queryClient.setQueryData(
            queryKeys.selectedConversation,
            newSelectedConversation
          );
        }

        if (prevConversations) {
          const newConversations = [...prevConversations];
          const index = newConversations.findIndex(
            (i) => i.ID === conversationID
          );

          newConversations[index].messages.unshift({
            CreatedAt: new Date().toString(),
            ID: Date.now(),
            receiverID,
            senderID,
            text,
          });

          queryClient.setQueryData(queryKeys.conversations, newConversations);
        }

        return {
          prevConversations,
          prevSelectedConversation,
        };
      },
      onError: (err, vars, context) => {
        queryClient.setQueryData(
          queryKeys.conversations,
          context?.prevConversations
        );
        queryClient.setQueryData(
          queryKeys.selectedConversation,
          context?.prevSelectedConversation
        );
      },
      onSuccess: (
        _,
        { author, conversationID, receiverID, senderID, text }
      ) => {
        socket.emit("sendMessage", {
          senderID,
          conversationID,
          receiverID,
          text,
          senderName: `${author.firstName} ${author.lastName}`,
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.conversations);
        queryClient.invalidateQueries(queryKeys.selectedConversation);
      },
    }
  );
};
