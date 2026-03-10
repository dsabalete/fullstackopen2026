import { Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

const AppBarTab = ({ label, onClick }) => {
  return (
    <Pressable onPress={onClick}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default AppBarTab;
