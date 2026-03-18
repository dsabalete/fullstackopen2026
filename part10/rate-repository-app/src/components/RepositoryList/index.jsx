import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

import RepositoryItem from "../RepositoryItem";
import ItemSeparator from "../ItemSeparator";
import RepositoryListHeader from "./RepositoryListHeader";

import useRepositories from "../../hooks/useRepositories";

export const RepositoryListContainer = ({
  repositories,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  searchKeyword,
  setSearchKeyword,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearchKeyword,
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
