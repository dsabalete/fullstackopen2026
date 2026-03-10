import { View, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = {
  info: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "white",
  },
};

const RepositoryHeader = ({ item }) => (
  <View style={styles.info}>
    <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
    <View>
      <Text fontWeight="bold" style={{ paddingBottom: 10 }}>
        {item.fullName}
      </Text>
      <Text color="textSecondary" style={{ paddingBottom: 10 }}>
        {item.description}
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.language}</Text>
      </View>
    </View>
  </View>
);

export default RepositoryHeader;
