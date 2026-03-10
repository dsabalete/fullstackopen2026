import { View } from "react-native";
import Text from "./Text";

const styles = {
  singleStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  statCount: {
    fontWeight: "bold",
  },
  statLabelText: {
    color: "#586069",
  },
};

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
};

const StatItem = ({ label, value }) => (
  <View style={styles.singleStat}>
    <Text style={styles.statCount}>{formatCount(value)}</Text>
    <Text style={styles.statLabelText}>{label}</Text>
  </View>
);

export default StatItem;
