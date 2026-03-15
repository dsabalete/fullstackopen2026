import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: Constants.expoConfig.extra.apolloUri }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
