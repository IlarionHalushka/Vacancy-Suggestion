const _ = require('lodash');

const customizer = (a, b) => ({ ...a, value: Number((a.value + b.value).toFixed(2)) });

module.exports = (...rest) => _.mergeWith(...rest, customizer);
