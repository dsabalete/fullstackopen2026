import { useState } from "react";
import { FlatList, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { Menu, Button } from "react-native-paper";

import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";

import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  menuButton: {
    borderRadius: 5,
    backgroundColor: "white",
    width: "100%",
  },
});

const OrderPicker = ({
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSelect = (newOrderBy, newOrderDirection) => {
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
    closeMenu();
  };

  const getLabel = () => {
    if (orderBy === "CREATED_AT") return "Latest repositories";
    if (orderBy === "RATING_AVERAGE" && orderDirection === "DESC")
      return "Highest rated repositories";
    if (orderBy === "RATING_AVERAGE" && orderDirection === "ASC")
      return "Lowest rated repositories";
    return "Select an item...";
  };

  return (
    <View style={styles.headerContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{ backgroundColor: "white" }}
        anchor={
          <Button
            onPress={openMenu}
            mode="outlined"
            style={styles.menuButton}
            textColor="black"
            contentStyle={{
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              height: 50,
            }}
            icon="menu-down"
          >
            {getLabel()}
          </Button>
        }
      >
        <Menu.Item title="Select an item..." disabled />
        <Menu.Item
          onPress={() => onSelect("CREATED_AT", "DESC")}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => onSelect("RATING_AVERAGE", "DESC")}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => onSelect("RATING_AVERAGE", "ASC")}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <OrderPicker
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState();
  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;
