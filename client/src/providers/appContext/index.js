import { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDefaultContext } from './defaultContext';
import { STORAGE_KEY } from '../../constants';
import { saveToStorage } from '../../utils/localStorage';

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'setLocale':
      saveToStorage(STORAGE_KEY, action.locale);

      return { ...state, locale: action.locale };
    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const defaultContext = useDefaultContext();
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { AppContext, AppContextProvider };
