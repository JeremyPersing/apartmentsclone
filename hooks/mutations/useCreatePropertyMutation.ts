import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { StackActions, useNavigation } from "@react-navigation/native";

import { endpoints, queryKeys } from "../../constants";
import { CreateProperty, Property } from "../../types/property";
import { useUser } from "../useUser";

const createProperty = (obj: CreateProperty, token?: string) =>
  axios.post<Property>(endpoints.createProperty, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const useCreatePropertyMutation = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNavigation();
  const { user } = useUser();

  return useMutation(
    (obj: CreateProperty) => createProperty(obj, user?.accessToken),
    {
      onError() {
        alert("Unable to create property");
      },
      onSuccess(data: { data: Property }) {
        queryClient.invalidateQueries(queryKeys.myProperties);
        dispatch(
          StackActions.replace("EditProperty", { propertyID: data.data.ID })
        );
      },
    }
  );
};
