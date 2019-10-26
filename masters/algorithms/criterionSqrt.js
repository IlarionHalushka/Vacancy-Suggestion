const criterions = require('../criterions');

module.exports = company => {
  const value = Object.keys(criterions).reduce(
    (prev, current) => prev + company[current] * Math.sqrt(criterions[current]),
    0
  );
  return { ...company, value };
};
