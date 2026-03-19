import { gql } from "@apollo/client";
import {
  PAGE_INFO_FIELDS,
  REPOSITORY_LIST_FIELDS,
  REVIEW_FIELDS,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryListFields
        }
        cursor
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
  ${REPOSITORY_LIST_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryListFields
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          ...PageInfoFields
        }
      }
    }
  }
  ${REPOSITORY_LIST_FIELDS}
  ${REVIEW_FIELDS}
  ${PAGE_INFO_FIELDS}
`;
