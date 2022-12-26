import { useState, useContext, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Hidden,
  Link,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/appContext';
import { LOCALES } from '../../constants';

import translate from '../../utils/translate';

const navigation = [
  {
    title: translate('navigation.settings'),
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const setLanguage = useCallback(
    locale => {
      dispatch({
        type: 'setLocale',
        locale,
      });
    },
    [dispatch],
  );

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navigation.map(item => (
          <Link
            key={item.title}
            to={item.path}
            component={RouterLink}
            sx={{ textDecoration: 'none' }}
          >
            <ListItem key={item.title} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={translate('navigation.settings')} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Hidden only={['lg', 'xl']}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon open={false} />
            </IconButton>
          </Hidden>
          <Link to="/" component={RouterLink} sx={{ flexGrow: 1 }}>
            <Typography sx={{ color: 'white' }}>
              <FormattedMessage id="navigation.home" />
            </Typography>
          </Link>
          <Box>
            {state.locale}
            <Button
              disabled={state.locale === LOCALES.ENGLISH}
              sx={{ my: 2, color: 'white' }}
              onClick={() => setLanguage(LOCALES.ENGLISH)}
            >
              ENGLISH
            </Button>

            <Button
              disabled={state.locale === LOCALES.UKRAINIAN}
              sx={{ my: 2, color: 'white' }}
              onClick={() => setLanguage(LOCALES.UKRAINIAN)}
            >
              Українська
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', lg: 'flex', justifyContent: 'end' },
            }}
          >
            {navigation.map(page => (
              <Link key={page.title} to={page.path} component={RouterLink}>
                <Button
                  key={page.title}
                  onClick={() => {}}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {list}
      </Drawer>
    </Box>
  );
};

export default Navigation;
