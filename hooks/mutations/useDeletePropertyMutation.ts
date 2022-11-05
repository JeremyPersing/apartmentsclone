import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";
import { useUser } from "../useUser";

const deleteProperty = (propertyID: number, token?: string) =>
  axios.delete(`${endpoints.deleteProperty}${propertyID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const useDeletePropertyMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(
    ({ propertyID }: { propertyID: number }) =>
      deleteProperty(propertyID, user?.accessToken),
    {
      onMutate: async ({ propertyID }) => {
        await queryClient.cancelQueries(queryKeys.myProperties);

        const prevProperties: Property[] | undefined = queryClient.getQueryData(
          queryKeys.myProperties
        );

        if (prevProperties) {
          const filtered = prevProperties.filter((i) => i.ID !== propertyID);

          queryClient.setQueryData(queryKeys.myProperties, filtered);
        }

        return { prevProperties };
      },
      onError: (err, newTodo, context) => {
        if (context?.prevProperties)
          queryClient.setQueryData(
            queryKeys.myProperties,
            context?.prevProperties
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.myProperties);
      },
    }
  );
};
