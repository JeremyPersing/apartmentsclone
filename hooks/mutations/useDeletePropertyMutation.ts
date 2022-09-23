import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";

const deleteProperty = (propertyID: number) =>
  axios.delete(`${endpoints.deleteProperty}${propertyID}`);

export const useDeletePropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ propertyID }: { propertyID: number }) => deleteProperty(propertyID),
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
