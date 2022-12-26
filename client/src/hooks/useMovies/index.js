import { useEffect, useState, useCallback } from 'react';
import { MAX_SELECTED_MOVIES } from '../../constants';

const useMovies = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {}, []);

  const selectMovie = useCallback(
    movie => () => {
      const isMovieExist = !!selectedMovies.find(({ id }) => id === movie.id);
      const selectedLength = selectedMovies.length;

      if (isMovieExist || selectedLength >= MAX_SELECTED_MOVIES) {
        return;
      }

      setSelectedMovies([movie, ...selectedMovies]);
    },
    [selectedMovies],
  );

  const deleteMovie = useCallback(
    movie => () => {
      setSelectedMovies(selectedMovies.filter(({ id }) => id !== movie.id));
    },
    [selectedMovies],
  );

  return {
    selectedMovies,
    selectMovie,
    deleteMovie,
  };
};

export default useMovies;
