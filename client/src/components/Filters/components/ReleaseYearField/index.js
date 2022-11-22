import { Field } from 'react-final-form'
import { FormattedMessage } from "react-intl";
import { TextField } from '@mui/material';

export const ReleaseYearField = () => {
  return (
    <Field
      name="primaryReleaseYear"
      render={({ input }) => (
        <TextField
          id="outlined-basic"
          label={<FormattedMessage id="filters.release_year"/>}
          variant="outlined"
          type="number"
          minvalue={1800}
          maxvalue={2030}
          {...input}
        />
      )}
    />
  )
}
