import { useMutation } from "@apollo/client/react";
import { MUTATION_CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [createUser, result] = useMutation(MUTATION_CREATE_USER);

  return [createUser, result];
};

export default useCreateUser;
