import { useMutation } from "@apollo/client/react";
import { MUTATION_CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [createReview, result] = useMutation(MUTATION_CREATE_REVIEW);

  return [createReview, result];
};

export default useCreateReview;
