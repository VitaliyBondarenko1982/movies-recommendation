import React from 'react';
import { Box, Grid, IconButton, Pagination, Paper } from '@mui/material';
import { TuneRounded as TuneRoundedIcon } from '@mui/icons-material';

import {
  MovieCard,
  SelectedMoviesSection,
  Filters,
  ModalContainer,
} from '../../components';
import useHome from './useHome';

const Home = () => {
  const {
    loading,
    error,
    data,
    isMedium,
    isCompact,
    isFiltersModal,
    selectedMovies,
    selectMovie,
    deleteMovie,
    onSubmit,
    toggleFiltersModal,
    filter,
    pagesCount,
    paginationHandler,
  } = useHome();

  if (error) {
    return <div>Error!</div>;
  }

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
        {isCompact ? (
          <IconButton color="inherit" onClick={toggleFiltersModal}>
            <TuneRoundedIcon fontSize="inherit" color="primary" />
          </IconButton>
        ) : (
          <Grid item xs={12}>
            <Paper>
              <Filters onSubmit={onSubmit} initialValues={filter} />
            </Paper>
          </Grid>
        )}
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
      <ModalContainer open={isFiltersModal} onClose={toggleFiltersModal}>
        <Filters onSubmit={onSubmit} initialValues={filter} />
      </ModalContainer>
    </Box>
  );
};

export default Home;
