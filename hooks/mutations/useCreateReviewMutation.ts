import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { CreateReview } from "../../types/review";
import { endpoints, queryKeys } from "../../constants";
import { useLoading } from "../useLoading";
import { useNavigation } from "@react-navigation/native";

const createReview = (propertyID: number, review: CreateReview) =>
  axios.post(`${endpoints.createReview}${propertyID}`, review);

export const useCreateReviewMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  const { goBack } = useNavigation();

  return useMutation(
    ({ propertyID, review }: { propertyID: number; review: CreateReview }) =>
      createReview(propertyID, review),
    {
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.selectedProperty);
      },
      onError: () => {
        alert("Unable to create review");
      },
      onSettled: () => {
        setLoading(false);
        goBack();
      },
    }
  );
};
