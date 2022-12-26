import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Paper, Stack, Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/appContext';
import ConfirmModal from '../ConfirmModal';
import MovieCardSelected from '../MovieCardSelected';
import SelectedMoviesForm from '../SelectedMoviesForm';
import noMoviesImageSrc from '../../assets/no_movies.png';

const SelectedMovies = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: 'calc(100vh - 140px)',
  position: 'sticky',
  top: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const MoviesList = styled(Stack)(() => ({
  overflow: 'scroll',
  height: '100%',
}));

const NoMovies = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const SelectedMoviesSection = ({ selectedMovies, deleteMovie }) => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const { state } = useContext(AppContext);

  const onSubmit = ({ listName }) => {
    const ids = selectedMovies.map(({ id }) => id);
    const listNameUpdated = listName.split(' ').join('_');

    setLink(
      `${window.location.host}/recommend?title=${listNameUpdated}&locale=${
        state.locale
      }&ids=${ids.join()}`,
    );
    setTitle(listName);
  };

  const onCloseConfirmModal = () => {
    setLink('');
  };

  if (!selectedMovies.length) {
    return (
      <SelectedMovies>
        <NoMovies>
          <Box
            component="img"
            sx={{
              width: '50%',
              opacity: '.6',
            }}
            alt="No images."
            src={noMoviesImageSrc}
          />
          <Typography variant="h5" mt={2}>
            <FormattedMessage id="no_selected_movies" />
          </Typography>
        </NoMovies>
      </SelectedMovies>
    );
  }

  return (
    <SelectedMovies>
      <MoviesList spacing={2}>
        {selectedMovies.map(movie => (
          <MovieCardSelected
            key={movie.id}
            movie={movie}
            onCardDelete={deleteMovie}
          />
        ))}
      </MoviesList>
      <Box pt={2}>
        <SelectedMoviesForm onSubmit={onSubmit} />
      </Box>
      <ConfirmModal
        url={link}
        title={title}
        open={!!link}
        onClose={onCloseConfirmModal}
      />
    </SelectedMovies>
  );
};

SelectedMoviesSection.propTypes = {
  selectedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      posterPath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
      runtime: PropTypes.number,
    }),
  ).isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default SelectedMoviesSection;
