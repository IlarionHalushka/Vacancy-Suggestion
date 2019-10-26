const criterions = require('../criterions');

module.exports = company => {
  const value = Object.keys(criterions).reduce(
    (prev, current) => prev + company[current] * criterions[current] ** 2,
    0
  );
  return { ...company, value };
};
