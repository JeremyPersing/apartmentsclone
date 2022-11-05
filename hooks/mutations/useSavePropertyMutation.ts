import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

import { useUser } from "../useUser";
import { endpoints, queryKeys } from "../../constants";
import { Property } from "../../types/property";

const saveOrUnsaveProperty = (
  propertyID: number,
  op: "add" | "remove",
  userID?: number,
  token?: string
) =>
  axios.patch(
    `${endpoints.alterSavedPropertiesByUserID(userID as number)}`,
    {
      propertyID,
      op,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const useSavePropertyMutation = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({ propertyID, op }: { propertyID: number; op: "add" | "remove" }) =>
      saveOrUnsaveProperty(propertyID, op, user?.ID, user?.accessToken),
    {
      onMutate: async ({ propertyID, op }) => {
        await queryClient.cancelQueries(queryKeys.savedProperties);
        await queryClient.cancelQueries(queryKeys.searchProperties);
        await queryClient.cancelQueries(queryKeys.selectedProperty);

        const prevSavedProperties: Property[] | undefined =
          queryClient.getQueryData(queryKeys.savedProperties);
        const prevSearchedProperties: Property[] | undefined =
          queryClient.getQueryData(queryKeys.searchProperties);
        const prevSelectedProperty: Property | undefined =
          queryClient.getQueryData(queryKeys.selectedProperty);

        if (prevSelectedProperty?.ID === propertyID) {
          const newSelectedProperty = { ...prevSelectedProperty };

          newSelectedProperty.liked = !newSelectedProperty.liked;
          queryClient.setQueryData(
            queryKeys.selectedProperty,
            newSelectedProperty
          );
        }

        if (op === "remove") {
          if (prevSavedProperties) {
            const newSavedProperties = prevSavedProperties.filter(
              (i) => i.ID !== propertyID
            );
            queryClient.setQueryData(
              queryKeys.savedProperties,
              newSavedProperties
            );
          }

          if (prevSearchedProperties)
            for (let i of prevSearchedProperties) {
              if (i.ID === propertyID) i.liked = false;
            }
        } else if (op === "add") {
          if (prevSearchedProperties) {
            for (let i of prevSearchedProperties) {
              if (i.ID === propertyID) i.liked = true;
            }
          }
        }

        queryClient.setQueryData(
          queryKeys.searchProperties,
          prevSearchedProperties
        );

        return {
          prevSavedProperties,
          prevSearchedProperties,
          prevSelectedProperty,
        };
      },
      onError: (err, vars, context) => {
        queryClient.setQueryData(
          queryKeys.savedProperties,
          context?.prevSavedProperties
        );
        queryClient.setQueryData(
          queryKeys.searchProperties,
          context?.prevSearchedProperties
        );
        queryClient.setQueryData(
          queryKeys.selectedProperty,
          context?.prevSelectedProperty
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.savedProperties);
        queryClient.invalidateQueries(queryKeys.searchProperties);
      },
    }
  );
};
