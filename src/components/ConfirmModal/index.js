import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Typography,
  Modal,
  InputBase,
  Paper,
  IconButton,
  Divider,
  Alert,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CONFIRM_TIMEOUT } from '../../constants';
import SocialShare from '../SocialShare';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = ({ open, url, title, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer;

    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, CONFIRM_TIMEOUT);
    }

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <FormattedMessage id="share_with_friends" />
        </Typography>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            mt: '24px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="List URL"
            inputProps={{ 'aria-label': 'list URL' }}
            value={url}
          />
          <IconButton sx={{ p: '10px' }} aria-label="preview">
            <VisibilityIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
            <IconButton
              color="primary"
              sx={{ p: '10px' }}
              aria-label="copy to clipboard"
            >
              <ContentCopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Paper>
        <SocialShare url={url} title={title} />
        {copied && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setCopied(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, mt: '10px' }}
          >
            <FormattedMessage id="copied" />
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmModal;
