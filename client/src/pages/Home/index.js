import React, { useState } from 'react';
import { Box, Grid, Pagination, Paper } from '@mui/material';
import { useQuery } from '@apollo/client';

import { MovieCard, SelectedMoviesSection } from '../../components';
import { getMoviesQuery } from './queries';
import { useMovies } from '../../hooks'

const Home = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(getMoviesQuery, { variables: { page }});

  const { selectedMovies, selectMovie, deleteMovie } = useMovies();

  const paginationHandler = (_, page) => {
    setPage(page)
  }

  if (error) {
    return <div>Error!</div>
  }

  const pagesCount = data?.movies?.totalPages <= 500 ? data?.movies?.totalPages : 500;

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            Filters section
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ flexGrow: 1, padding: 1 }}>
              {loading && page === 1 && <div>Loading...</div> }
              {data && (
                <Grid container spacing={2}>
                  {data.movies.results.map(movie => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                      <MovieCard movie={movie} onCardSelect={selectMovie}/>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            <Box mt={2} pb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={pagesCount}
                page={page}
                onChange={paginationHandler}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectedMoviesSection selectedMovies={selectedMovies} deleteMovie={deleteMovie} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;