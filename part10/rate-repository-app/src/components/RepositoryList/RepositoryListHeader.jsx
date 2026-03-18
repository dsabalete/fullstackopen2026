import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

import OrderPicker from "./OrderPicker";

import theme from "../../theme";

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    backgroundColor: theme.colors.appBackground,
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 0,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 5,
  },
});

const RepositoryListHeader = ({
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        style={styles.searchBar}
        inputStyle={{ color: "black" }}
        iconColor="#666"
      />
      <OrderPicker
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
      />
    </View>
  );
};

export default RepositoryListHeader;
