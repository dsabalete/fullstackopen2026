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
