import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMediaQuery } from '@mui/material';
import { getMoviesQuery } from './queries';
import { useFilters, useMovies } from '../../hooks';

const useHome = () => {
  const { filter, setPage, setFilter } = useFilters();
  const { genre, ...restFilter } = filter;
  const { loading, error, data } = useQuery(getMoviesQuery, {
    variables: { filter: genre ? filter : restFilter },
  });
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const isMedium = useMediaQuery('(max-width: 899px)');
  const isCompact = useMediaQuery('(max-width: 768px)');
  const [isFiltersModal, setIsFiltersModal] = useState(false);

  const paginationHandler = (_, page) => {
    setPage(page);
  };

  const pagesCount =
    data?.movies?.totalPages <= 500 ? data?.movies?.totalPages : 500;

  const onSubmit = filterData => {
    setFilter(filterData);
    setIsFiltersModal(false);
  };

  const toggleFiltersModal = () => setIsFiltersModal(prev => !prev);

  useEffect(() => {
    if (!isCompact) {
      setIsFiltersModal(isCompact);
    }
  }, [isCompact]);

  return {
    loading,
    error,
    data,
    selectedMovies,
    selectMovie,
    deleteMovie,
    paginationHandler,
    isMedium,
    isCompact,
    pagesCount,
    onSubmit,
    toggleFiltersModal,
    isFiltersModal,
    filter,
  };
};

export default useHome;
