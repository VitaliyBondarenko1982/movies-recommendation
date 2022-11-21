import React from 'react';
import { Form, Field } from 'react-final-form'
import {
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@mui/material';
import { FormattedMessage } from 'react-intl';


import { Check as CheckIcon } from '@mui/icons-material';

const SelectedMoviesForm = ({ onSubmit }) => {
  const validate = values => {
    const errors = {}
    if (!values.listName) {
      errors.listName = 'Field is required'
    }

    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <Field
              name="listName"
              render={({ input, meta }) => (
                <FormattedMessage id="put_the_list_name">
                  {placeholder =>
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder={placeholder}
                      inputProps={{ 'aria-label': 'put list name' }}
                      {...input}
                    />
                  }
                </FormattedMessage>
              )}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="directions">
              <CheckIcon />
            </IconButton>
          </Paper>
        </form>
        )}
    />
  );
};

export default SelectedMoviesForm;