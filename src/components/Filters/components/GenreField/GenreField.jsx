import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PropTypes from 'prop-types';

const defaultGenre = { id: 0 };

const GenreField = ({ genres }) => (
  <Field
    name="genre"
    render={({ input }) => (
      <FormattedMessage id="filters.genre">
        {placeholder => (
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
            }}
          >
            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              autoWidth
              label={placeholder}
              {...input}
            >
              {[defaultGenre, ...genres].map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {id ? name : <FormattedMessage id="filters.defaultGenre" />}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </FormattedMessage>
    )}
  />
);

GenreField.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default GenreField;
