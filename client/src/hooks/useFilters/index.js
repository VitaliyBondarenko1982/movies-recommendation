import { useState, useCallback } from 'react';
import { SORT_DIRECTION } from '../../constants';

export const useFilters = () => {
  const [filter, setFilterFields] = useState({
    page: 1,
    sortBy: 'popularity',
    sortDirection: SORT_DIRECTION.DESC,
    includeAdult: false,
  });

  const setPage = useCallback((page) => {
    setFilterFields({
      ...filter,
      page
    })
  }, [filter])

  const setFilter = useCallback((filterFields) => {
    setFilterFields({
      ...filter,
      ...filterFields,
      year: +filterFields.year ,
      primaryReleaseYear: +filterFields.primaryReleaseYear
    })
  }, [filter])

  return {
    filter,
    setPage,
    setFilter
  }
}

export default useFilters;
