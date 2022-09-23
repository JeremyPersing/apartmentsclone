import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { endpoints, queryKeys } from "../../constants";

import { EditPropertyObj } from "../../types/property";
import { useLoading } from "../useLoading";

const updateProperty = (propertyID: number, obj: EditPropertyObj) =>
  axios.patch(`${endpoints.updateProperty}${propertyID}`, obj);

export const useEditPropertyMutation = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { goBack } = useNavigation();

  return useMutation(
    ({ propertyID, obj }: { propertyID: number; obj: EditPropertyObj }) =>
      updateProperty(propertyID, obj),
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
