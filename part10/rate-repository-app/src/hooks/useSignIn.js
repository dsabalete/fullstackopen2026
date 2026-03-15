import { useMutation } from "@apollo/client/react";

import { MUTATION_SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(MUTATION_SIGN_IN);

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { username, password },
    });
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
