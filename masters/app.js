const fs = require('fs');
const companies = require('./data/companies');
const sortArrayBy = require('./utils/sortArrayBy');
const merge = require('./utils/merge');
const { BEST_VACANCIES_ARRAY_LENGTH } = require('./constants');
const algorithms = require('./algorithms');

const findBestCompany = calculateCriteriaAlgorithm => companies.map(calculateCriteriaAlgorithm);

const algorithmsResults = algorithms.map(findBestCompany);
const bestCompanies = merge(...algorithmsResults);
const sortedBestCompanies = sortArrayBy(bestCompanies, 'value');

// console.log(sortedBestCompanies.slice(0, BEST_VACANCIES_ARRAY_LENGTH));

fs.writeFileSync(`masters/results/${new Date().toISOString()}_result.json`, JSON.stringify(sortedBestCompanies));
