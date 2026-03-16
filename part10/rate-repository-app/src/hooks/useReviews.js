import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id) => {
  const { data, loading } = useQuery(GET_REVIEWS, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data?.repository?.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return { reviews, loading };
};

export default useReviews;
