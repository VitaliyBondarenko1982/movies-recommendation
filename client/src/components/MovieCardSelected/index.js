import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box, MenuItem
} from '@mui/material';
import CardMenu from '../CardMenu';

const MovieCardSelected = ({ movie, onCardDelete }) => {
  return (
    <Card sx={{ display: 'flex', minHeight: 164 }}>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={movie.posterPath}
        alt={movie.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {movie.releaseDate}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          {!!movie.genres?.length && (
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {movie.genres[0].name}
            </Typography>
          )}
          <Typography variant="subtitle1" color="text.secondary" component="div">
           Duration: {movie.runtime}
          </Typography>
        </Box>
        <CardMenu>
          <MenuItem onClick={onCardDelete(movie)}>
            <FormattedMessage id="delete"/>
          </MenuItem>
        </CardMenu>
      </Box>
    </Card>
  );
};

MovieCardSelected.propTypes = {
  movie: PropTypes.shape({
    posterPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })),
    runtime: PropTypes.number
  }).isRequired,
  onCardDelete: PropTypes.func
}

export default MovieCardSelected;
