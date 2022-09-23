import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";

const fetchProperty = async (propertyID: number): Promise<Property> => {
  const response = await axios.get(`${endpoints.getPropertyByID}${propertyID}`);

  const data: Property = response.data;
  return data;
};

export const useEditPropertyQuery = (propertyID: number) =>
  useQuery(queryKeys.editProperty, () => fetchProperty(propertyID));
