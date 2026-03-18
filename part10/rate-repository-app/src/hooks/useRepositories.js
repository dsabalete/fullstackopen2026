import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (
  orderBy = "CREATED_AT",
  orderDirection = "ASC",
  searchKeyword = ""
) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
