import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Apartment } from "../../types/apartment";

const fetchApartments = async (propertyID: number): Promise<Apartment[]> => {
  const response = await axios.get(
    `${endpoints.getApartmentsByPropertyID}${propertyID}`
  );

  const data: Apartment[] = response.data;
  return data;
};

export const useApartmentsQuery = (propertyID: number) =>
  useQuery(queryKeys.apartments, () => fetchApartments(propertyID));
