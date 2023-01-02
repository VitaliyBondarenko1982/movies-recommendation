import React from 'react';
import { Box, Grid, Pagination, Paper, useMediaQuery } from '@mui/material';
import { useQuery } from '@apollo/client';

import { MovieCard, SelectedMoviesSection, Filters } from '../../components';
import { getMoviesQuery } from './queries';
import { useFilters, useMovies } from '../../hooks';

const Home = () => {
  const { filter, setPage, setFilter } = useFilters();
  const { genre, ...restFilter } = filter;
  const { loading, error, data } = useQuery(getMoviesQuery, {
    variables: { filter: genre ? filter : restFilter },
  });
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();
  const isMedium = useMediaQuery('(max-width: 899px)');

  const paginationHandler = (_, page) => {
    setPage(page);
  };

  if (error) {
    return <div>Error!</div>;
  }

  const pagesCount =
    data?.movies?.totalPages <= 500 ? data?.movies?.totalPages : 500;

  const onSubmit = filterData => {
    setFilter(filterData);
  };

  const selectedMoviesJSX = (
    <Grid item xs={12} md={4}>
      <SelectedMoviesSection
        selectedMovies={selectedMovies}
        deleteMovie={deleteMovie}
      />
    </Grid>
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Filters onSubmit={onSubmit} initialValues={filter} />
          </Paper>
        </Grid>
        {isMedium && selectedMoviesJSX}
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ flexGrow: 1, padding: 1 }}>
              {loading && filter.page === 1 && <div>Loading...</div>}
              {data && (
                <Grid container spacing={2}>
                  {data.movies.results.map(movie => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                      <MovieCard movie={movie} onCardSelect={selectMovie} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            <Box
              mt={2}
              pb={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Pagination
                count={pagesCount}
                page={filter.page}
                onChange={paginationHandler}
              />
            </Box>
          </Paper>
        </Grid>
        {!isMedium && selectedMoviesJSX}
      </Grid>
    </Box>
  );
};

export default Home;
