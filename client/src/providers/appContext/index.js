import {createContext, useReducer } from 'react';
import { useDefaultContext } from "./defaultContext";
import { STORAGE_KEY } from '../../constants';
import { saveToStorage } from '../../utils/localStorage';

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "setLocale":
      saveToStorage(STORAGE_KEY, action.locale);

      return { ...state, locale: action.locale };
  }
};

const AppContextProvider = ({children}) => {
  const defaultContext = useDefaultContext();
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };