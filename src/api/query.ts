import { gql } from "@apollo/client"

export const GET_ALL_MEDIA = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(id: $id, search: $search) {
        id
        title {
          userPreferred
        }
        type
        status
        seasonYear
        episodes
        source
        coverImage {
          large
          medium
        }
      }
    }
  }
`

export const GET_MEDIA_BY_ID = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(id: $id, search: $search) {
        id
        title {
          userPreferred
        }
        type
        format
        status
        description
        seasonYear
        episodes
        duration
        source
        bannerImage
        coverImage {
          large
          medium
        }
        tags {
          name
        }
      }
    }
  }
`
