import axios from "axios";
import { useQuery } from "react-query";
import { endpoints, queryKeys } from "../../constants";

import { Property } from "../../types/property";
import { useUser } from "../useUser";

const fetchProperties = async (boundingBox?: number[]): Promise<Property[]> => {
  if (!boundingBox) return [];

  const response = await axios.post(`${endpoints.getPropertiesByBoundingBox}`, {
    latLow: boundingBox[0],
    latHigh: boundingBox[1],
    lngLow: boundingBox[2],
    lngHigh: boundingBox[3],
  });

  const data: Property[] = response.data;
  return data;
};

export const useSearchPropertiesQuery = (boundingBox: number[]) => {
  const { user } = useUser();
  const queryInfo = useQuery(
    queryKeys.searchProperties,
    () => fetchProperties(boundingBox),
    {
      enabled: false,
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
