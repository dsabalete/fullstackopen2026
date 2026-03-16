import { View, StyleSheet, Pressable, Linking } from "react-native";
import RepositoryHeader from "./RepositoryHeader";
import RepositoryStats from "./RepositoryStats";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    backgroundColor: "white",
  },
  githubButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingVertical: 16,
    alignItems: "center",
  },
  githubButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const RepositoryItem = ({ item, showGithubButton = false }) => {
  const handleOpenGithub = () => {
    if (item?.url) {
      Linking.openURL(item.url);
    }
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryHeader item={item} />
      <RepositoryStats item={item} />
      {showGithubButton && (
        <Pressable style={styles.githubButton} onPress={handleOpenGithub}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
