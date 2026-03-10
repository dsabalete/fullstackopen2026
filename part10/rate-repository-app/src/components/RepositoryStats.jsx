import { View } from "react-native";
import StatItem from "./StatItem";

const styles = {
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
};

const RepositoryStats = ({ item }) => {
  const stats = [
    { label: "Stars", value: item.stargazersCount },
    { label: "Forks", value: item.forksCount },
    { label: "Reviews", value: item.reviewCount },
    { label: "Rating", value: item.ratingAverage },
  ];

  return (
    <View style={styles.stats}>
      {stats.map((stat) => (
        <StatItem key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </View>
  );
};

export default RepositoryStats;
