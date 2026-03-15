import { useMutation, useApolloClient } from "@apollo/client/react";

import { MUTATION_SIGN_IN } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate] = useMutation(MUTATION_SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [signIn];
};

export default useSignIn;
