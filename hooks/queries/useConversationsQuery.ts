import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { TransformedConversation } from "../../types/conversation";
import { Message } from "../../types/message";
import { getStateAbbreviation } from "../../utils/getStateAbbreviation";
import { useUser } from "../useUser";

const fetchConversations = async (
  userID?: number,
  token?: string
): Promise<TransformedConversation[]> => {
  if (!userID) return [];

  const response = await axios.get(
    `${endpoints.getConversationsByUserID}${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const conversations: ConversationsRes[] = response.data;
  const data: TransformedConversation[] = [];
  for (let i of conversations) {
    // recipientName represents the person other than curr user in the conversation
    let recipientName = "";
    if (userID === i.tenantID)
      // could alternatively display the owner's name here
      recipientName = i.propertyName
        ? i.propertyName
        : `${i.street}, ${i.city}, ${getStateAbbreviation(i.state)}`;
    else
      recipientName =
        i.tenantFirstName && i.tenantLastName
          ? `${i.tenantFirstName} ${i.tenantLastName}`
          : i.tenantEmail;

    data.push({
      ID: i.ID,
      propertyID: i.propertyID,
      recipientName,
      messages: i.messages,
    });
  }

  return data;
};

export const useConversationsQuery = () => {
  const { user } = useUser();

  return useQuery(
    queryKeys.conversations,
    () => fetchConversations(user?.ID, user?.accessToken),
    {
      retry: false,
    }
  );
};

type ConversationsRes = {
  ID: number;
  CreatedAt: string;
  tenantID: number;
  ownerID: number;
  propertyID: number;
  propertyName: string;
  street: string;
  city: string;
  state: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  tenantFirstName: string;
  tenantLastName: string;
  tenantEmail: string;
  messages: Message[];
};
