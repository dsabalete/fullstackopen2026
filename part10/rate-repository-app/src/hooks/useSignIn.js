import { useMutation } from "@apollo/client/react";

import { MUTATION_SIGN_IN } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate] = useMutation(MUTATION_SIGN_IN);

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { username, password },
    });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    return result;
  };

  return [signIn];
};

export default useSignIn;
