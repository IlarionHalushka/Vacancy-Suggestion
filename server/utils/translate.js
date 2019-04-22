import querystring from 'querystring';
import request from 'request-promise';
import safeEval from 'safe-eval';
import languages from './languages';

const translate = async (text, { from = 'auto', to = 'en' }) => {
  from = languages.getCode(from);
  to = languages.getCode(to);

  const data = {
    q: text,
    sl: from,
    tl: to,
    hl: to,
    client: 'gtx',
    dt: 't',
    ie: 'UTF-8',
    oe: 'UTF-8',
    otf: 1,
    ssel: 0,
    tsel: 0,
    kc: 7,
  };

  const url = `https://translate.googleapis.com/translate_a/single?${querystring.stringify(data)}`;

  const res = await request({
    url,
    method: 'GET',
  });

  return safeEval(res)[0][0][0].split(',');
};

const translateWithTimeout = async (textToTranslate, timeout = 15000, opts = {}) => {
  try {
    // translate doesn't allow to send more than 1000 symbols
    const textChunks = textToTranslate.match(/.{1,2500}/g);
    let textTranslated;

    for (const chunk of textChunks) {
      textTranslated += await translate(chunk, opts);
    }

    await new Promise(resolve => setTimeout(resolve, timeout));

    return textTranslated.toString();
  } catch (e) {
    console.error(e);
  }
};

export default translateWithTimeout;
