import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useQuery, useMutation } from "@apollo/client/react";
import { format } from "date-fns";

import { GET_CURRENT_USER } from "../graphql/queries";
import { MUTATION_DELETE_REVIEW } from "../graphql/mutations";
import ItemSeparator from "./ItemSeparator";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "column",
  },
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

const ReviewItem = ({ review, refetch }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");
  const navigate = useNavigate();

  const handleViewRepository = () => {
    navigate(`/repositories/${review.repository.id}`);
  };

  const [deleteReview] = useMutation(MUTATION_DELETE_REVIEW);

  const handleDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview({ variables: { id } });
            refetch();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleViewRepository}>
          <Text style={{ color: "white" }}>View repository</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.button, backgroundColor: theme.colors.error }}
          onPress={() => handleDeleteReview(review.id)}
        >
          <Text style={{ color: "white" }}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
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
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
