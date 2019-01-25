import querystring from 'querystring';
import request from 'request-promise';
import safeEval from 'safe-eval';
import languages from './languages';

const translate = async (text, opts = {}) => {
  opts.from = opts.from || 'auto';
  opts.to = opts.to || 'en';

  opts.from = languages.getCode(opts.from);
  opts.to = languages.getCode(opts.to);

  let url = 'https://translate.googleapis.com/translate_a/single';
  const data = {
    client: 'gtx',
    sl: opts.from || 'auto',
    tl: opts.to,
    hl: opts.to,
    dt: 't',
    ie: 'UTF-8',
    oe: 'UTF-8',
    otf: 1,
    ssel: 0,
    tsel: 0,
    kc: 7,
    q: text,
  };
  url = `${url}?${querystring.stringify(data)}`;

  const res = await request({
    url: url,
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
    return 'no data';
  }
};

export default translateWithTimeout;
