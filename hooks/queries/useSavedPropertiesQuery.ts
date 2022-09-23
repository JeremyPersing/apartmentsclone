import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";
import { useUser } from "../useUser";

const fetchProperties = async (userID?: number): Promise<Property[]> => {
  if (!userID) return [];

  const response = await axios.get(
    endpoints.getSavedPropertiesByUserID(userID)
  );

  const data: Property[] = response.data;
  for (let i of data) i.liked = true;

  return data;
};

export const useSavedPropertiesQuery = () => {
  const { user } = useUser();

  return useQuery(queryKeys.savedProperties, () => fetchProperties(user?.ID), {
    retry: false,
  });
};
