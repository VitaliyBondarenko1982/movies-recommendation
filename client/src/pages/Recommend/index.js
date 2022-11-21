import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { getMoviesByIdsQuery } from './queries';
import { MovieCard } from '../../components';

const Recommend = () => {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState({
    ids: [],
    title: ''
  })

  const {loading, error, data} = useQuery(getMoviesByIdsQuery, {
    variables: {
      ids: params.ids
    }
  })

  useEffect(() => {
    const ids = searchParams.get('ids');
    const title = searchParams.get('title');

    setParams({
      ids: ids.split(',').map(id => +id),
      title: title.split('_').join(' ')
    });

  }, [searchParams]);

  if (loading) {
    return (
      <Typography variant='h5' component='h5' gutterBottom>
       Loading...
      </Typography>
    )
  }

  if (error) {
    return (
      <Typography variant='h5' component='h5' gutterBottom>
        Error. Please, try again.
      </Typography>
    )
  }

  return (
    <>
      <Typography variant='h1' component='h1' gutterBottom>
        {params.title}
      </Typography>
      {data.moviesByIds && (
        <Grid container spacing={2}>
          {data.moviesByIds.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} onCardSelect={() => {}} isPreviewMode />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Recommend;