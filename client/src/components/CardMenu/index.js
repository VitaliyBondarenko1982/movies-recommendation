import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const CardMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{
          position: 'absolute',
          zIndex: 2,
          right: 5,
          top: 5,
          background: 'rgba(255, 255, 255, 0.3)',
        }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{ position: 'absolute', right: 0 }}
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};

CardMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CardMenu;
