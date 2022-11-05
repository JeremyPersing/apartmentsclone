import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { EditApartment } from "../../types/apartment";
import { useLoading } from "../useLoading";
import { useUser } from "../useUser";

const updateApartments = (
  propertyID: number,
  obj: EditApartment[],
  token?: string
) =>
  axios.patch(`${endpoints.updateApartments}${propertyID}`, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const useEditApartmentMutation = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { goBack } = useNavigation();
  const { user } = useUser();

  return useMutation(
    ({ propertyID, obj }: { propertyID: number; obj: EditApartment[] }) =>
      updateApartments(propertyID, obj, user?.accessToken),
    {
      onMutate: () => {
        setLoading(true);
      },
      onError(err) {
        alert("Error updating apartments");
      },
      onSuccess() {
        queryClient.invalidateQueries(queryKeys.myProperties);
        setLoading(false);
        goBack();
      },
    }
  );
};
