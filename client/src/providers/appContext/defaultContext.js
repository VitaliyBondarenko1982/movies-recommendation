import { useSearchParams } from "react-router-dom";

import { LOCALES, STORAGE_KEY  } from "../../constants";
import { getFromStorage } from '../../utils/localStorage'

export const useDefaultContext = () => {
  const [ searchParams ] = useSearchParams();

  return {
    locale: getFromStorage(STORAGE_KEY) || searchParams.get('locale') || LOCALES.ENGLISH,
  }
}