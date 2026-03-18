import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { GET_CURRENT_USER } from "../graphql/queries";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    padding: 20,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  const user = data?.me;
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" to="/" />
        {user ? (
          <>
            <AppBarTab label="Create a review" to="/create-review" />
            <AppBarTab label="My reviews" to="/my-reviews" />
            <AppBarTab label="Sign out" onPress={handleSignOut} />
          </>
        ) : (
          <>
            <AppBarTab label="Sign in" to="/login" />
            <AppBarTab label="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
