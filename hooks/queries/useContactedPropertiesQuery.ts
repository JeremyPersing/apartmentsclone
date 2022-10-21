import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";
import { useUser } from "../useUser";

const fetchProperties = async (userID?: number): Promise<Property[]> => {
  if (!userID) return [];

  const response = await axios.get(
    endpoints.getContactedPropertiesByUserID(userID)
  );

  const data: Property[] = response.data;

  return data;
};

export const useContactedPropertiesQuery = () => {
  const { user } = useUser();
  const queryInfo = useQuery(
    queryKeys.contactedProperties,
    () => fetchProperties(user?.ID),
    {
      retry: false,
    }
  );

  const data = queryInfo?.data;
  if (data)
    for (let property of data) {
      property.liked = false;
      if (user?.savedProperties?.includes(property.ID)) property.liked = true;
    }

  return {
    ...queryInfo,
    data,
  };
};
