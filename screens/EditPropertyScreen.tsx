import { Text } from "@ui-kitten/components";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { Loading } from "../components/Loading";
import { Screen } from "../components/Screen";
import { endpoints } from "../constants";
import { Property } from "../types/property";

export const EditPropertyScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const property: UseQueryResult<{ data: Property }, unknown> = useQuery(
    "property",
    () => axios.get(endpoints.getPropertyByID + route.params.propertyID)
  );

  if (property.isFetching || property.isLoading) return <Loading />;

  return (
    <Screen>
      <Text>Edit Property Screen</Text>
      <Text>{JSON.stringify(property?.data?.data)}</Text>
    </Screen>
  );
};
