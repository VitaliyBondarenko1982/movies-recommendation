import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PropTypes from 'prop-types';

export const GenreField = ({ data }) => (
  <Field
    name="genre"
    render={({ input }) => (
      <FormattedMessage id="filters.genre">
        {placeholder => (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              autoWidth
              label={placeholder}
              {...input}
            >
              {data.genres.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
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
  data: PropTypes.shape({
    genres: PropTypes.arrayOf({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
