import { languages } from '../constants';

const getCode = desiredLang => {
  if (!desiredLang) {
    return false;
  }
  desiredLang = desiredLang.toLowerCase();

  if (languages[desiredLang]) {
    return desiredLang;
  }

  const keys = Object.keys(languages).filter(key => {
    if (typeof languages[key] !== 'string') {
      return false;
    }

    return languages[key].toLowerCase() === desiredLang;
  });

  return keys[0] || false;
};

export default { getCode };
