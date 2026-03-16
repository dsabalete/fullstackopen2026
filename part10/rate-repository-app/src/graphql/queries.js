import { gql } from "@apollo/client";
import { PAGE_INFO_FIELDS, REPOSITORY_LIST_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
  query {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryListFields
    }
  }
  ${REPOSITORY_LIST_FIELDS}
`;
