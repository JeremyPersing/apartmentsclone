import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { endpoints, queryKeys } from "../../constants";

import { EditPropertyObj } from "../../types/property";
import { useLoading } from "../useLoading";
import { useUser } from "../useUser";

const updateProperty = (
  propertyID: number,
  obj: EditPropertyObj,
  token?: string
) =>
  axios.patch(`${endpoints.updateProperty}${propertyID}`, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const useEditPropertyMutation = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { goBack } = useNavigation();
  const { user } = useUser();

  return useMutation(
    ({ propertyID, obj }: { propertyID: number; obj: EditPropertyObj }) =>
      updateProperty(propertyID, obj, user?.accessToken),
    {
      onMutate: () => {
        setLoading(true);
      },
      onError(err) {
        alert("Error updating property");
      },
      onSuccess() {
        queryClient.invalidateQueries(queryKeys.myProperties);
        setLoading(false);
        goBack();
      },
    }
  );
};
