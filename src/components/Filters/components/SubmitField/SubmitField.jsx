import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';

const SubmitField = () => (
  <Button variant="contained" type="submit" size="large">
    <FormattedMessage id="filters.submit" />
  </Button>
);

export default SubmitField;
