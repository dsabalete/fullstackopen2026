import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { format } from "date-fns";

import { GET_CURRENT_USER } from "../graphql/queries";
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
  fullName: {
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
        <Text style={styles.fullName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
