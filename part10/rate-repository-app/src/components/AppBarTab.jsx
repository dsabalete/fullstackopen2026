import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

const AppBarTab = ({ label, to }) => {
  return (
    <Link to={to} component={Pressable} style={{ padding: 10 }}>
      <Text style={styles.text}>{label}</Text>
    </Link>
  );
};

export default AppBarTab;
