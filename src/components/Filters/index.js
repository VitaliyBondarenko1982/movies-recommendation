import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import {
  SortField,
  SortDirectionField,
  YearField,
  SubmitField,
  GenreField,
} from './components';
import { GENRES_QUERY } from './queries';

const Filters = ({ onSubmit, initialValues }) => {
  const { loading, error, data } = useQuery(GENRES_QUERY);

  if (loading) {
    return 'Loading ...';
  }

  if (error) {
    return 'Error!';
  }

  return (
    <Box sx={{ p: 2 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box mr={1}>
                  <YearField />
                </Box>

                <Box mr={1}>
                  <GenreField genres={data.genres} />
                </Box>
                <Box mr={1}>
                  <SortField />
                </Box>
                <Box>
                  <SortDirectionField />
                </Box>
              </Box>
            </Box>
            <Box>
              <SubmitField />
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

Filters.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

export default Filters;
