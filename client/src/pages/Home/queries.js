import { gql } from '@apollo/client';

export const getMoviesQuery = gql`
  query Movies($filter: MoviesFilterInput) {
    movies(filter: $filter) {
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
