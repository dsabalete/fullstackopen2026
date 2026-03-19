import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";
import { useMemo, useCallback } from "react";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 2,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  text: {
    marginTop: 5,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({ id, first: 10 });

  const onEndReach = useCallback(() => {
    fetchMore();
  }, [fetchMore]);

  const reviews = useMemo(() => {
    return repository?.reviews.edges.map((edge) => edge.node) ?? [];
  }, [repository]);

  if (!repository && loading) {
    return null;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View style={{ marginBottom: 10 }}>
          <RepositoryItem item={repository} showGithubButton />
        </View>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReach}
    />
  );
};

export default SingleRepository;
