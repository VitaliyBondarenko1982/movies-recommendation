import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import {
  SortField,
  SortDirectionField,
  YearField,
  SubmitField,
  ReleaseYearField,
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
    <div>
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
                <Box mr={3}>
                  <YearField />
                </Box>

                <Box mr={3}>
                  <ReleaseYearField />
                </Box>

                <Box mr={3}>
                  <GenreField data={data} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box mr={3}>
                  <SortField />
                </Box>

                <SortDirectionField />
              </Box>
            </Box>
            <Box>
              <SubmitField />
            </Box>
          </form>
        )}
      />
    </div>
  );
};

Filters.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

export default Filters;
