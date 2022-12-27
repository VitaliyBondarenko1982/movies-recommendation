import { gql } from '@apollo/client';

export const getMoviesByIdsQuery = gql`
  query MoviesByIds($ids: [Int]) {
    moviesByIds(ids: $ids) {
      id
      title
      posterPath
      releaseDate(format: "dd.MM.yyyy")
    }
  }
`;
