import { gql } from "@apollo/client";

export const REPOSITORY_LIST_FIELDS = gql`
	fragment RepositoryListFields on Repository {
		id
		name
		ownerName
		createdAt
		fullName
		reviewCount
		ratingAverage
		forksCount
		stargazersCount
		description
		language
		ownerAvatarUrl
		url
	}
`;

export const PAGE_INFO_FIELDS = gql`
	fragment PageInfoFields on PageInfo {
		hasNextPage
		hasPreviousPage
		startCursor
		endCursor
	}
`;
