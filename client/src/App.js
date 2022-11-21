import { useContext } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components';
import { Home, Settings, Recommend } from './pages';
import { AppContext } from './providers/appContext';
import I18nProvider from './providers/i18n'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import getUri from './utils/getUri';

function App() {
  const { state } = useContext(AppContext);
  const httpLink = new HttpLink({ uri: getUri(process.env.NODE_ENV) });
  const localeMiddleware = new ApolloLink((operation, forward) => {
    const customHeaders = operation
      .getContext()
      .hasOwnProperty("headers")
        ? operation.getContext().headers
        : {};

    operation.setContext({
      headers: {
        ...customHeaders,
        locale: state.locale
      }
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: from([localeMiddleware, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  return (
    <I18nProvider locale={state.locale}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Navigation />
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100]
          }}
        >
          <Container maxWidth='xl'>
            <Routes>
              <Route path='/'>
                <Route index element={<Home />} />
                <Route path='settings' element={<Settings />} />
                <Route path='recommend' element={<Recommend />} />
              </Route>
            </Routes>
          </Container>
        </Box>
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
