import { useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, Button } from "react-native-paper";

import theme from "../../theme";

const styles = StyleSheet.create({
  menuButton: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: "white",
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
      <Menu.Item
        title="Select an item..."
        disabled
        titleStyle={{ color: "black" }}
      />
      <Menu.Item
        onPress={() => onSelect("CREATED_AT", "DESC")}
        title="Latest repositories"
        titleStyle={{ color: "black" }}
      />
      <Menu.Item
        onPress={() => onSelect("RATING_AVERAGE", "DESC")}
        title="Highest rated repositories"
        titleStyle={{ color: "black" }}
      />
      <Menu.Item
        onPress={() => onSelect("RATING_AVERAGE", "ASC")}
        title="Lowest rated repositories"
        titleStyle={{ color: "black" }}
      />
    </Menu>
  );
};

export default OrderPicker;
