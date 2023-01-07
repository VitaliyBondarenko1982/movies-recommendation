import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import { SOCIAL_BUTTON_SIZE } from '../../constants';

const SocialShare = ({ url, title }) => (
  <Box sx={{ mt: 1 }}>
    <Typography variant="h6" component="h2">
      Share with friends
    </Typography>
    <Stack direction="row" spacing={1}>
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon round size={SOCIAL_BUTTON_SIZE} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={SOCIAL_BUTTON_SIZE} />
      </TwitterShareButton>
    </Stack>
  </Box>
);

SocialShare.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SocialShare;
