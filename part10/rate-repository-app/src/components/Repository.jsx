import { ScrollView } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const Repository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading || !repository) {
    return null;
  }

  return (
    <ScrollView>
      <RepositoryItem item={repository} showGithubButton />
    </ScrollView>
  );
};

export default Repository;
