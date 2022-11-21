import { gql } from '@apollo/client';

export const getMoviesQuery = gql`
  query Movies($page: Int) {
    movies(page: $page) {
      page
      totalResults
      totalPages
      results {
        id
        title
        posterPath
        releaseDate(format: "dd.MM.yyyy")
      }
    }
  }
`;